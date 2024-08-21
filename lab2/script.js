document.addEventListener('DOMContentLoaded', function () {
    const calculator = document.getElementById('calculator');
    const changeBackgroundButton = document.getElementById('changeBackgroundButton');

    const getRandomColor = () => {
        const letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    };

    changeBackgroundButton.addEventListener('click', function () {
        const randomColor = getRandomColor();
        calculator.style.backgroundColor = randomColor;
    });
});

window.onload = function(){
    let a = ''
    let b = ''
    let expressionResult = ''
    let selectedOperation = null

    const outputElement = document.getElementById("result")
    const historyElement = document.getElementById("history") // элемент для истории
    const digitButtons = document.querySelectorAll('[id ^= "btn_digit_"]')

    function onDigitButtonClicked(digit){
        if (!selectedOperation){
            if ((digit != '.')||(digit == '.'&& !a.includes(digit))){
                a += digit
            }
            outputElement.innerHTML = a
        } else {
            if ((digit != '.')||(digit == '.'&& !b.includes(digit))){
                b += digit
                outputElement.innerHTML = b
            }
        }
    }

    digitButtons.forEach(button => {
        button.onclick = function() {
            const digitValue = button.innerHTML
            onDigitButtonClicked(digitValue)
        }
    })

    document.getElementById("formats").addEventListener("change", function() {
        updateOutputFormat();
    });

    function updateOutputFormat() {
        const selectedFormat = document.getElementById("formats").value;
        let result = outputElement.innerHTML;

        switch (selectedFormat) {
            case "exponent":
                result = parseFloat(result).toExponential();
                break;
            case "general":
                result = isNaN(parseFloat(result)) ? result : parseFloat(result).toString();
                break;
        }

        outputElement.innerHTML = result;
    }

    document.getElementById("btn_op_mult").onclick = function(){
        setSelectedOperation('x');
    }
    document.getElementById("btn_op_plus").onclick = function(){
        setSelectedOperation('+');
    }
    document.getElementById("btn_op_minus").onclick = function(){
        setSelectedOperation('-');
    }
    document.getElementById("btn_op_div").onclick = function(){
        setSelectedOperation('/');
    }
    document.getElementById("btn_op_square").onclick = function() {
        if (a !== '') {
            a = Math.pow(+a, 2).toString();
            outputElement.innerHTML = a;
            historyElement.innerHTML = `${a}^2`;
        }
    }
    document.getElementById("btn_op_percent").onclick = function() {
        if (a !== '') {
            if (!selectedOperation) {
                a = (+a) / 100;
                outputElement.innerHTML = a;
                historyElement.innerHTML = `${a} %`;
            } else if (b !== '') {
                b = (+b) * (+a) / 100;
                outputElement.innerHTML = b;
                historyElement.innerHTML = `${b} % of ${a}`;
            }
        }
    }

    document.getElementById("btn_op_clear").onclick = function() {
        a = ''
        b = ''
        selectedOperation = ''
        expressionResult = ''
        outputElement.innerHTML = 0
        historyElement.innerHTML = ''
    }

    document.getElementById("btn_op_equal").onclick = foo

    function setSelectedOperation(operation) {
        if (a === '') return
        if (selectedOperation === null) {
            selectedOperation = operation;
        } else {
            foo();
            selectedOperation = operation;
        }
    }

    function foo() {
        if (a === '' || b === '' || !selectedOperation) {
            return
        }

        switch(selectedOperation) {
            case 'x':
                expressionResult = (+a) * (+b)
                break;
            case '+':
                expressionResult = (+a) + (+b)
                break;
            case '-':
                expressionResult = (+a) - (+b)
                break;
            case '/':
                expressionResult = (+a) / (+b)
                break;
            case "^2":
                expressionResult = (+a) * (+a)
                break;
        }

        historyElement.innerHTML = `${a} ${selectedOperation} ${b}`
        a = expressionResult.toString()
        b = ''
        selectedOperation = null
        outputElement.innerHTML = a
    }
};
