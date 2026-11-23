import {mkdir,copyFile} from 'node:fs/promises';
await mkdir('dist',{recursive:true});
await copyFile('mapping.js','dist/mapping.js');
for(const file of ['api-client.js','config.js','LICENSE','NOTICE','REFERENCES.md','CITATION.cff','VERSION']) await copyFile(file,`dist/${file}`);
for(const file of ['index.html','style.css','app.js','data.js','patterns.html','patterns.js','scenario.js','components.js']) await copyFile(file,`dist/${file}`);
console.log('Build estático disponível em dist');
