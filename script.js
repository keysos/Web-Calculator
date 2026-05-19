const displayInput = document.getElementById("calculator-input");
const buttons = document.querySelectorAll("button");

const buttonSound = new Audio("assets/sounds/calculator-sound.wav")

const btnEqual = document.getElementById("btn-equal");
const btnClear = document.getElementById("btn-clear")
const btnClearAll = document.getElementById("btn-clear-all");

const operators = ["+", "-", "*", "/"]

buttons.forEach((element) => {
    element.addEventListener("click", () => {

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
    displayInput.textContent = displayInput.textContent.slice(0, -1);
})

btnClearAll.addEventListener("click", () => {
    displayInput.textContent = "";
})

function evaluateOperation(operation) {
    return eval(operation);
}
