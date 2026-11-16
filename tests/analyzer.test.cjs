const assert=require('node:assert/strict');
const {analyze}=require('../static/chart-analyzer.js');
const rate=11025,audio=new Float32Array(rate*12);
for(let beat=0;beat<24;beat++){const start=Math.round(beat*.5*rate);for(let i=0;i<rate*.045;i++)audio[start+i]=Math.sin(i*.23)*Math.exp(-i/110);}
const options={name:'Synthetic test',id:'test',allPlayer:true};
const easy=analyze(audio,rate,{...options,difficulty:'easy'}),hard=analyze(audio,rate,{...options,difficulty:'hard'}),insane=analyze(audio,rate,{...options,difficulty:'insane'});
assert.ok(hard.bpm>=90&&hard.bpm<=180);
assert.ok(easy.notes.length<hard.notes.length);
assert.ok(insane.notes.length>hard.notes.length);
assert.equal(easy.audio_duration,hard.audio_duration);
assert.equal(hard.analysis.speakerSeparation,false);
assert.ok(hard.notes.every(n=>n.lane>=0&&n.lane<4&&n.side==='player'));
assert.ok(insane.notes.some((n,i,a)=>i>0&&n.time===a[i-1].time&&n.lane!==a[i-1].lane));
assert.throws(()=>analyze(new Float32Array(rate*5),rate));
console.log('MP3 analyzer: timing, density, chords and silent-input failure OK');

const solo=analyze(audio,rate);assert.ok(solo.notes.every(n=>n.side==='player'));assert.ok(new Set(solo.notes.map(n=>n.lane)).size>=3);assert.throws(()=>analyze(audio,0));

