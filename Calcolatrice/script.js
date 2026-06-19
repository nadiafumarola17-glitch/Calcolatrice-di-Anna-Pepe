// Selezione degli elementi HTML
const buttons = document.querySelectorAll(".btn"); // seleziona tutti i bottoni con classe .btn
const display = document.getElementById("display"); // seleziona il display della calcolatrice

const operators = "+-*/"; // stringa con tutti gli operatori validi

// Funzione che calcola il risultato di un'espressione
function calcola(expr) {
  try {
    const result = Function('"use strict"; return (' + expr + ')')();
    if (!isFinite(result)) return "Errore"; // blocca divisione per zero (Infinity) e NaN
    return parseFloat(result.toFixed(10)); // arrotonda per evitare decimali infiniti tipo 0.3333333333
  } catch {
    return "Errore"; // se l'espressione non è valida restituisce "Errore"
  }
}

// Funzione che gestisce l'input proveniente dai bottoni o dalla tastiera
function handleInput(value) {
  if (!value) return; // se il valore è null o undefined, esce dalla funzione

  // Se premi "=" o "Enter", calcola il risultato
  if (value === "=" || value === "Enter") {
    display.value = calcola(display.value || "0");
  }

  // Se premi "C" o "Escape", cancella tutto
  else if (value === "C" || value === "Escape") {
    display.value = "";
  }

  // Se premi "Backspace", cancella l'ultimo carattere
  else if (value === "Backspace") {
    display.value = display.value.slice(0, -1);
  }

  // Per tutti gli altri casi, aggiunge il valore al display
  else {
    // non fa nulla se il display è vuoto e si preme un operatore
    if (operators.includes(value) && display.value === "") return;

    // non fa nulla se l'ultimo carattere è già un operatore e se ne preme un altro
    if (operators.includes(value) && operators.includes(display.value.slice(-1))) return;

    // non fa nulla se si superano i 15 caratteri
    if (display.value.length >= 15) return;

    display.value += value;
  }
}

// Aggiunta degli event listener ai bottoni
buttons.forEach(button => {
  button.addEventListener("click", () => {
    const value = button.dataset.value; // recupera il valore dal dataset del bottone
    handleInput(value); // chiama handleInput con il valore del bottone
    button.blur(); // toglie il focus dal bottone dopo il click, evita conflitti con la tastiera
  });
});

// Blocca la scrittura diretta nell'input da tastiera
// senza questo, il browser scrive nel campo E handleInput scrive ancora → valori doppi
display.addEventListener("keydown", (event) => {
  event.preventDefault();
});

// Event listener per la tastiera sul documento
document.addEventListener("keydown", (event) => {
  const allowed = "0123456789+-*/.";

  // gestisce solo i tasti validi, tutto il resto (Shift, Alt, ecc.) viene ignorato
  if (
    allowed.includes(event.key) ||
    event.key === "Enter" ||
    event.key === "Backspace" ||
    event.key === "Escape"
  ) {
    handleInput(event.key);
  }
});