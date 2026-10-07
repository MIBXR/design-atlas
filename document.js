const content = document.querySelector('#content');
const file = new URLSearchParams(location.search).get('file') || '';
const allowed = /^(?:README\.md|QA\.md|CONTRIBUTING\.md|(?:demos|research|prompts|docs)\/[A-Za-z0-9_./-]+\.md)$/.test(file)
  && !file.split('/').some(part => !part || part.startsWith('.'));
async function readDocument() {
  try {
    if (!allowed) throw new Error('请选择参考库中的 Markdown 文档。');
    const response = await fetch(new URL(file, document.baseURI));
    if (!response.ok) throw new Error(`文档读取失败（${response.status}）。`);
    // Decode the actual bytes explicitly; never let a browser guess a legacy charset.
    const text = new TextDecoder('utf-8', {fatal:true}).decode(await response.arrayBuffer());
    const heading = text.match(/^#\s+([^\r\n]+)/m)?.[1] || file.split('/').pop();
    document.querySelector('#title').textContent = heading;
    document.querySelector('#path').textContent = file;
    document.title = `${heading} · Design Atlas`;
    // Source documents may contain HTML, including README tables. Show text only.
    content.textContent = text;
    const download = document.querySelector('#download');
    download.href = file;
    download.download = file.split('/').pop();
    download.hidden = false;
    const caseId = file.match(/^demos\/([A-Za-z0-9_-]+)\//)?.[1];
    if (caseId) document.querySelector('#back').href = `index.html#style/${caseId}`;
  } catch (error) {
    content.textContent = error.message;
    content.setAttribute('role', 'alert');
  } finally {
    content.setAttribute('aria-busy', 'false');
  }
}
readDocument();
