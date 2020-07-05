# JS30-15-taco-list

![demo gif](../images/tacoList.gif)

[Back to home page](https://ming-yong.github.io/JS30/)

## User stories

- **User story #1:** I can add items to the list.
- **User story #2:** I can delete items form the list.
- **User story #3:** I can check and uncheck items on the list.
- **User story #4:** Everything will not disappear after the page refresh.

## Notes

### Add item to the list

In HTML, we started out with a `ul` and a `form`.

```html
<ul class="ul_list"></ul>
<form class="form_addFilling">
 <input type="text" name="item" placeholder="Enter your favorite filling" required />
 <input type="submit" value="+ Add filling" />
</form>
```

We will populate the list every time we add, check, un-check, delete items, and we need a function for that.

```js
const ulList = document.querySelector(".ul_list");
let jsList = JSON.parse(localStorage.getItem("items")) || []; //an empty array or what we have in local storage

function populateList(jsList = [], ulList) {
 //creating a "li" for each item in "jsList"
 ulList.innerHTML = jsList
  .map((item, index) => {
   //"item.done" will be set in function "toggleDone"
   return `
   <li>
    <input type="checkbox" data-index=${index} id="item${index}" ${item.done ? "checked" : ""}/>
    <label for="item${index}">${item.input}</label>
    <button class="btn_delete" type="button" data-index=${index}>❌</button>
   </li>
  `;
  })
  .join("");
}
```

To add item to the list, what we will do is to add a `li` to the `ul` whenever we click the submit button.

```js
const form = document.querySelector(".form_addFilling");

function addItem(e) {
 e.preventDefault(); //stop the page from refreshing every time we add an item
 const input = this.querySelector("[name=item]").value; //"this" is the form
 const item = {
  //creating an object "item"
  input, //input:input
  done: false,
  delete: false
 };
 jsList.push(item); //push the new item to the array "jsList"
 populateList(jsList, ulList); //creating the list with new item added
 localStorage.setItem("items", JSON.stringify(jsList)); //update the local storage
 this.reset(); //clear the input bar
}

form.addEventListener("submit", addItem);
```

### Check the item

We need to update the local storage so that every time we refresh the page, the check will still be there. We need event delegation here because list items(`li`) will be added after we run the script, therefore we won't be able to manipulate it using querySelector and eventListener as we used to do in the previous tutorials.

```js
//event delegation:adding the event listener to one parent instead of specific nodes
function toggleDone(e) {
 if (!e.target.matches("input")) return; //skip this unless it is an input
 const element = e.target; //get the input element
 const index = element.dataset.index; //get the index of the element
 jsList[index].done = !jsList[index].done; //set the "done" of the corresponding item in the array to its opposite
 localStorage.setItem("items", JSON.stringify(jsList)); //update the local storage
 populateList(jsList, ulList); //generate the list
}

ulList.addEventListener("click", toggleDone);
```

### Delete the item

Deleting the item works the same as checking them. List items will be added after, so event delegation is needed.

```js
function deleteItem(e) {
 if (!e.target.matches("button")) return; //skip this unless it is a button
 const element = e.target;
 const index = element.dataset.index;
 jsList[index].delete = !jsList[index].delete;
 jsList = jsList.filter(item => !item.delete); //filter out item with delete:true
 localStorage.setItem("items", JSON.stringify(jsList));
 populateList(jsList, ulList);
}

ulList.addEventListener("click", deleteItem);
```

Last but no least, we will generate the list when we first run the script.

```js
populateList(jsList, ulList);
```
