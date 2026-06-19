// Selezione degli elementi HTML
const buttons = document.querySelectorAll(".btn"); // seleziona tutti i bottoni con classe .btn e li mette in una lista
const display = document.getElementById("display"); // seleziona l'elemento HTML con id "display" e lo assegna alla variabile display

// Funzione che calcola il risultato di un'espressione (usa Function invece di eval per sicurezza)
function calcola(expr) {
  try {
    return Function('"use strict"; return (' + expr + ')')();
  } catch {
    return "Errore"; // se l'espressione non è valida, restituisce "Errore"
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

// Aggiunta dell'event listener per la tastiera sul documento
document.addEventListener("keydown", (event) => {
  const allowed = "0123456789+-*/.";
  
  if (
    allowed.includes(event.key) ||
    event.key === "Enter" ||
    event.key === "Backspace" ||
    event.key === "Escape"
  ) {
    handleInput(event.key);
  }
  
});