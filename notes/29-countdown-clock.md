# 29-countdown-clock

![demo gif](../images/countdownClock.gif)

[Back to home page](https://ming-yong.github.io/JS30/)

## User stories

- **User story #1:** I can set desired countdown time by clicking the buttons or entering it in the textbox.
- **User story #2:** I can see the countdown time in the tab and also on the page.
- **User story #3:** I can see when I should be back.

## Notes

### Buttons and form

When user clicks a button in HTML `<button data-time="20" class="timer__button">20 Secs</button>`, pass the data value into a `timer()` function.

```js
//buttons
function startTimer() {
 //<button data-time="20" class="timer__button">20 Secs</button>
 const seconds = parseInt(this.dataset.time); //every button has a time data
 timer(seconds);
}

buttons.forEach(button => button.addEventListener("click", startTimer));
```

When user submitted a form in HTML:

```html
<form name="customForm" id="custom">
 <input type="text" name="minutes" placeholder="Enter Minutes" />
</form>
```

pass the value into the `timer()` function and clear the textbox.

```js
//textbox
document.customForm.addEventListener("submit", function(e) {
 e.preventDefault(); //avoid reloading the page
 //<input type="text" name="minutes" placeholder="Enter Minutes" />
 const mins = this.minutes.value; //get the minutes value
 timer(mins * 60); //convert into seconds and pass into timer function
 this.reset(); // clear the textbox
});
```

### Timer function

We put the timer function into a `countdown` variable so that we can clear it when we want to start a new timer.

```js
let countdown;
function timer(seconds) {
 clearInterval(countdown); //clear any existing timer

 const now = Date.now(); //the current time
 const then = now + seconds * 1000; // the current time (now, in ms) + the time we want our timer to be

 displayTimeLeft(seconds); //run it first to skip the extra second
 displayEndTime(then); //display the time user should be back

 countdown = setInterval(() => {
  const secondsLeft = Math.round((then - Date.now()) / 1000); //the time that timer left
  //check if we should stop it
  if (secondsLeft < 0) {
   clearInterval(countdown);
   return;
  }
  displayTimeLeft(secondsLeft); //display the time left
 }, 1000); //call this every 1 second
}
```

### Show the time on screen

In function `timer()`, there are two functions `displayTimeLeft` and `displayEndTime` for displaying the remaining time and the time to be back on screen. Function `displayTimeLeft` was called in function `timer()` to skip the lag of first second.

```js
const timerDisplay = document.querySelector(".display__time-left");
const endTime = document.querySelector(".display__end-time");
const buttons = document.querySelectorAll("[data-time]");

function displayTimeLeft(seconds) {
 const minutes = Math.floor(seconds / 60); //get the minutes
 const remainderSeconds = seconds % 60; //get the seconds
 const display = `${minutes}:${remainderSeconds < 10 ? "0" : ""}${remainderSeconds}`; //padded 0
 document.title = display; //display in the tab
 timerDisplay.textContent = display; //display on the page
}

function displayEndTime(timestamp) {
 const end = new Date(timestamp); //get the time we should be back
 const hour = end.getHours(); //get the hour
 const minutes = end.getMinutes(); //get the minutes
 endTime.textContent = `Be back at ${hour < 10 ? "0" : ""}${hour}: ${minutes < 10 ? "0" : ""}${minutes}`; //padded 0
}
```
