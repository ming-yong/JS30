# 05-panels image gallery

![demo gif](../images/panelsImageGallery.gif)

[Back to home page](https://ming-yong.github.io/JS30/)

## User stories

- **User story #1:** I can see images with short description.
- **User story #2:** I can click on any image.
- **User story #3:** Image will zoom in or out when clicked.
- **User story #4:** Description will ease out or in after image zoomed.

## Notes

### Zoom the panels

This tutorial is more about CSS. For JavaScript, all we need is to toggle the zooming effect on the panels and the animation on the description right after.

```js
const panels = document.querySelectorAll(".div_panel");

//this will zoom the panels
function toggleOpen() {
 this.classList.toggle("open");
}

//this will animate the description
function toggleActive() {
 this.classList.toggle("open-active");
}

panels.forEach(panel => panel.addEventListener("click", toggleOpen));
panels.forEach(panel => panel.addEventListener("transitionend", toggleActive));
```

In CSS, each panel was given a `flex:1` so they are equally spread in the container.

```css
.div_panel > * {
 font-size: 1rem;
 color: white;
 background: rgba(0, 0, 0, 0.26);
 flex: 1 0 auto; /* grow shrink basis */
 width: 100%;
 display: flex;
 justify-content: center;
 align-items: center;
 font-size: 1rem;
 transition: transform 0.5s;
}
```

We will change the value of `flex` for the zooming effect.

```css
.div_panel.open {
 flex: 4;
}
```

### Animate the description

The description is stored inside different `p` in HTML.

```html
<div class="div_panel panel_1">
 <p>Spring</p>
 <p>Photo by Meriç Dağlı on Unsplash</p>
</div>
```

In CSS, we will push them in different direction to "open" it.

```css
.div_panel.open-active > *:first-child {
 transform: translateY(-100%);
}

.div_panel.open-active > *:last-child {
 transform: translateY(100%);
}
```

