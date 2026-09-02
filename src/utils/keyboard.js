export const initKeyboard = (uiManager, calculator) => {
  document.addEventListener('keydown', (e) => {
    if (e.target.tagName === 'INPUT') return;
    
    if (e.key >= '0' && e.key <= '9') calculator.appendNumber(e.key);
    else if (e.key === '.') calculator.appendDecimal();
    else if (e.key === '+') calculator.appendOperator('+', () => {});
    else if (e.key === '-') calculator.appendOperator('-', () => {});
    else if (e.key === '*') calculator.appendOperator('*', () => {});
    else if (e.key === '/') { e.preventDefault(); calculator.appendOperator('/', () => {}); }
    else if (e.key === 'Enter' || e.key === '=') calculator.calculate(() => {});
    else if (e.key === 'Escape') calculator.clearAll();
    else if (e.key === 'Backspace') {
      calculator.backspace();
    }
    
    uiManager.updateCalculatorDisplay();
  });
};

export const initClickOutside = () => {
  document.addEventListener('click', function(e) {
    if (!e.target.closest('.custom-select')) {
      document.querySelectorAll('.custom-select').forEach(s => s.classList.remove('open'));
    }
  });
};
