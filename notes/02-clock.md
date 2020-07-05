# 02-clock

![demo gif](../images/clock.gif)

[Back to home page](https://ming-yong.github.io/JS30/)

## User stories

- **User story #1:** I can see hours, minutes and seconds in number under corresponding hand.
- **User story #2:** I have a circle on the center of clock face showing moon or sun according to the current time.

## Notes

### Code a clock in CSS

In CSS, we want to rotate each hand for 90 degrees to position it at 12 o'clock.

```css
.div_hand {
 height: 2%;
 background: black;
 border: 2px solid black;
 color: black;
 font-size: 2rem;
 position: absolute;
 top: 50%;
 transform: rotate(90deg);
 transform-origin: 100%;
 transition: all 0.5s;
 transition-timing-function: cubic-bezier(0, 1.21, 0, 1.14);
}
```

### Move the hand

We will remove the transition when the value is 0 so that the hand keep moving forward instead of traveling a circle back to 1.

```js
const secondHand = document.querySelector(".div_secondHand");
const minuteHand = document.querySelector(".div_minuteHand");
const hourHand = document.querySelector(".div_hourHand");

function setDate() {
 //get the date
 const now = new Date();
 //get the second
 const second = now.getSeconds();
 //remove transition if it's 0
 if (second == 0) {
  secondHand.style.transition = "none";
 }
 //calculate the degree, adding 90 degree here so it start from 12 o'clock
 const secondDegree = (second / 60) * 360 + 90;
 //display the number under the hand
 secondHand.textContent = `${second}`;
 //rotate the hand
 secondHand.style.transform = `rotate(${secondDegree}deg)`;

 const minute = now.getMinutes();
 const minuteDegree = (minute / 60) * 360 + 90;
 if (minute == 0) {
  minuteHand.style.transition = "none";
 }
 minuteHand.textContent = `${minute}`;
 minuteHand.style.transform = `rotate(${minuteDegree}deg)`;

 const hour = now.getHours();
 const hourDegree = (hour / 12) * 360 + 90;
 if (hour == 0) {
  hourHand.style.transition = "none";
 }
 hourHand.textContent = `${hour}`;
 hourHand.style.transform = `rotate(${hourDegree}deg)`;
}

//call this function every seconds
setInterval(setDate, 1000);
```

### Very cool circle in the center

From 0700 to 1900, we will display a sun and from 1900-0700 it will be a moon. We added an if/else statement in the `setDate` function for that.

```js
const dayNight = document.querySelector(".div_dayNight");

function displaySun() {
 dayNight.textContent = "☀️";
 dayNight.style.background = "#00ced1";
}

function displayMoon() {
 dayNight.textContent = "🌙";
 dayNight.style.background = "#008B8B";
}

function setDate() {
 const now = new Date();
 const second = now.getSeconds();
 if (second == 0) {
  secondHand.style.transition = "none";
 }
 const secondDegree = (second / 60) * 360 + 90;
 secondHand.textContent = `${second}`;
 secondHand.style.transform = `rotate(${secondDegree}deg)`;

 const minute = now.getMinutes();
 const minuteDegree = (minute / 60) * 360 + 90;
 if (minute == 0) {
  minuteHand.style.transition = "none";
 }
 minuteHand.textContent = `${minute}`;
 minuteHand.style.transform = `rotate(${minuteDegree}deg)`;

 const hour = now.getHours();
 const hourDegree = (hour / 12) * 360 + 90;
 if (hour == 0) {
  hourHand.style.transition = "none";
 }
 hourHand.textContent = `${hour}`;
 hourHand.style.transform = `rotate(${hourDegree}deg)`;

 //calling different function depends on the hour
 if (hour < 19 && hour > 7) {
  displaySun();
 } else {
  displayMoon();
 }
}
```


