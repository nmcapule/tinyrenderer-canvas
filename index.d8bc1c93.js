class t{constructor(t,e,s){this.x=t,this.y=e,this.z=s}static fromArray(e){return new t(e[0],e[1],e[2])}sub(e){return new t(this.x-e.x,this.y-e.y,this.z-e.z)}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z}cross(e){return new t(this.y*e.z-this.z*e.y,this.z*e.x-this.x*e.z,this.x*e.y-this.y*e.x)}unit(){let e=Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z);return new t(this.x/e,this.y/e,this.z/e)}}class e{constructor(t,e){this.x=t,this.y=e,Object.freeze(this)}static fromObject(t){return new e(t.x,t.y)}sub(t){return new e(this.x-t.x,this.y-t.y)}swap(){return new e(this.y,this.x)}}class s{constructor(t,e,s,i){this.r=t,this.g=e,this.b=s,this.a=i,Object.freeze(this)}}class i{constructor(t){this.canvas=t,this.ctx=t.getContext("2d"),this.useContextAPI=!1,// Make the origin be at the bottom left corner.
// this.ctx.transform(1, 0, 0, -1, 0, canvas.height);
// Make the origin at the center.
this.ctx.transform(1,0,0,-1,.5*t.width,.5*t.height)}clear(){this.ctx.clearRect(0,0,this.canvas.width,this.canvas.height)}colorize(t){return t?`rgba(${t.r}, ${t.g}, ${t.b}, ${t.a})`:"rgba(0, 0, 0, 0)"}drawPixel(t,e){e&&(this.ctx.fillStyle=`rgba(${e.r}, ${e.g}, ${e.b}, ${e.a})`),this.ctx.fillRect(t.x,t.y,1,1)}/**
   * Bresenham's line drawing algorithm.
   *
   * Yes, it's easier to just call ctx.lineTo() but this is for learning
   * purposes. It took me more than 2 hours just to get this right :P It's
   * not even optimized :))
   */drawLine(t,s,i){if(this.useContextAPI){this.ctx.beginPath(),this.ctx.moveTo(t.x,t.y),this.ctx.lineTo(s.x,s.y),this.ctx.strokeStyle=this.colorize(i),this.ctx.stroke();return}let r=!1;if(Math.abs(t.x-s.x)<Math.abs(t.y-s.y)&&(r=!0,t=t.swap(),s=s.swap()),t.x>s.x){let e=t;t=s,s=e}let a=(s.y-t.y)/(s.x-t.x);for(let n=t.x;n<=s.x;n++){let s=t.y+(n-t.x)*a;r?this.drawPixel(new e(s,n),i):this.drawPixel(new e(n,s),i)}}drawTriangle(t,e,s,i){this.drawLine(t,e,i),this.drawLine(e,s,i),this.drawLine(s,t,i)}drawBarycentricTriangle(s,i,r,a){let n={a:new e(Math.min(s.x,i.x,r.x),Math.min(s.y,i.y,r.y)),b:new e(Math.max(s.x,i.x,r.x),Math.max(s.y,i.y,r.y))};for(let h=n.a.x;h<=n.b.x;h++)for(let o=n.a.y;o<=n.b.y;o++){let n=function(e,s){let i=t.fromArray([e[2].x-e[0].x,e[1].x-e[0].x,e[0].x-s.x]).cross(t.fromArray([e[2].y-e[0].y,e[1].y-e[0].y,e[0].y-s.y]));return 1>Math.abs(i.z)?t.fromArray([-1,1,1]):t.fromArray([1-(i.x+i.y)/i.z,i.y/i.z,i.x/i.z])}([s,i,r],new e(h,o));n.x<0||n.y<0||n.z<0||this.drawPixel(new e(h,o),a)}}/**
   * The non-useContextAPI path is slow AF, but it also works :))
   *
   * Based on ssloy/tinyrenderer lesson #2: Triangle rasterization :D
   */drawFilledTriangle(t,s,i,r){if(this.useContextAPI){this.ctx.beginPath(),this.ctx.moveTo(t.x,t.y),this.ctx.lineTo(s.x,s.y),this.ctx.lineTo(i.x,i.y),this.ctx.closePath(),this.ctx.fillStyle=this.colorize(r),this.ctx.fill();return}let a=[t,s,i];a.sort((t,e)=>t.y-e.y);let n=Math.max(a[0].y,a[1].y,a[2].y);for(let t=a[0].y;t<n;t++){let s=a[0],i=a[1],n=a[2];// Wth... i'm not sure what happened here, but if fucking works.
t>=a[1].y&&(s=a[2],i=a[1],n=a[0]);let h=t-s.y,o=h/(i.y-s.y),x=s.x-(s.x-i.x)*o,c=h/(n.y-s.y),l=s.x-(s.x-n.x)*c;this.drawLine(new e(x,t),new e(l,t),r)}}}async function r(e){let s=await fetch(new URL(e)),i=await s.text(),r=new a([],[],[],[]);for(let e of i.split("\n")){let s=e.split(" ");if(!["v","vt","vn","f"].includes(s[0]))continue;let i=s[0];if("f"===i){let t=s[1].split("/").map(parseFloat),e=s[2].split("/").map(parseFloat),i=s[3].split("/").map(parseFloat);r.faces.push([t,e,i]);continue}let a=parseFloat(s[1]),n=parseFloat(s[2]),h=parseFloat(s[3]);"v"===i?r.vertices.push(new t(a,n,h)):"vt"===i?r.textures.push(new t(a,n,h)):"vn"===i&&r.normals.push(new t(a,n,h))}return r}class a{constructor(t,e,s,i){this.vertices=t,this.textures=e,this.normals=s,this.faces=i}getVerticesForFace(t){// The reference doc says we are only interested in the first number for
// each subarray entry in a face, and that it is one-indexed so we need to
// subtract one.
// https://github.com/ssloy/tinyrenderer/wiki/Lesson-1:-Bresenham%E2%80%99s-Line-Drawing-Algorithm#wireframe-rendering
return t.map(t=>this.vertices[t[0]-1])}}async function n(i,r,a=new t(0,0,-1)){let n=performance.now();for(let t of r)for(let r of t.faces){let n=t.getVerticesForFace(r),h=n.map(t=>e.fromObject({x:t.x*i.canvas.width/2,y:t.y*i.canvas.height/2})),o=n[2].sub(n[0]).cross(n[1].sub(n[0])).unit(),x=o.dot(a);if(x<0)continue;let c=new s(255*x,255*x,255*x,255);i.drawBarycentricTriangle(h[0],h[1],h[2],c)}let h=performance.now();console.log(`Took ${h-n}ms`)}!async function(){let e=document.getElementById("canvas");if(!e.getContext)throw Error("Canvas not supported");let s=new i(e);s.useContextAPI=!0,s.clear();let a=await r(`${window.location.href}african_head.obj`);e.addEventListener("mousemove",i=>{let r=new t(-i.x/e.height+.5,i.y/e.height-.5,-1);n(s,[a],r)}),window.requestAnimationFrame(function e(i){let r=new t(Math.cos(i/1e3)/4,Math.sin(i/1e3)/4,-1);n(s,[a],r),window.requestAnimationFrame(e)})}();//# sourceMappingURL=index.d8bc1c93.js.map

//# sourceMappingURL=index.d8bc1c93.js.map