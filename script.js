const screens = [...document.querySelectorAll(".screen")];
function show(id){
  screens.forEach(s=>s.classList.toggle("active",s.id===id));
  window.scrollTo({top:0,behavior:"smooth"});
}
document.getElementById("openLetter").addEventListener("click",()=>{
  document.querySelector(".flap").style.transform="rotateX(180deg)";
  setTimeout(()=>show("sorry"),420);
});
document.getElementById("toMeter").addEventListener("click",()=>show("meter"));
document.getElementById("toMemories").addEventListener("click",()=>show("memories"));
document.getElementById("toForgive").addEventListener("click",()=>show("forgive"));

const range=document.getElementById("sorryRange");
const number=document.getElementById("meterNumber");
const caption=document.getElementById("meterCaption");
range.addEventListener("input",()=>{
  number.textContent=range.value;
  const v=Number(range.value);
  caption.textContent=v>80?"My apologies are bigger than this little slider. 🥺":v>50?"I really, truly mean it. 💙":v>20?"I'll keep trying to make things right.":"Okay, I know I have some work to do. 😅";
});

/* gallery dots */
const gallery=document.getElementById("gallery");
const dots=document.getElementById("dots");
const figs=[...gallery.querySelectorAll("figure")];
figs.forEach((_,i)=>dots.appendChild(document.createElement("i")));
const dotEls=[...dots.children];
function updateDots(){
  const c=gallery.scrollLeft+gallery.clientWidth/2;
  let best=0,bd=1e9;
  figs.forEach((f,i)=>{const d=Math.abs(f.offsetLeft+f.offsetWidth/2-c);if(d<bd){bd=d;best=i}});
  dotEls.forEach((d,i)=>d.classList.toggle("on",i===best));
}
gallery.addEventListener("scroll",updateDots,{passive:true});
window.addEventListener("load",updateDots);
updateDots();

const noBtn=document.getElementById("noBtn");
const noNote=document.getElementById("noNote");
let noCount=0;
noBtn.addEventListener("click",()=>{
  noCount++;
  const messages=["That's okay… I'll give you time. 🥺","Still here, with a sincere apology. 💙","I won't give up on becoming better. 🌷","No pressure, Madam. Take your time. ♡"];
  noNote.textContent=messages[Math.min(noCount-1,messages.length-1)];
  if(noCount<4){
    const dx=(Math.random()-.5)*100,dy=(Math.random()-.5)*35;
    noBtn.style.transform=`translate(${dx}px,${dy}px)`;
  }else{
    noBtn.style.transform="none";
    noBtn.textContent="I need time";
  }
});
document.getElementById("yesBtn").addEventListener("click",()=>show("final"));
document.getElementById("replay").addEventListener("click",()=>{
  range.value=100;number.textContent="100";caption.textContent="My apologies are bigger than this little slider. 🥺";
  noCount=0;noBtn.textContent="Not yet";noBtn.style.transform="none";
  document.querySelector(".flap").style.transform="";
  gallery.scrollLeft=0;
  show("welcome");
});
