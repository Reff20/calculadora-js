let runningTotal = 0;
let buffer = "0";
let previousOperator;

const screen = document.querySelector(".screen");

function buttonClick(value) {
    isNaN(value) ? handleSymbol(value) : handleNumber(value);
    screen.innerText = buffer;
}

function handleSymbol(symbol) {
    let num = parseInt(buffer);

    switch (symbol) {
        case 'C':
            buffer = '0'
            runningTotal = 0
            break;
        case '=':
            if (previousOperator === null) return;
            runningTotal.toString().includes('.') || buffer.includes('.') ? 
            flushOperationFloat(parseFloat(buffer)) : 
            flushOperation(parseInt(buffer));
            previousOperator = null;
            buffer = runningTotal;
            runningTotal = 0;
            break;
        case ',':
            buffer += '.';
            break;
        case '←':
            buffer.length === 1 ? buffer = '0' : buffer = buffer.substring(0, buffer.length - 1);
            break;
        case '±':
            if (num > 0) {
                buffer = num - (num * 2);
            }
            if (num < 0) {
                buffer = num + (-num * 2);
            }
            break;
        case '+':
        case '÷':
        case '×':
        case '−':
            buffer.includes('.') ? handleMathFloat(symbol) : handleMath(symbol);
            break;
    }
}

function handleMathFloat(symbol) {
    if (buffer === '0') return;
    const floatBuffer = parseFloat(buffer);
    runningTotal === 0 ? runningTotal = floatBuffer : flushOperation(floatBuffer);
    previousOperator = symbol;
    buffer = '0';
}

function handleMath(symbol) {
    if (buffer === '0') return;
    const intBuffer = parseInt(buffer);
    runningTotal === 0 ? runningTotal = intBuffer : flushOperation(intBuffer);
    previousOperator = symbol;
    buffer = '0';
}

function flushOperationFloat(floatBuffer) {
    if (previousOperator === "+") {
        runningTotal += floatBuffer;
    } else if (previousOperator === "−") {
        runningTotal -= floatBuffer;
    } else if (previousOperator === "÷") {
        runningTotal /= floatBuffer;
    } else if (previousOperator === "×") {
        runningTotal *= floatBuffer;
    }
}

function flushOperation(intBuffer) {
    if (previousOperator === "+") {
        runningTotal += intBuffer;
    } else if (previousOperator === "−") {
        runningTotal -= intBuffer;
    } else if (previousOperator === "÷") {
        runningTotal /= intBuffer;
    } else if (previousOperator === "×") {
        runningTotal *= intBuffer;
    }
}

function handleNumber(numberString) {
    buffer === "0" ? buffer = numberString : buffer += numberString;
}

function init() {
    document.querySelectorAll(".calc-button").forEach(e => e.addEventListener("click", (e) => {
        buttonClick(e.target.textContent);
    }))
}

init();