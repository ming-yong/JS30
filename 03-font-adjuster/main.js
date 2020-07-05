const span_fontSize = document.querySelector(".span_fontSize");
const span_lineHeight = document.querySelector(".span_lineHeight");
const span_wordSpacing = document.querySelector(".span_wordSpacing");
const span_letterSpacing = document.querySelector(".span_letterSpacing");
const inputs = document.querySelectorAll(".div_valueBox input");

function handleUpdate() {
	document.documentElement.style.setProperty(`--${this.name}`, this.value + "px");
}

function outputValue() {
	switch (this.name) {
		case "font-size":
			span_fontSize.textContent = this.value;
			break;
		case "line-height":
			span_lineHeight.textContent = this.value;
			break;
		case "word-spacing":
			span_wordSpacing.textContent = this.value;
			break;
		case "letter-spacing":
			span_letterSpacing.textContent = this.value;
			break;
	}
}

inputs.forEach(input => input.addEventListener("input", handleUpdate));
inputs.forEach(input => input.addEventListener("input", outputValue));
