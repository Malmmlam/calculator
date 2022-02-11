function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    if(b === 0) {
        return "NOPE!"
    }
    return a / b;
}

function operate(a, b, operator) {
   let result = operator === '+' ? add(a, b)
             :  operator === '-' ? subtract(a, b)
             :  operator === '*' ? multiply(a, b)
             :  operator === '/' ? divide(a, b)
             : 'error';

    return result;
}

const numberKeys = document.querySelectorAll('.number');
const operators = document.querySelectorAll('.operator');
const equals = document.querySelector('.equals');
const clear = document.querySelector('.clear');
const display = document.querySelectorAll('#display');

numberKeys.forEach(key => key.addEventListener('click', getInputDigit));

operators.forEach(operator => operator.addEventListener('click', onOperator));
equals.addEventListener('click', onEquals);
clear.addEventListener('click', clearVariables);

let a = null;
let b = null;
let result = null;
let inputNumber = [];
let chosenOperator = '';


//functions for converting user input to numbers that can be processed by the operate and mathmatical functions. 
function getInputDigit(e) {
    if(result !== null) {
        clearVariables();
    }

    inputNumber.push(e.currentTarget.textContent);
}

function getInputNumber(variable) {
    if(inputNumber.length === 0) {
        variable = null;
        return variable;
    }

    let numberString = inputNumber.toString();
    numberString = removeCommas(numberString);
    variable = parseInt(numberString);
    inputNumber = [];
    return variable;
}

function removeCommas(string) {
    newString = string.replace(/,/g, '');
    return newString;
}

function assignValueToVariables() {
    if(a === null && inputNumber.length === 0) {
        a = 0;
        return;
    }

    if(a === null) {
        a = getInputNumber(a);
    } else if(b === null) {
        b = getInputNumber(b);
    }
}

//functions for handling non-numberkeys
function onOperator(e) {
    let operator = e.currentTarget.textContent;

    if(result !== null) {
        a = result;
        b = null;
        result = null;
        chosenOperator = operator;
        return;
    }

    if(operator === '-' && inputNumber.length === 0) {
        inputNumber.push(operator);
        return;
    } 

    assignValueToVariables();
    chosenOperator = operator;
}

function onEquals() {
    assignValueToVariables();
    console.log(a, chosenOperator, b);
    result = operate(a, b, chosenOperator);
    console.log(result);
    chosenOperator = '';
    if(result === "NOPE!") {
        clearVariables();
    }
}

function clearVariables() {
    a = null;
    b = null;
    result = null;
    inputNumber = [];
    chosenOperator = '';
    console.log(a, b, result, inputNumber, chosenOperator);
}