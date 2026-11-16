/* Original vector artwork, rendered at device resolution. No external game assets. */
window.Art=(()=>{
 const ink='#100d18';
 function path(c,points,fill,stroke=ink,width=7){c.beginPath();points.forEach((p,i)=>i?c.lineTo(...p):c.moveTo(...p));c.closePath();c.fillStyle=fill;c.fill();if(stroke){c.strokeStyle=stroke;c.lineWidth=width;c.lineJoin='round';c.stroke();}}
 function ellipse(c,x,y,rx,ry,fill,stroke=ink,w=6){c.beginPath();c.ellipse(x,y,rx,ry,0,0,7);c.fillStyle=fill;c.fill();if(stroke){c.lineWidth=w;c.strokeStyle=stroke;c.stroke();}}
 function mic(c,x,y,angle=0){c.save();c.translate(x,y);c.rotate(angle);path(c,[[-6,0],[6,0],[7,44],[-5,44]],'#454051',ink,4);ellipse(c,0,-4,16,20,'#83818e',ink,5);c.strokeStyle='#34303e';c.lineWidth=2;for(let i=-10;i<=8;i+=6){c.beginPath();c.moveTo(-12,i);c.lineTo(12,i);c.stroke();}c.restore();}
 function character(c,x,y,s,enemy=false,anger=0,pose=0,dodge=false,attack=false,sing=-1,damaged=false){c.save();c.translate(x,y);c.scale(s,s);c.translate(0,Math.sin(pose)*5);if(damaged){c.translate(8,13);c.rotate(-.16);}if(sing>=0){c.translate([-15,0,2,17][sing],[0,20,-17,0][sing]);c.rotate([-.12,.06,-.07,.12][sing]);}if(dodge){c.translate(17,40);c.rotate(.3);}ellipse(c,0,153,83,13,'#09071188',null);
 if(enemy){
 path(c,[[-44,70],[-48,134],[-76,144],[-73,158],[-10,155],[0,93],[18,145],[11,158],[76,158],[81,143],[50,128],[43,66]],'#302b45');
 path(c,[[-43,-14],[-64,9],[-60,77],[12,92],[48,72],[39,-16],[8,-31]],anger>1?'#951f4e':'#753c8b');
 path(c,[[-37,-13],[-19,11],[0,5],[13,-29]],'#f1c4b3');
 path(c,[[-56,7],[-83,38],[-66,69],[-39,44],[-38,16]],'#884b97');ellipse(c,-66,63,17,19,'#e4b0a3');
 path(c,[[29,-3],[59,13],[75,45],[53,66],[29,39]],'#82428e');ellipse(c,61,51,18,18,'#e4b0a3');
 c.save();if(sing>=0){c.translate(-5,-10);c.rotate(-.18);}if(attack){c.translate(35,-43);c.rotate(-.7);}mic(c,64,23,-.35);c.restore();
 path(c,[[-40,-80],[-31,-112],[16,-120],[48,-94],[47,-42],[25,-12],[-15,-21],[-42,-47]],'#dca89f');
 path(c,[[-45,-54],[-57,-91],[-44,-128],[-20,-118],[-12,-144],[8,-123],[42,-130],[53,-109],[47,-76],[28,-95],[11,-79],[-3,-96],[-29,-77],[-28,-47]],'#e9dedb');
 path(c,[[-33,-62],[-9,-56],[-14,-43],[-32,-45]],anger>0?'#ff6178':'#fff',ink,4);path(c,[[10,-56],[35,-68],[34,-46],[15,-42]],anger>0?'#ff6178':'#fff',ink,4);
 c.strokeStyle=ink;c.lineWidth=7;c.beginPath();c.moveTo(-35,-68);c.lineTo(-7,-58);c.moveTo(9,-58);c.lineTo(38,-75);c.stroke();
 if(sing>=0)ellipse(c,3,-26,14,10,'#391632',ink,4);else path(c,[[-12,-31],[20,-33],[17,-23],[-6,-24]],'#fff',ink,4);
 if(anger>0){c.strokeStyle='#ff4567';c.lineWidth=4;c.beginPath();c.moveTo(43,-91);c.lineTo(54,-84);c.lineTo(46,-79);c.moveTo(50,-95);c.lineTo(49,-76);c.stroke();}
 }else{
 path(c,[[-30,72],[-53,127],[-15,141],[5,105],[21,137],[63,129],[36,67]],'#3b569e');
 path(c,[[-48,123],[-77,136],[-77,153],[-14,155],[-6,135]],'#e94464');path(c,[[21,127],[15,150],[83,149],[78,132],[54,121]],'#e94464');
 path(c,[[-35,-2],[-51,32],[-34,77],[27,85],[47,59],[23,-6]],'#f9f5ed');ellipse(c,0,35,22,25,'#f54e70',ink,4);path(c,[[-18,50],[19,19],[24,28],[-14,60]],'#f54e70',null);
 path(c,[[-39,7],[-66,23],[-55,52],[-29,37]],'#f9f5ed');ellipse(c,-60,46,15,15,'#f4c8b4');
 path(c,[[30,7],[57,13],[69,37],[49,52],[27,35]],'#f9f5ed');ellipse(c,61,39,17,17,'#f4c8b4');mic(c,74,6,.35);
 path(c,[[-34,-79],[-48,-43],[-31,-8],[11,6],[38,-19],[39,-70],[3,-95]],'#f2c5ad');
 path(c,[[-49,-48],[-69,-62],[-42,-71],[-61,-91],[-27,-88],[-14,-116],[4,-94],[36,-92],[49,-61],[29,-66],[15,-39],[-2,-60],[-21,-36],[-18,-62],[-37,-40]],damaged?'#7a81a7':'#47d5ed');
 path(c,[[-49,-90],[-38,-115],[13,-120],[39,-101],[48,-78],[-9,-86],[-33,-75]],'#ed4566');path(c,[[-29,-94],[-58,-85],[-70,-73],[-26,-69],[15,-82]],'#ed4566');
 c.strokeStyle=ink;c.lineWidth=6;c.beginPath();if(damaged){c.moveTo(-23,-32);c.lineTo(-7,-23);c.moveTo(-20,-21);c.lineTo(-10,-34);c.moveTo(10,-35);c.lineTo(26,-25);c.moveTo(12,-24);c.lineTo(23,-37);c.moveTo(-3,-7);c.lineTo(2,-12);c.lineTo(9,-6);c.lineTo(16,-12);}else{c.moveTo(-16,-35);c.lineTo(-8,-22);c.moveTo(14,-40);c.lineTo(20,-28);c.moveTo(-1,-13);c.lineTo(19,-16);}c.stroke();if(sing>=0)ellipse(c,8,-12,11,9,'#742442',ink,4);
 }c.restore();}
 function speaker(c,x,y,s=1){c.save();c.translate(x,y);c.scale(s,s);path(c,[[-62,-115],[61,-115],[67,100],[-67,100]],'#332d43');for(const cy of [-58,46]){ellipse(c,0,cy,46,43,'#16121e');ellipse(c,0,cy,24,23,'#51455d');ellipse(c,-6,cy-5,13,12,'#262032',null);}c.restore();}
 function stage(c,w,h,anger=0,t=0){const g=c.createLinearGradient(0,0,0,h);g.addColorStop(0,anger===2?'#361125':'#21162f');g.addColorStop(1,'#43304e');c.fillStyle=g;c.fillRect(0,0,w,h);c.strokeStyle='#5d3e6755';c.lineWidth=2;for(let y=70;y<h*.74;y+=54){c.beginPath();c.moveTo(0,y);c.lineTo(w,y);c.stroke();for(let x=(y%108?0:90);x<w;x+=180){c.beginPath();c.moveTo(x,y);c.lineTo(x,y+54);c.stroke();}}
 c.save();c.translate(w*.5,h*.40);c.rotate(-.08);c.font=`900 ${Math.min(w*.18,h*.3)}px Impact`;c.textAlign='center';c.strokeStyle='#120e1d';c.lineWidth=15;c.strokeText('RUPTURA',0,0);c.fillStyle=anger===2?'#ac3159':'#664473';c.fillText('RUPTURA',0,0);c.restore();
 c.fillStyle='#17121fa8';c.fillRect(0,h*.76,w,h*.24);c.strokeStyle='#80618b';c.lineWidth=3;c.beginPath();c.moveTo(0,h*.76);c.lineTo(w,h*.76);c.stroke();for(let i=-3;i<10;i++){c.beginPath();c.moveTo(w*.5,h*.76);c.lineTo(i*w/6,h);c.strokeStyle='#4c365b';c.lineWidth=1;c.stroke();}for(let i=0;i<3;i++){c.fillStyle=anger===2?'#ff365c10':'#c3f45109';path(c,[[w*(.12+i*.38),0],[w*(i*.38-.1),h*.76],[w*(i*.38+.4),h*.76]],c.fillStyle,null);}}
 function school(c,w,h){const sky=c.createLinearGradient(0,0,0,h);sky.addColorStop(0,'#5393c7');sky.addColorStop(.7,'#bcdfeb');sky.addColorStop(1,'#f6f4e9');c.fillStyle=sky;c.fillRect(0,0,w,h);for(let i=0;i<5;i++){const x=w*(i*.28-.15);path(c,[[x,h*.48],[x+w*.25,h*.15],[x+w*.55,h*.48]],'#a8bfce',null);path(c,[[x+w*.15,h*.28],[x+w*.25,h*.15],[x+w*.36,h*.29],[x+w*.30,h*.26],[x+w*.25,h*.30],[x+w*.21,h*.26]],'#f5f6ee',null);}c.fillStyle='#efece1';c.fillRect(0,h*.49,w,h*.51);path(c,[[w*.17,h*.48],[w*.17,h*.31],[w*.83,h*.31],[w*.83,h*.48]],'#c48d70','#634f4a',4);path(c,[[w*.13,h*.31],[w*.5,h*.23],[w*.87,h*.31]],'#825761','#4d3e47',4);c.fillStyle='#f7f4e8';c.fillRect(w*.29,h*.33,w*.42,h*.06);c.font='700 '+Math.min(w*.032,28)+'px Arial';c.textAlign='center';c.fillStyle='#5a4448';c.fillText('SOUTH PARK ELEMENTARY',w*.5,h*.37);for(let i=0;i<6;i++){c.fillStyle='#93c2d6';c.fillRect(w*(.21+i*.1),h*.41,w*.06,h*.045);}c.fillStyle='#414b56';c.fillRect(0,h*.73,w,h*.27);c.fillStyle='#d7deca';c.fillRect(0,h*.72,w,h*.015);for(let i=0;i<9;i++){c.fillStyle='#e9d375';c.fillRect(w*(i*.15),h*.89,w*.08,h*.008);}for(const x of [w*.06,w*.94]){path(c,[[x-24,h*.53],[x,h*.35],[x+24,h*.53]],'#33765e',null);path(c,[[x-30,h*.58],[x,h*.41],[x+30,h*.58]],'#28664f',null);}c.fillStyle='#14223630';c.fillRect(0,h*.72,w,h*.28);}
function cartman(c,x,y,s,t,last){const singing=t-Math.max(...last)<.22;c.save();c.translate(x,y+Math.sin(t*5)*3);c.scale(s,s);ellipse(c,0,150,110,13,'#100c1780',null);path(c,[[-80,125],[-85,151],[-3,152],[0,131]],'#292b33');path(c,[[3,131],[1,152],[89,151],[80,124]],'#292b33');ellipse(c,0,55,105,88,'#d83f48');path(c,[[0,-12],[0,137],[4,137],[4,-12]],'#a52433',null);ellipse(c,-98,56,24,28,'#ffe24e');ellipse(c,98,56,24,28,'#ffe24e');ellipse(c,0,-43,97,75,'#f5c79e');ellipse(c,0,-81,93,46,'#40b9c8');path(c,[[-93,-79],[-92,-62],[91,-62],[93,-79]],'#f9dc44',null);ellipse(c,0,-125,16,12,'#f9dc44',null);ellipse(c,-21,-40,20,25,'#fff',null);ellipse(c,21,-40,20,25,'#fff',null);ellipse(c,-15,-39,3,4,'#16121a',null);ellipse(c,15,-39,3,4,'#16121a',null);if(singing)ellipse(c,0,-5,18,12,'#4a1826',null);else{c.strokeStyle='#513329';c.lineWidth=3;c.beginPath();c.moveTo(-15,-3);c.lineTo(15,-3);c.stroke();}mic(c,91,29,-.4);c.restore();}
const portraits={};const portraitReady=typeof Image==='undefined'?Promise.resolve():Promise.all(['cartman','kyle'].map(kind=>new Promise(resolve=>{const img=new Image();img.onload=()=>{const texture=document.createElement('canvas');const ratio=Math.min(1,520/img.height);texture.width=Math.round(img.width*ratio);texture.height=Math.round(img.height*ratio);texture.getContext('2d').drawImage(img,0,0,texture.width,texture.height);portraits[kind]=texture;resolve();};img.onerror=resolve;img.src='/static/media/'+kind+'.png';})));
function notePose(t,event){
 if(!event||t<event.start||t>=event.end+.12)return{lane:0,amount:0,mouth:0};
 const age=t-event.start,release=Math.max(0,t-event.end);
 const amount=Math.min(1,age/.035)*Math.max(0,1-release/.12);
 return{lane:event.lane,amount,mouth:t<event.end?amount:0};
}
function southpark(kind,c,x,y,s,t,bpm,last,damaged=false,light=false,event=null){
 const p=notePose(t,event),k=kind==='kyle',v=p.amount,l=p.lane;
 const dx=[-17,0,0,17][l]*v,dy=[0,15,-13,0][l]*v;
 c.save();c.translate(x,y);c.scale(s,s);
 ellipse(c,0,148,k?83:112,10,'#090a1355',null);
 // Separate paper-cutout body, arms and head. The note envelope drives each joint.
 c.save();c.translate(light?0:dx*.35,light?0:dy*.35);
 path(c,[[-65,112],[-72,145],[-3,145],[-2,115]],'#27282d',ink,3);
 path(c,[[2,115],[3,145],[74,145],[65,112]],'#27282d',ink,3);
 ellipse(c,0,66,k?70:112,69,k?'#e57925':'#d63c42',ink,3);
 c.strokeStyle=k?'#9b4b1f':'#912d32';c.lineWidth=2;c.beginPath();c.moveTo(0,18);c.lineTo(0,127);c.stroke();
 if(k){for(const side of [-1,1]){const px=side*37;c.strokeStyle='#794421';c.lineWidth=2;c.strokeRect(px-13,58,26,29);path(c,[[px-12,59],[px,72],[px+12,59]],'#d66f23','#794421',2);}}
 for(let b=0;b<3;b++)ellipse(c,7,58+b*23,2,3,'#312a2b',null);
 for(const side of [-1,1]){c.save();c.translate(side*(k?60:91),43);c.rotate(light?0:side*(-.15-v*(side===1?.65:.32)));
 ellipse(c,0,24,17,35,k?'#e57925':'#d63c42',ink,2);ellipse(c,0,49,19,17,k?'#397c3c':'#f5d43e',ink,2);
 if(side===1)mic(c,0,20,-.2);c.restore();}
 c.restore();
 c.save();c.translate(light?0:dx,light?0:dy);c.rotate(light?0:damaged?-.12:[-.09,.025,-.035,.09][l]*v);
 ellipse(c,0,-38,k?74:106,k?72:80,'#f4ceaa',ink,2);
 if(k){
 path(c,[[-79,-42],[-80,-111],[-60,-125],[60,-125],[80,-111],[79,-42],[57,-34],[56,-88],[-56,-88],[-57,-34]],'#3b983e',ink,3);
 path(c,[[-57,-94],[57,-94],[57,-114],[-57,-114]],'#317c35',null);
 }else{
 c.save();c.beginPath();c.rect(-110,-150,220,82);c.clip();ellipse(c,0,-72,106,59,'#39b4c6',ink,2);c.restore();
 path(c,[[-104,-78],[104,-78],[104,-65],[-104,-65]],'#f4d43e',null);ellipse(c,0,-132,18,11,'#f4d43e',null);
 }
 if(k){for(const side of [-1,1])ellipse(c,side*76,-51,14,39,'#438f38',null);}
 const blink=!light&&!v&&(t%4.7>4.55);
 for(const side of [-1,1]){
 ellipse(c,side*21,-39,21,26,'#fff',null);
 if(blink){c.strokeStyle='#9e755a';c.lineWidth=3;c.beginPath();c.moveTo(side*21-16,-39);c.lineTo(side*21+16,-39);c.stroke();}
 else ellipse(c,side*17+ (light?0:dx*.12),-38+(light?0:dy*.12),2.5,3.5,'#171719',null);
 if(damaged||v>.3){c.strokeStyle='#47342a';c.lineWidth=3;c.beginPath();c.moveTo(side*37,-65);c.lineTo(side*8,-60+(damaged?7:0));c.stroke();}
 }
 // Four distinct mouth drawings, opened by the current note rather than a free-running sine.
 const opening=p.mouth;
 if(opening>.05&&!damaged){
 const widths=[19,23,11,17],heights=[10,15,18,11],mw=widths[l],mh=Math.max(2,heights[l]*opening);
 ellipse(c,0,0,mw,mh,'#331b22',null);
 c.save();c.beginPath();c.ellipse(0,0,mw,mh,0,0,Math.PI*2);c.clip();
 c.fillStyle='#fff6e7';c.fillRect(-mw,-mh,mw*2,l===2?3:5);
 if(!light)ellipse(c,3,mh-2,mw*.65,4,'#c56877',null);c.restore();
 }else{c.strokeStyle='#493228';c.lineWidth=2.5;c.beginPath();c.moveTo(-13,1);c.lineTo(0,damaged?-4:2);c.lineTo(13,1);c.stroke();}
 if(!k){c.strokeStyle='#b88c6e';c.lineWidth=1.5;c.beginPath();c.moveTo(-26,20);c.quadraticCurveTo(0,28,26,20);c.stroke();}
 c.restore();c.restore();
}
function poster(){const el=document.querySelector('#poster');if(!el)return;const r=el.getBoundingClientRect(),d=Math.min(devicePixelRatio||1,2);el.width=r.width*d;el.height=r.height*d;const c=el.getContext('2d');c.scale(d,d);const w=r.width,h=r.height;c.save();c.translate(w*.5,h*.52);c.rotate(-.12);for(let i=0;i<12;i++){c.rotate(Math.PI/6);path(c,[[35,-12],[w*.6,-22],[w*.6,0]],'#73485d44',null);}c.restore();speaker(c,w*.5,h*.68,.8);character(c,w*.29,h*.56,.91,true,1,0);character(c,w*.71,h*.64,.86,false,0,0);c.font='900 80px Impact';c.strokeStyle=ink;c.lineWidth=10;c.strokeText('VS',w*.42,h*.62);c.fillStyle='#c3f451';c.fillText('VS',w*.42,h*.62);}
 // Cached sprite atlases: idle, four singing directions, dodge and attack;
 // two drawn frames per pose. Input selects a pose without redrawing the artwork.
 const atlases=new Map();
 function atlas(enemy,anger){const key=`${enemy}:${anger}`;if(atlases.has(key))return atlases.get(key);const sheet=document.createElement('canvas');sheet.width=280*16;sheet.height=360;const a=sheet.getContext('2d');for(let pose=0;pose<8;pose++){for(let frame=0;frame<2;frame++){a.save();a.translate((pose*2+frame)*280,0);character(a,140,180,1,enemy,anger,frame?Math.PI/2:Math.PI*1.5,pose===5,pose===6,pose>=1&&pose<=4?pose-1:-1,pose===7);a.restore();}}atlases.set(key,sheet);return sheet;}
 function sprite(c,x,y,s,enemy,anger,t,bpm,last,dodge,attack,damaged=false,light=false,event=null){let lane=-1,latest=-Infinity;for(let i=0;i<4;i++)if(last[i]>latest){latest=last[i];lane=i;}const motion=notePose(t,event);if(event)lane=motion.lane;const singing=event?motion.amount>0:t-latest<.21;let pose=damaged?7:attack?6:dodge?5:singing?lane+1:0;const frame=light?0:Math.floor(t*bpm/60*2)%2;const sheet=atlas(enemy,anger);c.save();if(!light){const strength=motion.amount;c.translate(x,y);c.rotate((damaged?-.045:singing?[-.035,.015,-.015,.035][lane]:0)*strength);c.scale(1+strength*.018,1-strength*.012);c.translate(-x,-y);}c.drawImage(sheet,(pose*2+Math.abs(frame))*280,0,280,360,x-140*s,y-180*s,280*s,360*s);c.restore();}
 addEventListener('resize',poster);document.fonts.ready.then(poster);return{notePose,character,sprite,stage,speaker,mic,poster,cartman,school,southpark,ready:portraitReady};
})();
