export class CalculatorCore {
  constructor() {
    this.state = {
      currentInput: '0',
      previousInput: '',
      operator: null,
      shouldResetScreen: false,
      history: ''
    };
    this.historyLogs = [];
  }

  getRaw(numStr) {
    return numStr.replace(/,/g, '');
  }

  formatDisplay(num) {
    if (num === 'Error' || num === 'Infinity' || num === '-Infinity' || num === 'NaN') return 'Error';
    const n = parseFloat(num);
    if (isNaN(n)) return num;
    if (Number.isInteger(n) && Math.abs(n) < 1e15) {
      return n.toLocaleString('en-US');
    }
    if (num.includes('.')) {
      const parts = num.split('.');
      const intPart = parseInt(parts[0].replace('-', '')) || 0;
      const sign = parts[0].startsWith('-') ? '-' : '';
      return sign + intPart.toLocaleString('en-US') + '.' + parts[1];
    }
    return n.toLocaleString('en-US');
  }

  appendNumber(num) {
    if (this.state.currentInput === 'Error') this.clearAll();
    if (this.state.shouldResetScreen) {
      this.state.currentInput = num;
      this.state.shouldResetScreen = false;
    } else {
      const raw = this.getRaw(this.state.currentInput);
      if (raw.replace(/[^0-9]/g, '').length >= 15) return;
      if (this.state.currentInput === '0') {
        this.state.currentInput = num;
      } else {
        this.state.currentInput = this.state.currentInput + num;
      }
    }
  }

  appendDecimal() {
    if (this.state.shouldResetScreen) {
      this.state.currentInput = '0.';
      this.state.shouldResetScreen = false;
      return;
    }
    if (!this.state.currentInput.includes('.')) {
      this.state.currentInput = this.state.currentInput + '.';
    }
  }

  appendOperator(op, historyCallback) {
    if (this.state.currentInput === 'Error') return;
    if (this.state.operator !== null && !this.state.shouldResetScreen) {
      this.compute(historyCallback);
    }
    this.state.previousInput = this.getRaw(this.state.currentInput);
    this.state.operator = op;
    this.state.history = this.formatDisplay(this.state.currentInput) + ' ' + this.getOpSymbol(op);
    this.state.shouldResetScreen = true;
  }

  getOpSymbol(op) {
    switch(op) {
      case '*': return '\u00D7';
      case '/': return '\u00F7';
      case '+': return '+';
      case '-': return '-';
      case '^': return '^';
      default: return op;
    }
  }

  compute(historyCallback) {
    if (this.state.operator === null) return;
    let result;
    const prev = parseFloat(this.state.previousInput);
    const curr = parseFloat(this.getRaw(this.state.currentInput));
    if (isNaN(prev) || isNaN(curr)) return;
    
    const operations = {
      '+': () => prev + curr,
      '-': () => prev - curr,
      '*': () => prev * curr,
      '/': () => curr === 0 ? (this.setError(), null) : prev / curr,
      '^': () => Math.pow(prev, curr)
    };
    
    result = operations[this.state.operator]();
    if (result === null) return;
    
    const fullExp = this.formatDisplay(this.state.previousInput) + ' ' + this.getOpSymbol(this.state.operator) + ' ' + this.formatDisplay(this.state.currentInput);
    this.state.history = fullExp + ' =';
    this.state.currentInput = parseFloat(result.toPrecision(12)).toString();
    
    if (historyCallback) {
      historyCallback(fullExp, this.state.currentInput);
    }
    
    this.state.operator = null;
    this.state.previousInput = '';
    this.state.shouldResetScreen = true;
  }

  setError() {
    this.state.currentInput = 'Error';
    this.state.operator = null;
    this.state.history = '';
  }

  calculate(historyCallback) {
    if (this.state.operator === null) return;
    this.compute(historyCallback);
  }

  clearAll() {
    this.state.currentInput = '0';
    this.state.previousInput = '';
    this.state.operator = null;
    this.state.history = '';
    this.state.shouldResetScreen = false;
  }

  toggleSign() {
    if (this.state.currentInput === '0' || this.state.currentInput === 'Error') return;
    if (this.state.currentInput.startsWith('-')) {
      this.state.currentInput = this.state.currentInput.substring(1);
    } else {
      this.state.currentInput = '-' + this.state.currentInput;
    }
  }

  percentage() {
    if (this.state.currentInput === 'Error') return;
    const val = parseFloat(this.getRaw(this.state.currentInput));
    this.state.currentInput = (val / 100).toString();
  }

