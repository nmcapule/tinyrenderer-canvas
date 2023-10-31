class t{constructor(t,e,s){this.x=t,this.y=e,this.z=s}static fromArray(e){return new t(e[0],e[1],e[2])}cross(e){return new t(this.y*e.z-this.z*e.y,this.z*e.x-this.x*e.z,this.x*e.y-this.y*e.x)}unit(){let e=Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z);return new t(this.x/e,this.y/e,this.z/e)}}class e{constructor(t,e){this.x=t,this.y=e,Object.freeze(this)}static fromObject(t){return new e(t.x,t.y)}sub(t){return new e(this.x-t.x,this.y-t.y)}swap(){return new e(this.y,this.x)}}class s{constructor(t,e,s,i){this.r=t,this.g=e,this.b=s,this.a=i,Object.freeze(this)}}async function i(e){let s=await fetch(new URL(e)),i=await s.text(),a=new r([],[],[],[]);for(let e of i.split("\n")){let s=e.split(" ");if(!["v","vt","vn","f"].includes(s[0]))continue;let i=s[0];if("f"===i){let t=s[1].split("/").map(parseFloat),e=s[2].split("/").map(parseFloat),i=s[3].split("/").map(parseFloat);a.faces.push([t,e,i]);continue}let r=parseFloat(s[1]),n=parseFloat(s[2]),h=parseFloat(s[3]);"v"===i?a.vertices.push(new t(r,n,h)):"vt"===i?a.textures.push(new t(r,n,h)):"vn"===i&&a.normals.push(new t(r,n,h))}return a}class r{constructor(t,e,s,i){this.vertices=t,this.textures=e,this.normals=s,this.faces=i}getVerticesForFace(t){// The reference doc says we are only interested in the first number for
// each subarray entry in a face, and that it is one-indexed so we need to
// subtract one.
// https://github.com/ssloy/tinyrenderer/wiki/Lesson-1:-Bresenham%E2%80%99s-Line-Drawing-Algorithm#wireframe-rendering
return t.map(t=>this.vertices[t[0]-1])}}async function a(t){let r=await i(`${window.location.href}african_head.obj`),a=performance.now();for(let i=0;i<r.faces.length;i++){let a=r.getVerticesForFace(r.faces[i]),n=a.map(s=>e.fromObject({x:s.x*t.canvas.width/2,y:s.y*t.canvas.height/2})),h=a[2].cross(a[1]).unit(),c=new s(255*h.x,255*h.y,255*h.z,255);t.drawFilledTriangle(n[0],n[1],n[2],c)}let n=performance.now();console.log(`Took ${n-a}ms`)}const n=document.getElementById("canvas");if(!n.getContext)throw Error("Canvas not supported");const h=new class{constructor(t){this.canvas=t,this.ctx=t.getContext("2d"),this.useContextAPI=!1,// Make the origin be at the bottom left corner.
// this.ctx.transform(1, 0, 0, -1, 0, canvas.height);
// Make the origin at the center.
this.ctx.transform(1,0,0,-1,.5*t.width,.5*t.height)}clear(){this.ctx.clearRect(0,0,this.canvas.width,this.canvas.height)}colorize(t){return t?`rgba(${t.r}, ${t.g}, ${t.b}, ${t.a})`:"rgba(0, 0, 0, 0)"}drawPixel(t,e){e&&(this.ctx.fillStyle=`rgba(${e.r}, ${e.g}, ${e.b}, ${e.a})`),this.ctx.fillRect(t.x,t.y,1,1)}/**
   * Bresenham's line drawing algorithm.
   *
   * Yes, it's easier to just call ctx.lineTo() but this is for learning
   * purposes. It took me more than 2 hours just to get this right :P It's
   * not even optimized :))
   */drawLine(t,s,i){if(this.useContextAPI){this.ctx.beginPath(),this.ctx.moveTo(t.x,t.y),this.ctx.lineTo(s.x,s.y),this.ctx.strokeStyle=this.colorize(i),this.ctx.stroke();return}let r=!1;if(Math.abs(t.x-s.x)<Math.abs(t.y-s.y)&&(r=!0,t=t.swap(),s=s.swap()),t.x>s.x){let e=t;t=s,s=e}let a=(s.y-t.y)/(s.x-t.x);for(let n=t.x;n<=s.x;n++){let s=t.y+(n-t.x)*a;r?this.drawPixel(new e(s,n),i):this.drawPixel(new e(n,s),i)}}drawTriangle(t,e,s,i){this.drawLine(t,e,i),this.drawLine(e,s,i),this.drawLine(s,t,i)}/**
   * The non-useContextAPI path is slow AF, but it also works :))
   *
   * Based on ssloy/tinyrenderer lesson #2: Triangle rasterization :D
   */drawFilledTriangle(t,s,i,r){if(this.useContextAPI){this.ctx.beginPath(),this.ctx.moveTo(t.x,t.y),this.ctx.lineTo(s.x,s.y),this.ctx.lineTo(i.x,i.y),this.ctx.closePath(),this.ctx.fillStyle=this.colorize(r),this.ctx.fill();return}let a=[t,s,i];a.sort((t,e)=>t.y-e.y);let n=Math.max(a[0].y,a[1].y,a[2].y);for(let t=a[0].y;t<n;t++){let s=a[0],i=a[1],n=a[2];// Wth... i'm not sure what happened here, but if fucking works.
t>=a[1].y&&(s=a[2],i=a[1],n=a[0]);let h=t-s.y,c=h/(i.y-s.y),o=s.x-(s.x-i.x)*c,l=h/(n.y-s.y),x=s.x-(s.x-n.x)*l;this.drawLine(new e(o,t),new e(x,t),r)}}}(n);h.useContextAPI=!0,h.clear();// Add hook to the render button.
const c=document.getElementById("render");c.addEventListener("click",()=>a(h)),// But.. let's render at start anyways.
a(h);//# sourceMappingURL=index.fb3ba7ae.js.map

//# sourceMappingURL=index.fb3ba7ae.js.map
