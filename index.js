// get all our buttons
const numButtons = document.querySelectorAll('[data-number]');
const operatorButtons = document.querySelectorAll('[data-operator]');
const equalButton = document.querySelector('[data-equal]');
const clearButton = document.querySelector('[data-clear]');
const deleteButton = document.querySelector('[data-delete]');
const firstOperand = document.querySelector('[data-first-operand]');
const currentOperand = document.querySelector('[data-current-operand]');

// constructor function for calculator
class Calculator {
  constructor(firstOperand, currentOperand) {
    this.firstOperand = firstOperand;
    this.currentOperand = currentOperand;
    this.clear();
  }  
  // declaring class function

  clear() {
    this.currentOperand = '';
    this.firstOperand = '';
    this.operator = undefined;
  }

  del() {
    this.currentOperand = this.currentOperand.toString().slice(0, -1);
  }

  selectOperator(operator) {
    if (this.currentOperand === '') return;
    if (this.firstOperand !== '') {
      this.operate();
    }
    this.operator = operator;
    this.firstOperand = this.currentOperand;
    this.currentOperand = '';
  }

  insertValue(value) {
    // checking for '.' once in the output
    if (value === '.' && this.currentOperand.includes('.')) return;
    // concat number together in form of string
    this.currentOperand = this.currentOperand.toString() + value.toString();
  }

  operate() {
    let result;
    const prev = parseFloat(this.firstOperand);
    const current = parseFloat(this.currentOperand);
    if (isNaN(prev) || isNaN(current)) return;
    if (this.operator === '+') {
      result = prev + current;
    }
    if (this.operator === '-') {
      result = prev - current;
    }
    if (this.operator === '*') {
      result = prev * current;
    }
    if (this.operator === '/') {
      result = prev / current;
    }
    this.currentOperand = result;
    this.firstOperand = '';
    this.operator = undefined;
  }

  getNumberWithComma(number) {
    const stringNumber = number.toString();
    const digits = parseFloat(stringNumber.split('.')[0]);
    const decimal = stringNumber.split('.')[1];
    let numberDisplay;
    if (isNaN(digits)) {
      numberDisplay = '';
    } else {
      numberDisplay = digits.toLocaleString('en');
    }
    if (decimal != null) {
      return `${numberDisplay}.${decimal}`;
    } else {
      return numberDisplay;
    }
  }

  displayValue() {
    currentOperand.innerHTML = this.getNumberWithComma(this.currentOperand);
    if (this.operator != null) {
      firstOperand.innerHTML = `${this.getNumberWithComma(this.firstOperand)} ${this.operator}`;
    } else {
      firstOperand.innerHTML = '';
    }
  }
}

const calculator = new Calculator(firstOperand, currentOperand);
//  adding EventListener
numButtons.forEach((button) => {
  button.addEventListener('click', () => {
    calculator.insertValue(button.innerHTML);
    calculator.displayValue();
  });
});

operatorButtons.forEach((button) => {
  button.addEventListener('click', () => {
    calculator.selectOperator(button.innerHTML);
    calculator.displayValue();
  });
});

equalButton.addEventListener('click', () => {
  calculator.operate();
  calculator.displayValue();
});

clearButton.addEventListener('click', () => {
  calculator.clear();
  calculator.displayValue();
});

deleteButton.addEventListener('click', () => {
  calculator.del();
  calculator.displayValue();
});