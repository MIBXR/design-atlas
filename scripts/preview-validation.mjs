import fs from 'node:fs';
import path from 'node:path';
import { resolveRepositoryPath } from './build-agent.mjs';

const pngSignature = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);
const jpegFrames = new Set([0xc0, 0xc1, 0xc2, 0xc3, 0xc5, 0xc6, 0xc7, 0xc9, 0xca, 0xcb, 0xcd, 0xce, 0xcf]);
const crcTable = Array.from({ length: 256 }, (_, value) => {
  for (let bit = 0; bit < 8; bit++) value = value & 1 ? (value >>> 1) ^ 0xedb88320 : value >>> 1;
  return value >>> 0;
});

function crc32(bytes) {
  let crc = 0xffffffff;
  for (const value of bytes) crc = (crc >>> 8) ^ crcTable[(crc ^ value) & 255];
  return (crc ^ 0xffffffff) >>> 0;
}

// Inspect every segment, including progressive scans, so a SOF header alone
// cannot make a truncated JPEG pass. This validates structure, not pixel decoding.
function jpegDimensions(bytes) {
  let position = 2;
  let dimensions;
  let hasScan = false;
  while (position < bytes.length) {
    if (bytes[position++] !== 0xff) throw new Error('invalid JPEG marker');
    while (bytes[position] === 0xff) position++;
    const marker = bytes[position++];
    if (marker === 0xd9) {
      if (!dimensions || !hasScan || position !== bytes.length) throw new Error('incomplete JPEG image');
      return dimensions;
    }
    if (marker === 0x01) continue;
    if (marker === undefined || marker === 0 || marker === 0xd8 || (marker >= 0xd0 && marker <= 0xd7)) throw new Error('invalid JPEG marker');
    if (position + 2 > bytes.length) throw new Error('truncated JPEG segment');
    const length = bytes.readUInt16BE(position);
    if (length < 2 || position + length > bytes.length) throw new Error('truncated JPEG segment');
    if (jpegFrames.has(marker)) {
      if (length < 11 || length !== 8 + 3 * bytes[position + 7]) throw new Error('invalid JPEG frame');
      const height = bytes.readUInt16BE(position + 3);
      const width = bytes.readUInt16BE(position + 5);
      if (!width || !height) throw new Error('invalid JPEG dimensions');
      if (dimensions && (dimensions.width !== width || dimensions.height !== height)) throw new Error('inconsistent JPEG dimensions');
      dimensions = { width, height };
    }
    if (marker === 0xda && (!dimensions || length < 8 || length !== 6 + 2 * bytes[position + 2])) throw new Error('invalid JPEG scan');
    position += length;
    if (marker === 0xda) {
      hasScan = true;
      const start = position;
      while (position < bytes.length) {
        const next = bytes.indexOf(0xff, position);
        if (next < 0) throw new Error('missing JPEG end marker');
        let markerAt = next + 1;
        while (bytes[markerAt] === 0xff) markerAt++;
        const scanMarker = bytes[markerAt];
        if (scanMarker === 0 || (scanMarker >= 0xd0 && scanMarker <= 0xd7)) position = markerAt + 1;
        else { position = next; break; }
      }
      if (position === start) throw new Error('empty JPEG scan');
    }
  }
  throw new Error('missing JPEG end marker');
}

function pngDimensions(bytes) {
  let position = 8;
  let dimensions;
  let hasImageData = false;
  while (position + 12 <= bytes.length) {
    const length = bytes.readUInt32BE(position);
    const end = position + 12 + length;
    if (end > bytes.length) throw new Error('truncated PNG chunk');
    const type = bytes.toString('ascii', position + 4, position + 8);
    if (crc32(bytes.subarray(position + 4, end - 4)) !== bytes.readUInt32BE(end - 4)) throw new Error('invalid PNG checksum');
    if (!dimensions && type !== 'IHDR') throw new Error('missing PNG header');
    if (type === 'IHDR') {
      if (dimensions || length !== 13) throw new Error('invalid PNG header');
      const width = bytes.readUInt32BE(position + 8);
      const height = bytes.readUInt32BE(position + 12);
      if (!width || !height || width > 0x7fffffff || height > 0x7fffffff) throw new Error('invalid PNG dimensions');
      dimensions = { width, height };
    }
    if (type === 'IDAT' && length) hasImageData = true;
    if (type === 'IEND') {
      if (length || !hasImageData || end !== bytes.length) throw new Error('incomplete PNG image');
      return dimensions;
    }
    position = end;
  }
  throw new Error('missing PNG end chunk');
}

function validatePreview(root, relative, orientation) {
  try {
    const bytes = fs.readFileSync(resolveRepositoryPath(root, relative));
    const extension = path.extname(relative).toLowerCase();
    let format;
    let dimensions;
    if (bytes.length >= 2 && bytes[0] === 0xff && bytes[1] === 0xd8) {
      format = 'JPEG';
      if (!['.jpg', '.jpeg'].includes(extension)) throw new Error('JPEG encoding does not match the filename extension');
      dimensions = jpegDimensions(bytes);
    } else if (bytes.subarray(0, 8).equals(pngSignature)) {
      format = 'PNG';
      if (extension !== '.png') throw new Error('PNG encoding does not match the filename extension');
      dimensions = pngDimensions(bytes);
    } else throw new Error('unrecognized or damaged JPEG/PNG image');
    if (orientation === 'landscape' && dimensions.width <= dimensions.height) throw new Error('desktop preview must be landscape');
    if (orientation === 'portrait' && dimensions.height <= dimensions.width) throw new Error('mobile preview must be portrait');
    return { path: relative, format, ...dimensions };
  } catch (error) {
    throw new Error(`${relative}: ${error.message}`);
  }
}

export function validateEntryPreviews(root, entry) {
  const result = {
    desktop: validatePreview(root, entry.preview, 'landscape'),
    mobile: validatePreview(root, `previews/mobile/${entry.id}.jpg`, 'portrait'),
  };
  if (entry.referencePreview) result.reference = validatePreview(root, entry.referencePreview);
  return result;
}
