# 01-drum kit

![demo gif](../images/drumKit.gif)

[Back to home page](https://ming-yong.github.io/JS30/)

## User stories

- **User story #1:** I can play drum kit pieces using keyboard.
- **User story #2:** Drum kit pieces will only be played by using the corresponding key.
- **User story #3:** I can see an animation on the drum kit pieces when it is being play.

## Notes

### Connect the audio and drum kit pieces

In HTML, we gave each drum kit pieces and audio an attribute `data-key`.

```html
<div class="div_key" data-key="q">
 <kbd>q</kbd>
 CLAP
</div>
<audio src="sounds/clap.wav" data-key="q"></audio>
```

According to W3Schools, we can embed custom data attributes on all the HTML elements using the `data-*` attribute.

### Play the audio

Whenever user presses a key, we look for the matching audio using the `data-key`. A CSS class `playing` is added to the drum kit pieces that is played.

```js
function playSound(e) {
 // select the audio tag with corresponding keyCode
 const audio = document.querySelector(`audio[data-key="${e.key.toLowerCase()}"]`);
 const key = document.querySelector(`.div_key[data-key="${e.key.toLowerCase()}"]`);
 if (!audio) return; //stop the function from running all together
 audio.currentTime = 0; // rewind to start, so you can keep playing the same key
 audio.play(); //play audio
 key.classList.add("playing");
}

window.addEventListener("keydown", playSound);
```

CSS class `playing` added a border and shrunk the element so that it looks like being pressed.

```css
.playing {
 border: 5px solid black;
 transform: scale(0.9, 0.9);
}
```

### Remove animation from the drum kit pieces

The animation we added will stay there forever if we didn't remove it.

```js
function removeTransition(e) {
 if (e.propertyName !== "transform") return; //skip if it is not a transform
 this.classList.remove("playing");
}

const keys = document.querySelectorAll(".div_key");
keys.forEach(key => key.addEventListener("transitionend", removeTransition));
```

If we were to use a timeout for removing the animation, we will have to go into both JavaScript and CSS every time we want to change it.
