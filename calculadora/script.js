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

    formatNumberForDisplay(value) {
        try {
        let num = Number(value) ;
        if(!isFinite(num)) return 'Erro';
        if(matchMedia.abs(num) >= 1e12 || (num !== 0 && Math.abs(num) < 1e-9)){
            
        }
        }
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