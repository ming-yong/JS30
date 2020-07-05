# 28-speed-controller

![demo gif](../images/speedController.gif)

[Back to home page](https://ming-yong.github.io/JS30/)

## User stories

- **User story #1:** I can change the video speed as I hover over the controller bar.

## Notes

### Move the controller with mouse

Whenever user hovers over the controller, calculate the percentage of where the cursor locates.

```js
const speed = document.querySelector(".div_speed");
const bar = document.querySelector(".div_speed-bar");
const video = document.querySelector(".flex");

function handleMove(e) {
 //Controller UI
 const y = e.pageY - this.offsetTop; //this.offsetTop is the distance between the top of the page to the top of the controller
 const percent = y / this.offsetHeight; //where the cursor locates in the controller in percentage
 const min = 0.4;
 const max = 4;
 const height = Math.round(percent * 100) + "%"; //the height of filler in the controller
 const playbackRate = percent * (max - min) + min; //0% will be 0.4 and 100% will be 4
 bar.style.height = height; //update the height
 bar.textContent = playbackRate.toFixed(2) + "x"; //update the text
}

speed.addEventListener("mousemove", handleMove);
```

### Adjust the video speed

Set the video speed to the speed result we have.

```js
function handleMove(e) {
 //Setting speed
 video.playbackRate = playbackRate;
}
```

