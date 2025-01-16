let dropdowns = document.querySelectorAll(".country");
let BASE_URL = `https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies`;
const fromCurr = document.querySelector("#from");
const toCurr = document.querySelector("#to");

for (let option of dropdowns) {
  for (let currcode in countryList) {
    let newOption = document.createElement("option");
    newOption.innerText = currcode;
    newOption.value = currcode;
    if (option.name === "from" && currcode === "USD") {
      newOption.selected = "selected";
    } else if (option.name === "to" && currcode === "INR") {
      newOption.selected = "selected";
    }
    option.append(newOption);
  }
  option.addEventListener("change", (event) => {
    updateflag(event.target);
  });
}

const updateflag = (element) => {
  let currcode = element.value;
  let countryCode = countryList[currcode];
  let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
  let img = element.parentElement.querySelector("img");
  img.src = newSrc;
};
const exButton = document.querySelector(".ex-btn");

exButton.addEventListener("click", async (e) => {
  e.preventDefault();
  const amount = document.querySelector(".amount");
  let amountVal = amount.value;

  if (amountVal === "" || amountVal < 1) {
    amount.value = "1";
    amountVal = 1;
  }
  const URL = `${BASE_URL}/${fromCurr.value.toLowerCase()}.min.json`;

  const response = await fetch(URL);
  let data = await response.json();
  let fromCurrency = fromCurr.value.toLowerCase();
  let toCurrency = toCurr.value.toLowerCase();
  let rate = data[fromCurrency]?.[toCurrency];
  let Total = amountVal * rate;
  let display = document.querySelector(".finalAmount");

  display.innerText = `${amountVal} ${fromCurrency.toUpperCase()} =${Total} ${toCurrency.toUpperCase()}`;
});
