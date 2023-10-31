class t{constructor(t,e){this.x=t,this.y=e,Object.freeze(this)}static fromObject(e){return new t(e.x,e.y)}sub(e){return new t(this.x-e.x,this.y-e.y)}swap(){return new t(this.y,this.x)}}class e{constructor(t,e,s,i){this.r=t,this.g=e,this.b=s,this.a=i,Object.freeze(this)}}class s{constructor(t,e,s){this.x=t,this.y=e,this.z=s}static fromArray(t){return new s(t[0],t[1],t[2])}}async function i(t){let e=await fetch(new URL(t)),i=await e.text(),r=new a([],[],[],[]);for(let t of i.split("\n")){let e=t.split(" ");if(!["v","vt","vn","f"].includes(e[0]))continue;let i=e[0];if("f"===i){let t=e[1].split("/").map(parseFloat),s=e[2].split("/").map(parseFloat),i=e[3].split("/").map(parseFloat);r.faces.push([t,s,i]);continue}let a=parseFloat(e[1]),n=parseFloat(e[2]),c=parseFloat(e[3]);"v"===i?r.vertices.push(new s(a,n,c)):"vt"===i?r.textures.push(new s(a,n,c)):"vn"===i&&r.normals.push(new s(a,n,c))}return r}class a{constructor(t,e,s,i){this.vertices=t,this.textures=e,this.normals=s,this.faces=i}getVerticesForFace(t){// The reference doc says we are only interested in the first number for
// each subarray entry in a face, and that it is one-indexed so we need to
// subtract one.
// https://github.com/ssloy/tinyrenderer/wiki/Lesson-1:-Bresenham%E2%80%99s-Line-Drawing-Algorithm#wireframe-rendering
return t.map(t=>this.vertices[t[0]-1])}}async function r(s){let a=await i(`${window.location.href}african_head.obj`),r=performance.now();for(let i=0;i<a.faces.length;i++){let r=a.getVerticesForFace(a.faces[i]),n=r.map(e=>t.fromObject({x:e.x*s.canvas.width/2,y:e.y*s.canvas.height/2}));s.drawFilledTriangle(n[0],n[1],n[2],new e(255*Math.random(),255*Math.random(),255*Math.random(),255))}let n=performance.now();console.log(`Took ${n-r}ms`)}const n=document.getElementById("canvas");if(!n.getContext)throw Error("Canvas not supported");const c=new class{constructor(t){this.canvas=t,this.ctx=t.getContext("2d"),this.useContextAPI=!1,// Make the origin be at the bottom left corner.
// this.ctx.transform(1, 0, 0, -1, 0, canvas.height);
// Make the origin at the center.
this.ctx.transform(1,0,0,-1,.5*t.width,.5*t.height)}clear(){this.ctx.clearRect(0,0,this.canvas.width,this.canvas.height)}colorize(t){return t?`rgba(${t.r}, ${t.g}, ${t.b}, ${t.a})`:"rgba(0, 0, 0, 0)"}drawPixel(t,e){e&&(this.ctx.fillStyle=`rgba(${e.r}, ${e.g}, ${e.b}, ${e.a})`),this.ctx.fillRect(t.x,t.y,1,1)}/**
   * Bresenham's line drawing algorithm.
   *
   * Yes, it's easier to just call ctx.lineTo() but this is for learning
   * purposes. It took me more than 2 hours just to get this right :P It's
   * not even optimized :))
   */drawLine(e,s,i){if(this.useContextAPI){this.ctx.beginPath(),this.ctx.moveTo(e.x,e.y),this.ctx.lineTo(s.x,s.y),this.ctx.strokeStyle=this.colorize(i),this.ctx.stroke();return}let a=!1;if(Math.abs(e.x-s.x)<Math.abs(e.y-s.y)&&(a=!0,e=e.swap(),s=s.swap()),e.x>s.x){let t=e;e=s,s=t}let r=(s.y-e.y)/(s.x-e.x);for(let n=e.x;n<=s.x;n++){let s=e.y+(n-e.x)*r;a?this.drawPixel(new t(s,n),i):this.drawPixel(new t(n,s),i)}}drawTriangle(t,e,s,i){this.drawLine(t,e,i),this.drawLine(e,s,i),this.drawLine(s,t,i)}/**
   * The non-useContextAPI path is slow AF, but it also works :))
   *
   * Based on ssloy/tinyrenderer lesson #2: Triangle rasterization :D
   */drawFilledTriangle(e,s,i,a){if(this.useContextAPI){this.ctx.beginPath(),this.ctx.moveTo(e.x,e.y),this.ctx.lineTo(s.x,s.y),this.ctx.lineTo(i.x,i.y),this.ctx.closePath(),this.ctx.fillStyle=this.colorize(a),this.ctx.fill();return}let r=[e,s,i];r.sort((t,e)=>t.y-e.y);let n=Math.max(r[0].y,r[1].y,r[2].y);for(let e=r[0].y;e<n;e++){let s=r[0],i=r[1],n=r[2];// Wth... i'm not sure what happened here, but if fucking works.
e>=r[1].y&&(s=r[2],i=r[1],n=r[0]);let c=e-s.y,o=c/(i.y-s.y),h=s.x-(s.x-i.x)*o,l=c/(n.y-s.y),x=s.x-(s.x-n.x)*l;this.drawLine(new t(h,e),new t(x,e),a)}}}(n);c.useContextAPI=!0,c.clear();// Add hook to the render button.
const o=document.getElementById("render");o.addEventListener("click",()=>r(c)),// But.. let's render at start anyways.
r(c);//# sourceMappingURL=index.9d00823a.js.map

//# sourceMappingURL=index.9d00823a.js.map
