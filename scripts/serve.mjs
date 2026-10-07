import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const port = Number(process.env.PORT || 4173);
const mime = { '.html':'text/html; charset=utf-8', '.js':'text/javascript; charset=utf-8', '.mjs':'text/javascript; charset=utf-8', '.css':'text/css; charset=utf-8', '.json':'application/json; charset=utf-8', '.md':'text/plain; charset=utf-8', '.svg':'image/svg+xml', '.png':'image/png', '.jpg':'image/jpeg', '.jpeg':'image/jpeg', '.webp':'image/webp', '.avif':'image/avif', '.gif':'image/gif', '.ico':'image/x-icon', '.mp4':'video/mp4', '.webm':'video/webm', '.mp3':'audio/mpeg', '.ogg':'audio/ogg', '.wav':'audio/wav', '.woff2':'font/woff2', '.woff':'font/woff', '.ttf':'font/ttf' };
http.createServer((req,res) => {
  let pathname;
  try { pathname = decodeURIComponent(new URL(req.url, 'http://localhost').pathname); } catch { res.writeHead(400); res.end('Bad URL'); return; }
  const file = path.resolve(root, '.' + pathname, pathname.endsWith('/') ? 'index.html' : '');
  if (file !== root && !file.startsWith(root + path.sep) || pathname.split('/').some(p => p.startsWith('.'))) { res.writeHead(403); res.end('Forbidden'); return; }
  fs.stat(file,(err,stat) => {
    if(err||!stat.isFile()){res.writeHead(404);res.end('Not found');return;}
    const etag=`"${stat.size.toString(16)}-${Math.floor(stat.mtimeMs).toString(16)}"`;
    const headers={'Content-Type':mime[path.extname(file).toLowerCase()]||'application/octet-stream',
      'Cache-Control':'no-cache','ETag':etag,'Last-Modified':stat.mtime.toUTCString(),'Accept-Ranges':'bytes'};
    // Revalidate the local file, then reuse downloaded bytes instead of disabling caching.
    // Changed source files remain visible immediately during authoring.
    if(!req.headers.range && (req.headers['if-none-match']===etag ||
      (!req.headers['if-none-match'] && req.headers['if-modified-since'] &&
       Date.parse(req.headers['if-modified-since'])>=Math.floor(stat.mtimeMs/1000)*1000))){
      res.writeHead(304,headers);res.end();return;
    }
    let start=0,end=stat.size-1,status=200;
    if(req.headers.range){
      const match=/^bytes=(\d*)-(\d*)$/.exec(req.headers.range);
      if(!match||(!match[1]&&!match[2])){res.writeHead(416,{'Content-Range':`bytes */${stat.size}`});res.end();return;}
      if(!match[1])start=Math.max(0,stat.size-Number(match[2]));
      else {start=Number(match[1]);if(match[2])end=Math.min(end,Number(match[2]));}
      if(start>end||start>=stat.size){res.writeHead(416,{'Content-Range':`bytes */${stat.size}`});res.end();return;}
      status=206;headers['Content-Range']=`bytes ${start}-${end}/${stat.size}`;
    }
    headers['Content-Length']=Math.max(0,end-start+1);res.writeHead(status,headers);
    if(req.method==='HEAD'||!stat.size){res.end();return;}
    const stream=fs.createReadStream(file,{start,end});stream.on('error',()=>res.destroy());res.on('close',()=>stream.destroy());stream.pipe(res);
  });
}).listen(port, '127.0.0.1', () => console.log(`Design Atlas: http://127.0.0.1:${port}`));
