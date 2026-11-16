/* Local signal analysis: novelty peaks + autocorrelation. No speaker separation. */
(function(root){
 function analyze(samples,sampleRate,options={}){
  if(!Number.isFinite(sampleRate)||sampleRate<=0)throw Error('Taxa de áudio inválida.');
  const hop=Math.max(64,Math.round(sampleRate*.012)),energy=[],tone=[];
  for(let p=0;p+hop<samples.length;p+=hop){let sum=0,cross=0;for(let i=p;i<p+hop;i++){sum+=samples[i]*samples[i];if(i>p&&(samples[i]>0)!==(samples[i-1]>0))cross++;}energy.push(Math.sqrt(sum/hop));tone.push(cross/hop);}
  const novelty=energy.map((e,i)=>Math.max(0,e-(energy[i-1]||0)));
  let lagBest=0,scoreBest=-1;
  for(let lag=Math.round(.333*sampleRate/hop);lag<=Math.round(.667*sampleRate/hop);lag++){let score=0;for(let i=lag;i<novelty.length;i++)score+=novelty[i]*novelty[i-lag];if(score>scoreBest){scoreBest=score;lagBest=lag;}}
  const bpm=Math.max(90,Math.min(180,60/(Math.max(1,lagBest)*hop/sampleRate))),beat=60/bpm,countIn=4*beat,duration=samples.length/sampleRate;
  const sorted=[...novelty].sort((a,b)=>a-b),threshold=Math.max(.0008,sorted[Math.floor(sorted.length*.77)]||.001);
  let peaks=[],last=-1,lane=0;
  for(let i=2;i<novelty.length-2;i++){const time=i*hop/sampleRate;if(time-last<.105||novelty[i]<threshold||novelty[i]<novelty[i-1]||novelty[i]<novelty[i+1])continue;lane=(Math.min(3,Math.floor(tone[i]*18))+peaks.length)%4;if(lane===peaks.at(-1)?.lane&&time-last<.16)lane=(lane+1)%4;peaks.push({time:time+countIn,lane,hold:0,side:'player',pitch:0});last=time;}
  if(peaks.length<8)throw Error('Poucos ataques encontrados. Tente um áudio mais claro e com ritmo.');
  const difficulty=options.difficulty||'hard',notes=peaks.filter((n,i)=>difficulty==='easy'?i%4===0:difficulty==='medium'?i%2===0:true).map(n=>({...n}));
  if(difficulty==='insane')for(let i=0;i<peaks.length;i+=8)notes.push({...peaks[i],lane:(peaks[i].lane+2)%4});
  notes.sort((a,b)=>a.time-b.time);notes.forEach(n=>n.id=`${n.side}:${n.time}:${n.lane}`);
  return{id:options.id||'custom',name:options.name||'Minha música',bpm:Math.round(bpm*100)/100,bars:Math.ceil(duration/beat/4),duration:duration+countIn+.4,audio_duration:duration,count_in:countIn,speed:560,chart_version:5,meter:'4/4',key:'Áudio original',difficulty,notes,music:[],attacks:[],sections:[{name:'MÚSICA PERSONALIZADA',start:countIn,end:duration+countIn}],analysis:{method:'energy-onset-autocorrelation',confidence:scoreBest>0?'estimated':'low',speakerSeparation:false,target:'player'}};
 }
 root.AudioAnalysis={analyze};if(typeof module!=='undefined')module.exports={analyze};
})(typeof globalThis!=='undefined'?globalThis:this);
