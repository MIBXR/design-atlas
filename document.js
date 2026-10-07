const content = document.querySelector('#content');
const file = new URLSearchParams(location.search).get('file') || '';
const libraryURL = new URL('.', document.baseURI);
function isAllowedDocument(value) {
  return /^(?:README\.md|CONTRIBUTING\.md|AGENT\.md|(?:demos|research|prompts|docs|agent)\/[A-Za-z0-9_./-]+\.md)$/.test(value)
    && !value.split('/').some(part => !part || part.startsWith('.'));
}
function localPath(url) {
  if (url.origin !== libraryURL.origin || !url.pathname.startsWith(libraryURL.pathname)) return null;
  return decodeURIComponent(url.pathname.slice(libraryURL.pathname.length));
}
function prepareLinks(fragment, sourceURL) {
  for (const link of fragment.querySelectorAll('a[href]')) {
    const reference = link.getAttribute('href');
    if (reference.startsWith('#')) continue;
    const url = new URL(reference, sourceURL);
    const path = localPath(url);
    if (path !== null && isAllowedDocument(path)) {
      const reader = new URL('document.html', libraryURL);
      reader.searchParams.set('file', path);
      reader.hash = url.hash;
      link.href = reader.href;
    } else {
      if (path !== null && /^demos\/[A-Za-z0-9_-]+\/?$/.test(path)) {
        url.pathname = url.pathname.replace(/\/?$/, '/index.html');
      }
      link.href = url.href;
    }
  }
  for (const image of fragment.querySelectorAll('img[src]')) {
    image.src = new URL(image.getAttribute('src'), sourceURL).href;
    image.loading = 'lazy';
    image.decoding = 'async';
  }
}
function renderMarkdown(text, sourceURL) {
  if (!window.marked || !window.DOMPurify) throw new Error('文档渲染器加载失败，请刷新后重试。');
  const html = marked.parse(text.replace(/^[\u200B-\u200F\uFEFF]+/u, ''), {gfm:true, async:false});
  const fragment = DOMPurify.sanitize(html, {
    USE_PROFILES:{html:true}, RETURN_DOM_FRAGMENT:true,
    FORBID_TAGS:['style', 'iframe', 'form'], FORBID_ATTR:['style']
  });
  const heading = fragment.querySelector('h1');
  const title = heading?.textContent.trim() || file.split('/').pop();
  // The page header already displays the document's leading title.
  heading?.remove();
  prepareLinks(fragment, sourceURL);
  for (const table of fragment.querySelectorAll('table')) {
    const wrapper = document.createElement('div');
    wrapper.className = 'table-scroll';
    wrapper.tabIndex = 0;
    wrapper.setAttribute('role', 'region');
    wrapper.setAttribute('aria-label', '表格');
    table.replaceWith(wrapper);
    wrapper.append(table);
  }
  content.replaceChildren(fragment);
  return title;
}
async function readDocument() {
  try {
    if (!isAllowedDocument(file)) throw new Error('请选择参考库中的 Markdown 文档。');
    const sourceURL = new URL(file, libraryURL);
    const response = await fetch(sourceURL);
    if (!response.ok) throw new Error(`文档读取失败（${response.status}）。`);
    // Decode the actual bytes explicitly; never let a browser guess a legacy charset.
    const text = new TextDecoder('utf-8', {fatal:true}).decode(await response.arrayBuffer());
    const heading = renderMarkdown(text, sourceURL);
    document.querySelector('#title').textContent = heading;
    document.querySelector('#path').textContent = file;
    document.title = `${heading} · Design Atlas`;
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
