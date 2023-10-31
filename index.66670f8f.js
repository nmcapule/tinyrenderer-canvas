class t{constructor(t,e){this.x=t,this.y=e,Object.freeze(this)}sub(e){return new t(this.x-e.x,this.y-e.y)}swap(){return new t(this.y,this.x)}}class e{constructor(t,e,s,i){this.r=t,this.g=e,this.b=s,this.a=i,Object.freeze(this)}}class s{constructor(t){this.canvas=t,this.ctx=t.getContext("2d"),this.useContextAPI=!1,// Make the origin be at the bottom left corner.
// this.ctx.transform(1, 0, 0, -1, 0, canvas.height);
// Make the origin at the center.
this.ctx.transform(1,0,0,-1,.5*t.width,.5*t.height)}clear(){this.ctx.clearRect(0,0,this.canvas.width,this.canvas.height)}colorize(t){return t?`rgba(${t.r}, ${t.g}, ${t.b}, ${t.a})`:"rgba(0, 0, 0, 0)"}drawPixel(t,e){e&&(this.ctx.fillStyle=`rgba(${e.r}, ${e.g}, ${e.b}, ${e.a})`),this.ctx.fillRect(t.x,t.y,1,1)}/**
   * Bresenham's line drawing algorithm.
   *
   * Yes, it's easier to just call ctx.lineTo() but this is for learning
   * purposes. It took me more than 2 hours just to get this right :P It's
   * not even optimized :))
   */drawLine(e,s,i){if(this.useContextAPI){this.ctx.beginPath(),this.ctx.moveTo(e.x,e.y),this.ctx.lineTo(s.x,s.y),this.ctx.strokeStyle=this.colorize(i),this.ctx.stroke();return}let r=!1;if(Math.abs(e.x-s.x)<Math.abs(e.y-s.y)&&(r=!0,e=e.swap(),s=s.swap()),e.x>s.x){let t=e;e=s,s=t}let a=(s.y-e.y)/(s.x-e.x);for(let n=e.x;n<=s.x;n++){let s=e.y+(n-e.x)*a;r?this.drawPixel(new t(s,n),i):this.drawPixel(new t(n,s),i)}}drawTriangle(t,e,s,i){this.drawLine(t,e,i),this.drawLine(e,s,i),this.drawLine(s,t,i)}/**
   * The non-useContextAPI path is slow AF, but it also works :))
   *
   * Based on ssloy/tinyrenderer lesson #2: Triangle rasterization :D
   */drawFilledTriangle(e,s,i,r){if(this.useContextAPI){this.ctx.beginPath(),this.ctx.moveTo(e.x,e.y),this.ctx.lineTo(s.x,s.y),this.ctx.lineTo(i.x,i.y),this.ctx.closePath(),this.ctx.fillStyle=this.colorize(r),this.ctx.fill();return}let a=[e,s,i];a.sort((t,e)=>t.y-e.y);let n=Math.max(a[0].y,a[1].y,a[2].y);for(let e=a[0].y;e<n;e++){let s=a[0],i=a[1],n=a[2];// Wth... i'm not sure what happened here, but if fucking works.
e>=a[1].y&&(s=a[2],i=a[1],n=a[0]);let c=e-s.y,l=c/(i.y-s.y),o=s.x-(s.x-i.x)*l,h=c/(n.y-s.y),x=s.x-(s.x-n.x)*h;this.drawLine(new t(o,e),new t(x,e),r)}}}class i{constructor(t,e,s){this.x=t,this.y=e,this.z=s}static fromArray(t){return new i(t[0],t[1],t[2])}}async function r(t){let e=await fetch(new URL(t)),s=await e.text(),r=new a([],[],[],[]);for(let t of s.split("\n")){let e=t.split(" ");if(!["v","vt","vn","f"].includes(e[0]))continue;let s=e[0];if("f"===s){let t=e[1].split("/").map(parseFloat),s=e[2].split("/").map(parseFloat),i=e[3].split("/").map(parseFloat);r.faces.push([t,s,i]);continue}let a=parseFloat(e[1]),n=parseFloat(e[2]),c=parseFloat(e[3]);"v"===s?r.vertices.push(new i(a,n,c)):"vt"===s?r.textures.push(new i(a,n,c)):"vn"===s&&r.normals.push(new i(a,n,c))}return r}class a{constructor(t,e,s,i){this.vertices=t,this.textures=e,this.normals=s,this.faces=i}getVerticesForFace(t){// The reference doc says we are only interested in the first number for
// each subarray entry in a face, and that it is one-indexed so we need to
// subtract one.
// https://github.com/ssloy/tinyrenderer/wiki/Lesson-1:-Bresenham%E2%80%99s-Line-Drawing-Algorithm#wireframe-rendering
return t.map(t=>this.vertices[t[0]-1])}}async function n(){let i=document.getElementById("canvas");if(!i.getContext)throw Error("Canvas not supported");let a=new s(i);a.useContextAPI=!0,a.clear();let n=await r(`${window.location.href}african_head.obj`),c=performance.now();for(let s=0;s<n.faces.length;s++){let i=n.getVerticesForFace(n.faces[s]);for(let s=0;s<3;s++){let r=i[s],n=i[(s+1)%3];try{let s=r.x*a.canvas.width/2,i=r.y*a.canvas.height/2,c=n.x*a.canvas.width/2,l=n.y*a.canvas.height/2;a.drawLine(new t(s,i),new t(c,l),new e(0,0,0,255))}catch(t){console.log(r,n),console.error(t)}}}let l=performance.now();console.log(`Took ${l-c}ms`)}// Add hook to the render button.
const c=document.getElementById("render");c.addEventListener("click",n),// But.. let's render at start anyways.
n();//# sourceMappingURL=index.66670f8f.js.map

//# sourceMappingURL=index.66670f8f.js.map
