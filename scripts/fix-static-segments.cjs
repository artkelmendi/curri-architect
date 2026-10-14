// Next 16.2.9's Windows export leaves backslashes in segment filenames.
// Add the flat aliases requested by the client router; never modify node_modules.
const fs=require('node:fs');const path=require('node:path');
const root=path.resolve('out');let count=0;
function walk(directory){for(const entry of fs.readdirSync(directory,{withFileTypes:true})){
  const file=path.join(directory,entry.name);
  if(entry.isDirectory())walk(file);
  else if(entry.name.endsWith('.txt')){
    const parts=path.relative(root,file).split(path.sep);const start=parts.findIndex(part=>part.startsWith('__next.'));
    if(start>=0&&start<parts.length-1){const destination=path.join(root,...parts.slice(0,start),parts.slice(start).join('.'));fs.copyFileSync(file,destination);count++;}
  }
}}
walk(root);console.log(`Static navigation segment aliases: ${count}.`);
