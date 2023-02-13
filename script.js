// Creating a Calculator class and adding required methods to the class to compute the numbers and provide output.

class Calculator {
  // Constructor function which takes two arguments to create an instance of the calculator class.
  constructor(previousOperandTextElement, currentOperandTextElement) {
    this.previousOperandTextElement = previousOperandTextElement;
    this.currentOperandTextElement = currentOperandTextElement;
    /* Calling the clear() method to reset the values of the operands and operation whenever 
    a new instance of this object is created so that its ready for use.*/
    this.clear();
  }

  // List of all the methods available to use on the calculator object.

  // clear() method selects the previous operand and current operand and sets its value to an empty string.
  // Also, sets the value of the operation to undefined.
  clear() {
    this.previousOperand = "";
    this.currentOperand = "";
    this.operation = undefined;
  }

  // delete() method removes the currentOperands last character.
  // Converting the currentOperand to a string and removing the last character using slice(0,-1) method.
  // The slice method will return all characters of the string except for the last one.
  delete() {
    this.currentOperand = this.currentOperand.toString().slice(0, -1);
  }

  // appendNumber() method takes a single number as an argument concatenates it with the currenOperand.
  appendNumber(number) {
    /* Check and return if the currentOperand already contains a dot 
    and the number passed in as argument is also the decimal dot "." .*/
    if (number === "." && this.currentOperand.includes(".")) return;
    // Converts the currentOperand value and the argument to a string and concatenates it with that.
    this.currentOperand = this.currentOperand.toString() + number.toString();
  }

  // chooseOperation() method assigns the operation argument to the operation property of the object.
  // Moves the currentOperand string to the previousOperand and assigns currentOperand an empty string.
  chooseOperation(operation) {
    /* Checking if the currentOperand value is only "." because you cannot perform an operation 
    on just a decimal point. It is an invalid input.*/
    if (this.currentOperand === ".") return;
    /*While choosing an operation, if the previousOperand is not an empty string, then apply the 
     compute method on it and compute it.*/
    if (this.previousOperand !== "") {
      this.compute();
    }
    // Assign the operation argument value to the objects operation property.
    this.operation = operation;
    // Set currentOperand value to the previousOperand.
    this.previousOperand = this.currentOperand;
    // Set the currentOperand to an empty string.
    this.currentOperand = "";
  }

  /* compute() method takes the previousOperand and currentOperand, converts them to numbers and performs
  computation on them. once its done, it sets the current operand value as the computation. Assigns previousOperand
  to an empty string. */
  compute() {
    let computation;
    const prev = parseFloat(this.previousOperand);
    const current = parseFloat(this.currentOperand);
    if (isNaN(prev) || isNaN(current)) return;
    switch (this.operation) {
      case "+":
        computation = prev + current;
        break;
      case "-":
        computation = prev - current;
        break;
      case "*":
        computation = prev * current;
        break;
      case "/":
        computation = prev / current;
        break;
      default:
        return;
    }
    this.currentOperand = computation;
    this.operation = undefined;
    this.previousOperand = "";
  }

  // getDisplayNumber() method makes the display values has comma-delimited values.
  getDisplayNumber(number) {
    const stringNumber = number.toString();
    const integerDigits = parseFloat(stringNumber.split(".")[0]);
    const decimalDigits = stringNumber.split(".")[1];
    let integerDisplay;
    if (isNaN(integerDigits)) {
      integerDisplay = "";
    } else {
      integerDisplay = integerDigits.toLocaleString("en", {
        maximumFractionDigits: 0,
      });
    }
    if (decimalDigits != null) {
      return `${integerDisplay}.${decimalDigits}`;
    } else {
      return integerDisplay;
    }
  }

  /* updateDisplay method displays the values of currenOperand and previousOperand to the 
  currentOperandTextElement and previousOperandTextElement. */
  updateDisplay() {
    this.currentOperandTextElement.innerText = this.getDisplayNumber(
      this.currentOperand
    );
    if (this.operation != null) {
      this.previousOperandTextElement.innerText = `${this.getDisplayNumber(
        this.previousOperand
      )} ${this.operation}`;
    } else {
      this.previousOperandTextElement.innerText = "";
    }
  }
}

// Selecting the necessary elements from the DOM.

const numberButtons = document.querySelectorAll("[data-number]");
const operationButtons = document.querySelectorAll("[data-operation]");
const equalsButton = document.querySelector("[data-equals]");
const deleteButton = document.querySelector("[data-delete]");
const allClearButton = document.querySelector("[data-all-clear]");
const previousOperandTextElement = document.querySelector(
  "[data-previous-operand]"
);
const currentOperandTextElement = document.querySelector(
  "[data-current-operand]"
);

// Creating an instance of the Calculator class.
const calculator = new Calculator(
  previousOperandTextElement,
  currentOperandTextElement
);

/* Selects the numberButtons, iterates over all the elements of the
nodeLists and adds an addEventListener to all of them. */
numberButtons.forEach((button) => {
  button.addEventListener("click", () => {
    calculator.appendNumber(button.innerText);
    calculator.updateDisplay();
  });
});

/* Selects the operationButtons, iterates over all the elements of the
nodeLists and adds an addEventListener to all of them. */
operationButtons.forEach((button) => {
  button.addEventListener("click", () => {
    calculator.chooseOperation(button.innerText);
    calculator.updateDisplay();
  });
});

equalsButton.addEventListener("click", (button) => {
  calculator.compute();
  calculator.updateDisplay();
});

allClearButton.addEventListener("click", (button) => {
  calculator.clear();
  calculator.updateDisplay();
});

deleteButton.addEventListener("click", (button) => {
  calculator.delete();
  calculator.updateDisplay();
});
