(async () => {
  const video = document.querySelector('video');
  video.pause();
  const canvas = document.createElement('canvas');
  canvas.width = video.videoWidth;
  canvas.height = video.videoHeight;
  const context = canvas.getContext('2d');
  const save = async (image, name) => {
    const blob = await new Promise(resolve => image.toBlob(resolve, 'image/png'));
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = name;
    link.click();
    URL.revokeObjectURL(link.href);
  };
  for (const [name, time] of [['permission', 22], ['archive', 35], ['optics', 48], ['matrix', 68]]) {
    const seeked = new Promise(resolve => video.addEventListener('seeked', resolve, { once: true }));
    video.currentTime = time;
    await seeked;
    context.drawImage(video, 0, 0);
    await save(canvas, `${name}-frame.png`);
  }
  const node = document.createElement('canvas');
  node.width = 62;
  node.height = 63;
  node.getContext('2d').drawImage(canvas, 637, 498, 62, 63, 0, 0, 62, 63);
  await save(node, 'focus-node.png');
})();
