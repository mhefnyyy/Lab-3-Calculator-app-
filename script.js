// ========== 1. DOM: select the elements ==========
const display = document.getElementById("display");
const buttons = document.querySelectorAll("button");

// ========== Variables ==========
let firstNumber = "";        // number before the operator
let operator = "";           // + − × ÷
let startNewNumber = false;  // true right after pressing an operator


// ========== 2. Events: listen for clicks ==========
buttons.forEach(function (button) {
  button.addEventListener("click", function () {
    const value = button.textContent;

    if (value >= "0" && value <= "9") {
      pressNumber(value);
    } else if (value === ".") {
      pressDot();
    } else if (value === "+" || value === "−" || value === "×" || value === "÷") {
      pressOperator(value);
    } else if (value === "=") {
      calculate();
    } else if (value === "C") {
      clearAll();
    } else if (value === "⌫") {
      deleteLast();
    } else if (value === "%") {
      percent();
    }
  });
});


// ========== 3. Logic: the functions ==========
function pressNumber(number) {
  if (display.textContent === "0" || display.textContent === "Error" || startNewNumber) {
    display.textContent = number;
    startNewNumber = false;
  } else {
    display.textContent += number;
  }
}

function pressDot() {
  if (startNewNumber) {
    display.textContent = "0.";
    startNewNumber = false;
  } else if (!display.textContent.includes(".")) {
    display.textContent += ".";
  }
}

function pressOperator(op) {
  firstNumber = display.textContent;
  operator = op;
  startNewNumber = true;
}

function calculate() {
  if (operator === "") return; // nothing to calculate yet

  const a = Number(firstNumber);
  const b = Number(display.textContent);
  let result = 0;

  if (operator === "+") result = a + b;
  if (operator === "−") result = a - b;
  if (operator === "×") result = a * b;
  if (operator === "÷") {
    if (b === 0) {
      display.textContent = "Error";
      return;
    }
    result = a / b;
  }

  // round to avoid answers like 0.30000000000000004
  result = Math.round(result * 100000000) / 100000000;

  display.textContent = result;
  operator = "";
  startNewNumber = true;
}

function clearAll() {
  display.textContent = "0";
  firstNumber = "";
  operator = "";
}

function deleteLast() {
  if (display.textContent.length === 1) {
    display.textContent = "0";
  } else {
    display.textContent = display.textContent.slice(0, -1);
  }
}

function percent() {
  display.textContent = Number(display.textContent) / 100;
}
