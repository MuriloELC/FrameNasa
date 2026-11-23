import {createServer} from 'node:http';
import {readFile} from 'node:fs/promises';
const allowed={'/':'index.html','/index.html':'index.html','/style.css':'style.css','/app.js':'app.js','/data.js':'data.js','/patterns.html':'patterns.html','/patterns.js':'patterns.js'};
allowed['/scenario.js']='scenario.js';
allowed['/components.js']='components.js';
allowed['/mapping.js']='mapping.js';
allowed['/api-client.js']='api-client.js';
allowed['/config.js']='config.js';
createServer(async(req,res)=>{const file=allowed[new URL(req.url,'http://localhost').pathname];if(!file){res.writeHead(404);res.end();return;}try{res.setHeader('Content-Type',file.endsWith('.js')?'text/javascript':file.endsWith('.css')?'text/css':'text/html; charset=utf-8');res.end(await readFile(file));}catch{res.writeHead(500);res.end('Falha ao carregar arquivo');}}).listen(5173,'127.0.0.1',()=>console.log('http://localhost:5173'));
