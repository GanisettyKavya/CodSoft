document.addEventListener('DOMContentLoaded', function() {
    const display = document.getElementById('display');
    const buttons = document.querySelectorAll('.buttons button');

    let currentInput = '';
    let hasError = false;
    let lastResult = ''; // Store the result of the previous calculation

    // Function to update the display
    function updateDisplay(value) {
        if (hasError) {
            clearDisplay();
            hasError = false;
        }
        currentInput += value;
        display.value = currentInput;
    }

    // Function to clear the display
    function clearDisplay() {
        currentInput = '';
        display.value = '';
    }

    // Function to perform backspace
    function backspace() {
        currentInput = currentInput.slice(0, -1);
        display.value = currentInput;
    }

    // Function to evaluate the expression
    function evaluateExpression() {
        try {
            const expression = currentInput.replace(/x/g, '*'); // Replace 'x' with '*' for multiplication
            const result = eval(expression);
            if (result === Infinity || result === -Infinity) {
                throw new Error('Division by zero');
            }
            display.value = result;
            lastResult = result.toString(); // Store the result for further calculations
            currentInput = result.toString();
        } catch (error) {
            display.value = 'Error';
            hasError = true;
        }
    }

    // Add event listeners to buttons
    buttons.forEach(button => {
        button.addEventListener('click', function() {
            const buttonValue = this.textContent;

            switch (buttonValue) {
                case 'C':
                    clearDisplay();
                    break;
                case '←':
                    backspace();
                    break;
                case '=':
                    evaluateExpression();
                    break;
                case 'x':
                    updateDisplay('*'); // Replace 'x' with '*' for multiplication
                    break;
                case '+':
                case '-':
                case '/':
                    if (currentInput !== '') {
                        updateDisplay(buttonValue);
                    } else if (lastResult !== '') { // If there is a previous result, use it as the first operand
                        updateDisplay(lastResult + buttonValue);
                    }
                    break;
                default:
                    updateDisplay(buttonValue);
                    break;
            }
        });
    });
});