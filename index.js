const inputValue = document.getElementById("inputValue");
const selectCurrency = document.getElementById("selectCurrency");
const pResult = document.getElementById("pResult");
const converterForm = document.getElementById("converterForm");

const getCurrencyValue = async () => {
  try {
    pResult.textContent = "Loading data, please wait";
    const res = await fetch(
      `https://api.nbp.pl/api/exchangerates/rates/a/${selectCurrency.value}/`
    );
    const data = await res.json();
    const rates = data?.rates[0]?.mid;

    if (rates) {
      pResult.textContent = rates * inputValue.value;
    } else {
      pResult.textContent = "Cannot find specified data";
    }
  } catch (err) {
    console.error("Error: " + err);
    pResult.textContent = "Error occured, please try again later";
  }
};

converterForm.addEventListener("submit", (event) => {
  event.preventDefault();
  getCurrencyValue();
});
