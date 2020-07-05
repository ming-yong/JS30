# 08-canvas

![demo gif](../images/canvas.gif)

[Back to home page](https://ming-yong.github.io/JS30/)

## User stories

- **User story #1:** I can draw by click and drag my mouse.
- **User story #2:** My drawing will stop when my mouse move out of the canvas or when I release the mouse.
- **User story #3:** I can switch between brush and eraser using E key(and only E key).
- **User story #4:** I can hold Shift key when drawing to change the brush's colour from different spectral colours.

## Notes

### Create a canvas

The first thing we want to do is to [create a canvas](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API) with some simple instruction.

```js
const canvas = document.querySelector(".canvas");
const ctx = canvas.getContext("2d");
canvas.width = innerWidth;
canvas.height = innerHeight;

//instruction
ctx.font = "1rem Montserrat";
ctx.textAlign = "center";
ctx.fillText("Click and drag your mouse to draw.  Scroll up or down to adjust brush size. Press E to change between brush and eraser. Hold Shift to use magic brush!", canvas.width / 2, canvas.height / 2);
```

### How to draw

From my understanding, drawing a line is actually drawing dots constantly on where the mouse currently locates, plus we want to start from the mouse's position instead of (0,0). That's why the `lastX` and `lastY` is updated to `e.offsetX` and `e.offsetY` while the mouse is `down`. We also want to stop drawing once the mouse is `up` or `out`, therefore a `isDrawing` is created.

```js
//some setting for the brush
ctx.lineJoin = "round";
ctx.lineCap = "round";
ctx.lineWidth = 5;
ctx.strokeStyle = "black";
//some setting for the drawing
let isDrawing = false;
let lastX = 0;
let lastY = 0;

function draw(e) {
 if (!isDrawing) {
  return;
 }

 ctx.beginPath();
 //start from
 ctx.moveTo(lastX, lastY);
 //go to
 ctx.lineTo(e.offsetX, e.offsetY);
 ctx.stroke();
 [lastX, lastY] = [e.offsetX, e.offsetY];
}

canvas.addEventListener("mousedown", e => {
 isDrawing = true;
 [lastX, lastY] = [e.offsetX, e.offsetY];
});
canvas.addEventListener("mousemove", draw);
canvas.addEventListener("mouseup", () => (isDrawing = false));
canvas.addEventListener("mouseout", () => (isDrawing = false));
```

### I want an eraser

User can change between brush and eraser using the E key, we can toggle that using a Boolean value `useBrush`. The first way for erasing that came to my mind is by changing the brush's colour to white.

```js
//some setting for the drawing
let useBrush = true;
let isDrawing = false;
let lastX = 0;
let lastY = 0;

function draw(e) {
 if (!isDrawing) {
  return;
 }

 //So... I am still drawing?
 if (useBrush) {
  ctx.strokeStyle = "black";
 } else {
  ctx.strokeStyle = "white";
 }

 ctx.beginPath();
 //start from
 ctx.moveTo(lastX, lastY);
 //go to
 ctx.lineTo(e.offsetX, e.offsetY);
 ctx.stroke();
 [lastX, lastY] = [e.offsetX, e.offsetY];
}

//User pressed the E key, set useBrush to false
window.addEventListener("keydown", e => {
 if (e.code != "KeyE") {
  return;
 } else {
  useBrush = !useBrush;
 }
});
```

### I want a magic brush

When user hold the Shift key, the brush turns into colorful magic brush. We can do that by changing the `hue` value in a `hsl` color.

```js
//draw
let useBrush = true;
let isDrawing = false;
let lastX = 0;
let lastY = 0;
//we add a hue
let hue = 0;
function draw(e) {
 if (!isDrawing) {
  return;
 }

 if (useBrush) {
  ctx.strokeStyle = "black";
 } else {
  ctx.strokeStyle = "white";
 }

 // hue changes within the range of 0-360
 if (e.shiftKey && useBrush) {
  ctx.strokeStyle = `hsl(${hue},100%,50%)`;
  hue++;
  if (hue >= 360) {
   hue = 0;
  }
 }

 ctx.beginPath();
 //start from
 ctx.moveTo(lastX, lastY);
 //go to
 ctx.lineTo(e.offsetX, e.offsetY);
 ctx.stroke();
 [lastX, lastY] = [e.offsetX, e.offsetY];
}
```

### Resizing the brush by scrolling

The size of the brush increase when user scroll up, decrease if down.

```js
//resize brush
function size(e) {
 if (e.wheelDelta > 0) {
  ctx.lineWidth++;
 } else {
  ctx.lineWidth--;
 }
}

canvas.addEventListener("wheel", size);
```
