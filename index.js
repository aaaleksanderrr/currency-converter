const inputValue = document.getElementById("inputValue");
const selectCurrency = document.getElementById("selectCurrency");
const optEUR = document.getElementById("optEUR");
const optUSD = document.getElementById("optUSD");
const optCHF = document.getElementById("optCHF");
const buttonSubmit = document.getElementById("buttonSubmit");
const pResult = document.getElementById("pResult");

const getCurrency = () => selectCurrency.value;
const getAmount = () => inputValue.value;

selectCurrency.addEventListener("change", getCurrency);
inputValue.addEventListener("change", getAmount);

const getCurrencyValue = async () => {
  try {
    pResult.textContent = "Loading data, please wait";

    const res = await fetch(`https://api.nbp.pl/api/exchangerates/rates/a/${getCurrency()}/`);
    const data = await res.json();
    const rates = data?.rates[0]?.mid;

    if (rates) {
      pResult.textContent = rates * getAmount();
    } else {
      pResult.textContent = "Cannot find specified data";
    }
  } catch (err) {
    console.error("Error: " + err);
    pResult.textContent = "Error occured, please try again later";
  }
};

buttonSubmit.addEventListener("click", getCurrencyValue);
