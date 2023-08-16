// Check if the entered number is negative
function isInputNegative(content) {
    return content[0] == '-'
}
//check if the operation is single argument
function IsSingleOperation(content, ops) {
    if(content.match(ops) == null) return false
    else return content.match(ops).length == 1
}
// check if the screen is empty
function isEmpty(content) {
    return content == ''
}
// check if the input contains numbers only
function isPureNumbers(content, ops) {
    return content.match(ops) == null
}
// convert a single argument negative input into proper negative number format
function convertNegativeNumber(area, ops) {
    negativeNum1 = 1
        if(isInputNegative(area.textContent) && IsSingleOperation(area.textContent, ops)){
            negativeNum1 = -1
            area.textContent = area.textContent.slice(1, area.textContent.length)
        }
        return negativeNum1 * Number(area.textContent)
}
// run a single argument operation 
function runSingleArgumentOperation(area, op, regExOfDoubleOps) {
    if(op == 'c' || op == 'backspace') area.textContent = doTheMath(op, area.textContent)
    else {
        num = convertNegativeNumber(area, regExOfDoubleOps)
        if(!isEmpty(area.textContent) &&  isPureNumbers(area.textContent, regExOfDoubleOps)) {
            area.textContent = doTheMath(op, Number(num))
        }

    }
}
// convert the first negative number of a two argument operation into a proper negative 
//number format 
function convertFirstArgumentToNegative(area) {
    negativeNum = 1   
    if(isInputNegative(area.textContent)){
        area.textContent = area.textContent.slice(1, area.textContent.length)
        negativeNum1 = -1
    }
    return negativeNum
}

//split the arguments of a two arguments operation
function splitArgumentsAndExecute(area, ops, negativeNum) {
        operator = area.textContent.match(ops)
        operation = area.textContent
            if(operator.length == 1) {
                num1 = negativeNum * Number(operation.slice(0, operation.indexOf(operator)))
                num2 = Number(operation.slice(operation.indexOf(operator)+1, operation.length))
                area.textContent = doTheMath(operator, num1, num2)    
            } else {
                area.textContent = 'Invalid Operation'
            }
}

//run double argument operation
function runDoubleArgumentOperation(area, ops) {
    negativeNum = convertFirstArgumentToNegative(area)
    if(!isPureNumbers(area.textContent, ops))
    splitArgumentsAndExecute(area, ops, negativeNum)
    else
    area.textContent = negativeNum * area.textContent   
}

//capture mouse clicks
function getInput(area, clickedButton) {
    if(area.textContent == '0'|| area.textContent == 'Invalid Operation' || area.textContent == 'NaN')
        area.textContent = clickedButton
    else area.textContent = area.textContent + clickedButton
    
}
//execute the mathematical operation  
function doTheMath(operator, num1, num2) {
    if(operator == 'x') return Math.round((num1 * num2)*1000)/1000
    else if(operator == '+') return num1 + num2
    else if(operator == '-') return num1 - num2
    else if(operator == '%') return Math.round(num1/100*1000)/1000
    else if(operator == 'sqrt') {
        if(num1 < 0) return 'Invalid Operation'
        else return Math.round(Math.sqrt(num1)*1000)/1000
    } else if(operator == 'reverseSign') return -1 * num1
    else if(operator == 'c') return ''
    else if(operator == 'backspace') return num1.slice(0, num1.length-1)  
    else return Math.round((num1 / num2)*1000)/1000
    
}
//compare input with list of operations
function compareOperator(operator, listOfOperators) {
    if(listOfOperators.indexOf(operator) == -1) return false
    else return true
}

//main function called when button is clicked
function runCalculator(e) {
    let displayArea = document.querySelector('.displayNumbers')
    let clickedButton = this.id
    let opsRegEx = /[x/+-]/g
    let singleArgOpsArray = ['%', 'sqrt', 'reverseSign', 'c', 'backspace']

    if(compareOperator(clickedButton, singleArgOpsArray)) runSingleArgumentOperation(displayArea, clickedButton, opsRegEx)
    else if(compareOperator(clickedButton, ['='])) runDoubleArgumentOperation(displayArea, opsRegEx)
    else getInput(displayArea, clickedButton)
}

buttons = document.querySelectorAll('.button, .backSpace')
buttons.forEach(button => { button.addEventListener("click", runCalculator)});