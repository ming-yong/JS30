# 16-boo

![demo gif](../images/boo.gif)

[Back to home page](https://ming-yong.github.io/JS30/)

## User stories

- **User story #1:** I can see shadow effect when mouse move.

## Notes

### Mouse move effect

Whenever the mouse move, make four shadows depends on where the cursor locates.

```js
const body = document.querySelector("body");
const ghost = document.querySelector(".div_ghost");
const fly = 200; //200px

function boo(e) {
 //bodyWidth = body.offsetWidth
 //offsetWidth is the layout width
 //here it will be body's width
 const { offsetWidth: bodyWidth, offsetHeight: bodyHeight } = body;
 //offsetX is the distance between cursor and the edge,
 //in other words, where the cursor locates
 let { offsetX: cursorX, offsetY: cursorY } = e;

 //normalization when detecting nested children instead of body
 //from: where the cursor locates in body
 //to: where the cursor locates in ghost
 if (this !== e.target) {
  //"this" is body, target might be body or ghost
  //where the cursor locates in ghost + where ghost locates in body
  cursorX = cursorX + e.target.offsetLeft;
  cursorY = cursorY + e.target.offsetTop;
 }

 //how far should the shadow goes
 //fly=200, so the range will be [-100,100]
 const xFly = Math.round((cursorX / bodyWidth) * fly - fly / 2);
 const yFly = Math.round((cursorY / bodyHeight) * fly - fly / 2);

 ghost.style.textShadow = `
 ${xFly}px ${yFly}px 0 rgba(255,255,255,0.5),
 ${xFly * -1}px ${yFly * -1}px 0 rgba(255,255,0,0.5),
 ${yFly}px ${xFly}px 0 rgba(255,0,0,0.5),
 ${yFly * -1}px ${xFly * -1}px 0 rgba(0,0,255,0.5)
 `;
}

body.addEventListener("mousemove", boo);
```
