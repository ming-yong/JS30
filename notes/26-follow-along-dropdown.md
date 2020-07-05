# 26-follow-along-dropdown

![demo gif](../images/followAlongDropdown.gif)

[Back to home page](https://ming-yong.github.io/JS30/)

## User stories

- **User story #1:** I can see a dropdown when I hover over any of the links.
- **User story #2:** The dropdown will disappear when cursor moved out.

## Notes

### Show me the content

The dropdown effect has two parts: the content and the background. For showing the content, we want to animate each list item in `triggers` from `opacity:0` and `display:none` to `display:block` when hover and `opacity:1` after X milliseconds.

In CSS:

```css
.trigger-enter .dropdown {
 display: block;
}

.trigger-enter-active .dropdown {
 opacity: 1;
}
```

In JavaScript:

```js
const triggers = document.querySelectorAll(".ul_nav > li");

function handleEnter() {
 this.classList.add("trigger-enter"); //showing links
 //if using function, this will be window, arrow function inherits parent's this
 //make sure cursor is still at the link
 setTimeout(() => this.classList.contains("trigger-enter") && this.classList.add("trigger-enter-active", 150));
}

function handleLeave() {
 this.classList.remove("trigger-enter", "trigger-enter-active");
}

triggers.forEach(trigger => trigger.addEventListener("mouseenter", handleEnter));
triggers.forEach(trigger => trigger.addEventListener("mouseleave", handleLeave));
```

### Puppy background that follows along

Just like the content, `background` will be animated from `opacity:0` to `opacity:1` by adding a class `open`.

```css
.div_dropdownBackground.open {
 opacity: 1;
}
```

To locate the background in the right position, we need to figure out where the `nav` and the list item are so that when we scroll or added other elements before `nav`, dropdown will still locates at the right position.

```js
const background = document.querySelector(".div_dropdownBackground");
const nav = document.querySelector(".nav_top");

function handleEnter() {
 background.classList.add("open");

 const dropdown = this.querySelector(".dropdown"); //adding background
 const dropdownCoords = dropdown.getBoundingClientRect(); //li position
 const navCoords = nav.getBoundingClientRect(); //nav position

 //locate the background
 const coords = {
  height: dropdownCoords.height,
  width: dropdownCoords.width,
  top: dropdownCoords.top - navCoords.top,
  left: dropdownCoords.left - navCoords.left
 };

 background.style.setProperty("width", `${coords.width}px`);
 background.style.setProperty("height", `${coords.height}px`);
 background.style.setProperty("transform", `translate(${coords.left}px,${coords.top}px)`);
}

function handleLeave() {
 this.classList.remove("trigger-enter", "trigger-enter-active");
 background.classList.remove("open");
}
```

A little new knowledge from this tutorial is [CSS attribute "will-change"](https://css-tricks.com/almanac/properties/w/will-change/).
