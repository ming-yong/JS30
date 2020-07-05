# 11-video-player

![demo gif](../images/videoPlayer.gif)

[Back to home page](https://ming-yong.github.io/JS30/)

## User stories

- **User story #1:** I can see a video player container.
- **User story #2:** I can see a control panel.
- **User story #3:** In the control panel, I can see the current progress of the video.
- **User story #4:** In the control panel, I can see the duration of the video.
- **User story #5:** In the control panel, I can play or pause the video.
- **User story #6:** In the control panel, I can skip the video backward or forward.
- **User story #7:** In the control panel, I can adjust the volume.
- **User story #8:** In the control panel, I can adjust the speed.

## Notes

### Adjust volume and speed

From the font adjuster project, we learned how to adjust CSS property's value with range slider. We first give every slider an HTML attribute of `name`.

```html
<div class="control">
 <p class="p_description">Volume:</p>
 <input type="range" name="volume" min="0" max="1" step="0.05" value="1" class="slider" />
</div>
```

In JavaScript, we listen for an `input` event on every slider.

```js
sliders.forEach(slider => slider.addEventListener("input", handleRangeUpdate));
```

Then, we update the value in JavaScript. In this case, `video[this.name] = this.value;` will be `video[volume]=1`, which means setting the volume to 1.

```js
function handleRangeUpdate() {
 video[this.name] = this.value;
}
```

### Play and pause the video

In the tutorial, we found out that playing video is the same as playing audio in the drum kit project. All we need to do is to play the video if it is paused and... pause it if it is played.

```js
function togglePlay() {
 if (video.paused) {
  video.play();
  btn_play.textContent = "🔴";
 } else {
  video.pause();
  btn_play.textContent = "🟢";
 }
}
```

### Skip the video

Also from the drum kit project, we learned that we can create an `data-*` attribute in HTML:

```html
<div class="btn div_back5s" data-skip="-5">-5s</div>
```

And use it in JavaScript:

```js
function skip() {
 video.currentTime += parseFloat(this.dataset.skip);
}

btn_skip.forEach(btn => btn.addEventListener("click", skip));
```

Unlike in the drum kit project, we access the `data-skip` using `this.dataset.skip` instead.

### Display the progress and duration

In this build, we will show the current progress and the duration.

```js
video.addEventListener("timeupdate", () => (progress.textContent = ((video.currentTime / video.duration) * 100).toFixed(1) + "%"));

video.onloadedmetadata = () => {
 duration.textContent = video.duration + "s";
};
```
