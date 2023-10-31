class t{constructor(t,e){this.x=t,this.y=e,Object.freeze(this)}sub(e){return new t(this.x-e.x,this.y-e.y)}swap(){return new t(this.y,this.x)}}class e{constructor(t,e,s,i){this.r=t,this.g=e,this.b=s,this.a=i,Object.freeze(this)}}class s{constructor(t){this.canvas=t,this.ctx=t.getContext("2d"),this.useContextAPI=!1}clear(){this.ctx.clearRect(0,0,this.canvas.width,this.canvas.height)}colorize(t){return t?`rgba(${t.r}, ${t.g}, ${t.b}, ${t.a})`:"rgba(0, 0, 0, 0)"}drawPixel(t,e){e&&(this.ctx.fillStyle=`rgba(${e.r}, ${e.g}, ${e.b}, ${e.a})`),this.ctx.fillRect(t.x,t.y,1,1)}/**
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
e>=r[1].y&&(s=r[2],i=r[1],n=r[0]);let c=e-s.y,l=c/(i.y-s.y),o=s.x-(s.x-i.x)*l,h=c/(n.y-s.y),x=s.x-(s.x-n.x)*h;this.drawLine(new t(o,e),new t(x,e),a)}}}class i{constructor(t,e,s){this.x=t,this.y=e,this.z=s}static fromArray(t){return new i(t[0],t[1],t[2])}}async function a(t){let e=await fetch(new URL(t)),s=await e.text(),a=new r([],[],[],[]);for(let t of s.split("\n")){let e=t.split(" ");if(!["v","vt","vn","f"].includes(e[0]))continue;let s=e[0];if("f"===s){let t=e[1].split("/").map(parseFloat),s=e[2].split("/").map(parseFloat),i=e[3].split("/").map(parseFloat);a.faces.push([t,s,i]);continue}let r=parseFloat(e[1]),n=parseFloat(e[2]),c=parseFloat(e[3]);"v"===s?a.vertices.push(new i(r,n,c)):"vt"===s?a.textures.push(new i(r,n,c)):"vn"===s&&a.normals.push(new i(r,n,c))}return a}class r{constructor(t,e,s,i){this.vertices=t,this.textures=e,this.normals=s,this.faces=i}getVerticesForFace(t){// The reference doc says we are only interested in the first number for
// each subarray entry in a face, and that it is one-indexed so we need to
// subtract one.
// https://github.com/ssloy/tinyrenderer/wiki/Lesson-1:-Bresenham%E2%80%99s-Line-Drawing-Algorithm#wireframe-rendering
return t.map(t=>this.vertices[t[0]-1])}}async function n(){let i=document.getElementById("canvas");if(!i.getContext)throw Error("Canvas not supported");let r=new s(i);r.useContextAPI=!0,r.clear();let n=await a(`${window.location.href}african_head.obj`),c=performance.now();for(let s=0;s<n.faces.length;s++){let a=n.getVerticesForFace(n.faces[s]);for(let s=0;s<3;s++){let n=a[s],c=a[(s+1)%3];try{let s=(n.x+1)*r.canvas.width/2,a=(n.y+1)*r.canvas.height/2,l=(c.x+1)*r.canvas.width/2,o=(c.y+1)*r.canvas.height/2;r.drawLine(new t(s,i.height-a),new t(l,i.height-o),new e(0,0,0,255))}catch(t){console.log(n,c),console.error(t)}}}let l=performance.now();console.log(`Took ${l-c}ms`)}// Add hook to the render button.
const c=document.getElementById("render");c.addEventListener("click",n),// But.. let's render at start anyways.
n();//# sourceMappingURL=index.e78a5d40.js.map

//# sourceMappingURL=index.e78a5d40.js.map
