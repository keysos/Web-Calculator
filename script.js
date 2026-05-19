const displayInput = document.getElementById("calculator-input");
const buttons = document.querySelectorAll("button");

const buttonSound = new Audio("assets/sounds/calculator-sound.wav")

const btnEqual = document.getElementById("btn-equal");
const btnClear = document.getElementById("btn-clear")
const btnClearAll = document.getElementById("btn-clear-all");

const operators = ["+", "-", "*", "/"]

let hasError = false;

buttons.forEach((element) => {

    element.addEventListener("click", () => {

        if (hasError) return;

        buttonSound.currentTime = 0;
        buttonSound.play();

        const value = element.dataset.value ? element.dataset.value : element.textContent;

        const lastChar = displayInput.textContent.slice(-1);

        if (operators.includes(value) && operators.includes(lastChar)) {
            return;
        }

        if (value === "=" || value === "C" || value === "CEE") return;

        displayInput.textContent += value;
    })
})

btnEqual.addEventListener("click", () => {
    displayInput.textContent = evaluateOperation(displayInput.textContent);
})

btnClear.addEventListener("click", () => {
    if (hasError) return;
    displayInput.textContent = displayInput.textContent.slice(0, -1);
})

btnClearAll.addEventListener("click", () => {
    displayInput.textContent = "";
    displayInput.style.fontSize = "2rem";
    hasError = false;
})

function evaluateOperation(operation) {
    
    const operators = "*/=-";

    const firstChar = operation[0];
    const lastChar = operation[operation.length - 1];

    if (operators.includes(firstChar) || operators.includes(lastChar) || /[a-zA-ZÀ-ÿ]/.test(operation)) {
        hasError = true;

        displayInput.style.fontSize = "24px";
        return  `error: invalid expression`;
    }

    return eval(operation);
}
