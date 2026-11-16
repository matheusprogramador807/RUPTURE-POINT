/* One context and aligned gain buses per session. Optional licensed/original stems. */
(function(root){
 class AudioEngine{
  constructor(preferences={}){this.context=new(root.AudioContext||root.webkitAudioContext)({latencyHint:'interactive'});this.master=this.context.createGain();this.limiter=this.context.createDynamicsCompressor();for(const [key,value] of Object.entries({threshold:-6,knee:12,ratio:4,attack:.003,release:.18})){if(this.limiter[key])this.limiter[key].value=value;}this.master.connect(this.limiter);this.limiter.connect(this.context.destination);this.buses={};this.buffers=new Map();this.sources=[];for(const name of ['music','drums','bass','vocals','sfx']){this.buses[name]=this.context.createGain();this.buses[name].connect(this.master);}this.setVolumes(preferences);}
  setVolumes(p){for(const name of ['master','music','drums','bass','vocals','sfx']){const raw=Number(p[name]??(name==='master'?.65:1)),value=Number.isFinite(raw)?Math.max(0,Math.min(1,raw)):(name==='master'?.65:1);const g=name==='master'?this.master:this.buses[name];if(g.gain.setTargetAtTime)g.gain.setTargetAtTime(value,this.context.currentTime,.015);else g.gain.value=value;}}
  async loadStems(manifest){await Promise.all(Object.entries(manifest).map(async([name,url])=>{if(!this.buses[name])throw Error('Stem desconhecido: '+name);const r=await fetch(url);if(!r.ok)throw Error('Falha ao carregar áudio: '+name);const buffer=await this.context.decodeAudioData(await r.arrayBuffer());this.buffers.set(name,buffer);}));}
  startStems(when,offset=0){for(const[name,buffer]of this.buffers){const s=this.context.createBufferSource();s.buffer=buffer;s.connect(this.buses[name]);s.start(when,offset);s.onended=()=>s.disconnect();this.sources.push(s);}}
  pause(){return this.context.suspend();}resume(){return this.context.resume();}
  close(){if(this.closing)return this.closing;this.closing=(async()=>{for(const s of this.sources){try{s.stop();s.disconnect();}catch{}}this.sources=[];this.buffers.clear();if(this.context.state!=='closed')await this.context.close();})();return this.closing;}
 }
 root.GameAudio={AudioEngine};
})(typeof globalThis!=='undefined'?globalThis:this);
