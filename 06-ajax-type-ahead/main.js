const endpoint = "https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json";

const cities = [];

fetch(endpoint)
	.then(blob => blob.json())
	.then(data => cities.push(...data));

function findMatches(wordToMatch, cities) {
	return cities.filter(place => {
		//if the city or state matches what was searched
		const regex = new RegExp(wordToMatch, "gi");
		return place.city.match(regex) || place.state.match(regex);
	});
}

function numberWithCommas(x) {
	return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function displayMatches() {
	if (this.value.length == 0) {
		ul_result.innerHTML = `<li class="li_result">Filter for a city or state</li>`;
	} else {
		const matchArray = findMatches(this.value, cities);
		if (matchArray.length > 0) {
			const html = matchArray
				.map(place => {
					const regex = new RegExp(this.value, "gi");
					const cityName = place.city.replace(regex, `<span class="span_highlight">${this.value}</span>`);
					const stateName = place.state.replace(regex, `<span class="span_highlight">${this.value}</span>`);
					return `
				<li class="li_result">
					<span class="span_name">${cityName}, ${stateName}</span>
					<span class="span_population">${numberWithCommas(place.population)}</span>
				</li>
			`;
				})
				.join("");
			ul_result.innerHTML = html;
		} else {
			ul_result.innerHTML = `<li class="li_result">Result not found</li>`;
		}
	}
}

const input_search = document.querySelector(".input_search");
const ul_result = document.querySelector(".ul_result");

input_search.addEventListener("input", displayMatches);
