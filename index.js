const inputValue = document.getElementById("inputValue");
const selectCurrency = document.getElementById("selectCurrency");
const result = document.getElementById("result");
const converterForm = document.getElementById("converterForm");
const loader = document.getElementById("loader");
const errors = document.getElementById("errors");

const getCurrencyValue = async () => {
  try {
    loader.classList.remove("hidden");
    errors.classList.add("hidden");
    const res = await fetch(
      `https://api.nbp.pl/api/exchangerates/rates/a/${selectCurrency.value}/`
    );
    const data = await res.json();
    const rates = data?.rates?.[0]?.mid;

    loader.classList.add("hidden");

    if (rates) {
      result.textContent = rates * inputValue.value;
    } else {
      loader.classList.add("hidden");
      errors.classList.remove("hidden");
      errors.textContent = "Wystąpił błąd podczas pobierania danych, spróbuj ponownie później";
    }
  } catch (err) {
    loader.classList.add("hidden");
    errors.classList.remove("hidden");
    console.error("Error: " + err);
    errors.textContent = "Wystąpił błąd podczas przetwarzania danych, spróbuj ponownie później";
  }
};

converterForm.addEventListener("submit", (event) => {
  event.preventDefault();
  getCurrencyValue();
});
