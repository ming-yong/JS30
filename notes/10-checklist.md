# 10-checklist

![demo gif](../images/checklist.gif)

[Back to home page](https://ming-yong.github.io/JS30/)

## User stories

- **User story #1:** I can cross out items by checking the check box.
- **User story #2:** I can checked consecutive items by: checked desire item to start, hold shift, checked desire item to end checking.
- **User story #3:** I can reverse the checked status by clicking the "Reverse" button.
- **User story #4:** I can clear all the check by clicking the "Clear" button.

## Notes

### Check multiple checkboxes with Shift key

We want to check every checkboxes in between only if the Shift key is pressed. How we do that is by keeping track of the previous checkbox(the one we just checked) and using a Boolean value as a flag.

```js
let lastChecked;

function handleCheck(e) {
 let inBetween = false;
 //if Shift key is held and user is checking the current checkbox
 if (e.shiftKey && this.checked) {
  checkboxes.forEach(checkbox => {
   //loop through every checkbox
   //if it is the current or the previous checkbox
   if (checkbox === this || checkbox === lastChecked) {
    //set the inBetween to true
    inBetween = !inBetween;
   }
   if (inBetween) {
    //check the box if inBetween is true
    checkbox.checked = true;
   }
  });
 }
 lastChecked = this; //the current checkbox will now be the previous checkbox
}
```

A simple sketch helps visualizing the process:

![sketch for visualizing the code ](../images/checkbox.png)

### Clear and reverse checkboxes

Since we know that `checkbox.checked` means the checking status of checkboxes, we can now reverse it or set it to `false` to clear all the check.

```js
const checkboxes = document.querySelectorAll(".checkbox");
const btnReverse = document.querySelector(".btn_reverse");
const btnClear = document.querySelector(".btn_clear");

checkboxes.forEach(checkbox => checkbox.addEventListener("click", handleCheck));
btnReverse.addEventListener("click", () => {
 checkboxes.forEach(checkbox => (checkbox.checked = !checkbox.checked));
});
btnClear.addEventListener("click", () => {
 checkboxes.forEach(checkbox => (checkbox.checked = false));
});
```
