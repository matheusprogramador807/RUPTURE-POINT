/* Files and charts remain in IndexedDB on this browser; no upload endpoint. */
window.Studio=(()=>{
 let db;
 function open(){return db?Promise.resolve(db):new Promise((resolve,reject)=>{const r=indexedDB.open('ruptura-studio',1);r.onupgradeneeded=()=>r.result.createObjectStore('tracks',{keyPath:'id'});r.onsuccess=()=>resolve(db=r.result);r.onerror=()=>reject(Error('Seu navegador não permitiu salvar a biblioteca.'));});}
 async function transact(mode,fn){const database=await open();return new Promise((resolve,reject)=>{const tx=database.transaction('tracks',mode),request=fn(tx.objectStore('tracks'));let value;request.onsuccess=()=>value=request.result;tx.oncomplete=()=>resolve(value);tx.onerror=()=>reject(Error('Falha ao salvar a música neste navegador.'));});}
 async function list(){return transact('readonly',store=>store.getAll());}
 async function importAudio(file,options,onProgress=()=>{}){
  if(!file||file.size>30*1024*1024)throw Error('Escolha um arquivo de áudio de até 30 MB.');
  onProgress('Decodificando áudio…');const context=new(window.AudioContext||window.webkitAudioContext)();let buffer;
  try{buffer=await context.decodeAudioData(await file.arrayBuffer());}finally{await context.close();}
  if(buffer.duration>300||buffer.duration<5)throw Error('Use uma música de 5 segundos a 5 minutos.');
  const rate=11025,length=Math.floor(buffer.duration*rate),mono=new Float32Array(length),channel=buffer.getChannelData(0),step=buffer.sampleRate/rate;
  for(let i=0;i<length;i++){const p=Math.min(channel.length-1,Math.floor(i*step));let strongest=0;for(let ch=0;ch<buffer.numberOfChannels;ch++){const v=buffer.getChannelData(ch)[p];if(Math.abs(v)>Math.abs(strongest))strongest=v;}mono[i]=strongest;}
  const id='custom-'+crypto.randomUUID();onProgress('Analisando ritmo em segundo plano…');
  const chart=await new Promise((resolve,reject)=>{const worker=new Worker('/static/analysis-worker.js');worker.onmessage=e=>{worker.terminate();e.data.error?reject(Error(e.data.error)):resolve(e.data.chart);};worker.onerror=()=>{worker.terminate();reject(Error('Falha no analisador. Atualize o navegador e tente novamente.'));};worker.postMessage({samples:mono,sampleRate:rate,options:{...options,id,name:options.name||file.name.replace(/\.[^.]+$/,'')}},[mono.buffer]);});
  const track={id,chart:{...chart,player:options.player,opponent:options.opponent},audio:file,createdAt:Date.now()};onProgress('Salvando na biblioteca local…');await transact('readwrite',store=>store.put(track));return track;
 }
 return{list,importAudio};
})();
