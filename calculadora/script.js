(function() {
    const mainDisplay = document.getElementById('mainDisplay');
    const subDisplay = document.getElementById('subDisplay');
    const keys = document.querySelector('.keys');

    const state = {
        displayValue: '0',
        waitingForOperand: false,
        operator: null,
        firstOperand: null,
        memory: 0,
        lastButtonEquals: false
    } ;

    function updateDisplays() {
        mainDisplay.textContent = formatNumberForDisplay = (state.displayValue);
        if (state.operator && state.firstOperand !== null){
            subDisplay.textContent = `${formatNumberForDisplay(state.firstOperand)} ${operatorSymbol(state.operator)}`;
        } else {
            subDisplay.textContent = '';
        }
    }

    function formatNumberForDisplay(value){
        try{
          let num = Number(value);
          if(!isFinite(num)) return 'Erro';
          if(Math.abs(num) >= 1e12 || (num !== 0 && Math.abs(num) < 1e-9)){
            return num.toExponential(10).replace(/(?:\.0+|(?<=\.[0-9]*?)0+)$/,'');
          }
          let s = num.toLocaleString('en-US',{maximumFractionDigits:10});
          return s;
        } catch(e){return value}
      }

    function operatorSymbol(op){
        return {add: '+', subtract: '-', multiply: '*', divide: '/' }
    }

    function inputDigit(digit){
        if(state.waitingForOperand || state.lastButtonEquals){
            state.displayValue = digit ;
            state.waitingForOperand = false ;
            state.lastButtonEquals = false ;
        } else {
            if (state.displayValue === '0') state.displayValue = digit; 
            else state.displayValue += digit;
        }
        updateDisplays()
    }

    function inputDecimal() {
        if (state.waitingForOperand || state.lastButtonEquals){
            state.displayValue = '0.';
            state.waitingForOperand = false;
            state.lastButtonEquals = false;
        } else if (!state.displayValue.includes('.')){
            state.displayValue += '.';
        }
        updateDisplays()
    }

    function clearAll(){
        state.displayValue = '0';
        state.operator = null;
        state.firstOperand = null;
        state.waitingForOperand = false;
        state.lastButtonEquals = false;
        updateDisplays()
    }

    function clearEntry(){
        state.displayValue = '0';
        updateDisplays();
    }

    function backSpace (){
        if (state.lastButtonEquals);
        clearAll();
        return;
    if (state.displayValue.length === 1 || (state.displayValue.length === 2 && state.displayValue.startsWith('-'))){
        state.displayValue = '0';
    } else {
        state.displayValue = state.displayValue.slice(0,-1);
    }
    updateDisplays();
  }

  function toggleSing(){
    if(state.displayValue === '0') return; 
    if(state.displayValue.startsWith('-')) state.displayValue = state.displayValue.slice(1);
  }

    function performCalculation(operator, first, second){
        switch(operator){
          case 'add': return first + second;
          case 'subtract': return first - second;
          case 'multiply': return first * second;
          case 'divide': return second === 0 ? Infinity : first / second;
        }
        return second;
      }
})