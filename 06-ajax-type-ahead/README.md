# JS30-06-ajax-type-ahead

![image: demonstration of ajax type ahead](https://github.com/ming-yong/JS30-06-ajax-type-ahead/blob/master/ajaxTypeAhead.gif)

Type-ahead search for population in cities of US. Built with vanilla JS and based on [JavaScript 30 by WesBos](https://github.com/wesbos/JavaScript30).

## Running this project

### Live version

[https://ming-yong.github.io/JS30-06-ajax-type-ahead/](https://ming-yong.github.io/JS30-06-ajax-type-ahead/)

## User story

- **User story #1:** I can type in the input box.
- **User story #2:** I can search population in cities of US by city o state.
- **User story #3:** I can see the matches show up while typing.
- **User story #4:** I can see a message if no result was found.
- **User story #5:** The interface will go back to default if I clear the input box.

## Notes
### Get the data of places

The goal here is to get an array `cities` that contains every places.

```js
const endpoint = "https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json";

const cities = [];

//fetch create a promise
fetch(endpoint)
 //converting a blob of data into JSON, which will return another promise
 .then(blob => blob.json())
 //push each of the data into array
 .then(data => cities.push(...data));
```

After some videos from [TheCodingTrain](https://www.youtube.com/channel/UCvjgXvBlbQiydffZU7m1_aw), we learned that promises is an object, we use it to handle asynchronous things(avoid the "callback hell"), we use `then` to handle a fulfilled promise and `catch` when error occurs.

### Search function

Now we have the `cities` with all the data we need, we want to compare it with user's input to get the search result.

First, listen for an `input` event on the search bar, select the `ul` for displaying the search result.

```js
const input_search = document.querySelector(".input_search");
const ul_result = document.querySelector(".ul_result");
input_search.addEventListener("input", displayMatches);
```

Then, create a function for returning the result, in other words, filter out non-matches from `cities` array.

```js
//wordToMatch is the user input
function findMatches(wordToMatch, cities) {
 return cities.filter(place => {
  //if the city or state matches what was searched
  const regex = new RegExp(wordToMatch, "gi");
  return place.city.match(regex) || place.state.match(regex);
 });
}
```

### Display the result on screen

What we want to display:

- "Filter for a city or state" message when there is nothing inside the search bar.
- Search result with search word highlighted if matched.
- "Result not found" message if nothing was found.

```js
function displayMatches() {
 //check if the search bar is empty
 if (this.value.length == 0) {
  ul_result.innerHTML = `<li class="li_result">Filter for a city or state</li>`;
 } else {
  //find the matches
  const matchArray = findMatches(this.value, cities);
  //if matched
  if (matchArray.length > 0) {
   //replace the html inside <ul> with list item of result item
   const html = matchArray
    .map(place => {
     //highlight the search word in the result item
     const regex = new RegExp(this.value, "gi");
     const cityName = place.city.replace(regex, `<span class="span_highlight">${this.value}</span>`);
     const stateName = place.state.replace(regex, `<span class="span_highlight">${this.value}</span>`);
     //creating list item for each result item
     return `
    <li class="li_result">
     <span class="span_name">${cityName}, ${stateName}</span>
     <span class="span_population">${numberWithCommas(place.population)}</span>
    </li>
   `;
    })
    .join("");
   //replce the html
   ul_result.innerHTML = html;
  } else {
   //if not found
   ul_result.innerHTML = `<li class="li_result">Result not found</li>`;
  }
 }
}
```

A function for adding commas to the population number:

```js
function numberWithCommas(x) {
 return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
```