  appendFunction(func, historyCallback) {
    if (this.state.currentInput === 'Error') return;
    const num = parseFloat(this.getRaw(this.state.currentInput));
    const funcMap = {
      sin: () => Math.sin(num * Math.PI / 180),
      cos: () => Math.cos(num * Math.PI / 180),
      tan: () => Math.tan(num * Math.PI / 180),
      log: () => Math.log10(num),
      ln: () => Math.log(num),
      sqrt: () => Math.sqrt(num),
      cbrt: () => Math.cbrt(num),
      abs: () => Math.abs(num)
    };
    
    const result = funcMap[func] ? funcMap[func]() : NaN;
    if (isNaN(result) || !isFinite(result)) {
      this.state.currentInput = 'Error';
      return;
    }
    
    const exp = func + '(' + this.state.currentInput + ')';
    this.state.history = exp;
    this.state.currentInput = parseFloat(result.toPrecision(12)).toString();
    
    if (historyCallback) {
      historyCallback(exp, this.state.currentInput);
    }
    
    this.state.shouldResetScreen = true;
  }

  square(historyCallback) {
    if (this.state.currentInput === 'Error') return;
    const num = parseFloat(this.getRaw(this.state.currentInput));
    const exp = this.formatDisplay(this.state.currentInput) + '\u00B2';
    this.state.history = exp;
    this.state.currentInput = parseFloat((num * num).toPrecision(12)).toString();
    
    if (historyCallback) {
      historyCallback(exp, this.state.currentInput);
    }
    
    this.state.shouldResetScreen = true;
  }

  cube(historyCallback) {
    if (this.state.currentInput === 'Error') return;
    const num = parseFloat(this.getRaw(this.state.currentInput));
    const exp = this.formatDisplay(this.state.currentInput) + '\u00B3';
    this.state.history = exp;
    this.state.currentInput = parseFloat((num * num * num).toPrecision(12)).toString();
    
    if (historyCallback) {
      historyCallback(exp, this.state.currentInput);
    }
    
    this.state.shouldResetScreen = true;
  }

  power() {
    this.state.previousInput = this.getRaw(this.state.currentInput);
    this.state.operator = '^';
    this.state.history = this.formatDisplay(this.state.previousInput) + '^';
    this.state.shouldResetScreen = true;
  }

  factorial(historyCallback) {
    if (this.state.currentInput === 'Error') return;
    const num = parseInt(this.getRaw(this.state.currentInput));
    if (num < 0 || num > 170) {
      this.state.currentInput = 'Error';
      return;
    }
    let result = 1;
    for (let i = 2; i <= num; i++) result *= i;
    const exp = this.state.currentInput + '!';
    this.state.history = exp;
    this.state.currentInput = result.toString();
    
    if (historyCallback) {
      historyCallback(exp, this.state.currentInput);
    }
    
    this.state.shouldResetScreen = true;
  }

  inverse(historyCallback) {
    if (this.state.currentInput === 'Error') return;
    const num = parseFloat(this.getRaw(this.state.currentInput));
    if (num === 0) {
      this.state.currentInput = 'Error';
      return;
    }
    const exp = '1/(' + this.state.currentInput + ')';
    this.state.history = exp;
    this.state.currentInput = parseFloat((1 / num).toPrecision(12)).toString();
    
    if (historyCallback) {
      historyCallback(exp, this.state.currentInput);
    }
    
    this.state.shouldResetScreen = true;
  }

  appendValue(val) {
    if (val === 'Math.PI') {
      this.state.currentInput = Math.PI.toString();
    } else if (val === 'Math.E') {
      this.state.currentInput = Math.E.toString();
    }
    this.state.shouldResetScreen = true;
  }

  backspace() {
    if (this.state.shouldResetScreen) {
      this.clearAll();
      return;
    }
    const raw = this.getRaw(this.state.currentInput);
    if (raw.length > 1) {
      const newRaw = raw.slice(0, -1);
      this.state.currentInput = newRaw === '-' || newRaw === '' ? '0' : newRaw;
    } else {
      this.state.currentInput = '0';
    }
  }

  getState() {
    return {
      currentInput: this.state.currentInput,
      previousInput: this.state.previousInput,
      operator: this.state.operator,
      shouldResetScreen: this.state.shouldResetScreen,
      history: this.state.history,
      formatDisplay: (num) => this.formatDisplay(num)
    };
  }
}
