import { CalculatorCore } from './core/calculator.js';
import { Converter } from './core/converter.js';
import { HistoryLog } from './core/history.js';
import { Programmer } from './core/programmer.js';
import { ThemeManager } from './core/theme.js';
import { UIManager } from './ui/ui-manager.js';
import { initKeyboard, initClickOutside } from './utils/keyboard.js';

class App {
  constructor() {
    this.calculator = new CalculatorCore();
    this.history = new HistoryLog();
    this.programmer = new Programmer();
    this.themeManager = new ThemeManager();
    this.ui = new UIManager(this.calculator, this.history, this.programmer, this.themeManager);
    
    this.init();
  }

  init() {
    this.bindEvents();
    this.initKeyboard();
    this.ui.updateCalculatorDisplay();
    this.ui.updateProgrammerDisplay();
    window.app = this;
  }

  bindEvents() {
    // Calculator buttons
    window.appendNumber = (num) => {
      this.calculator.appendNumber(num);
      this.ui.updateCalculatorDisplay();
    };
    
    window.appendDecimal = () => {
      this.calculator.appendDecimal();
      this.ui.updateCalculatorDisplay();
    };
    
    window.appendOperator = (op) => {
      this.calculator.appendOperator(op, (exp, res) => this.history.add({ exp, res }));
      this.ui.updateCalculatorDisplay();
    };
    
    window.calculate = () => {
      this.calculator.calculate((exp, res) => this.history.add({ exp, res }));
      this.ui.updateCalculatorDisplay();
    };
    
    window.clearAll = () => {
      this.calculator.clearAll();
      this.ui.updateCalculatorDisplay();
    };
    
    window.toggleSign = () => {
      this.calculator.toggleSign();
      this.ui.updateCalculatorDisplay();
    };
    
    window.percentage = () => {
      this.calculator.percentage();
      this.ui.updateCalculatorDisplay();
    };
    
    window.appendFunction = (func) => {
      this.calculator.appendFunction(func, (exp, res) => this.history.add({ exp, res }));
      this.ui.updateCalculatorDisplay();
    };
    
    window.square = () => {
      this.calculator.square((exp, res) => this.history.add({ exp, res }));
      this.ui.updateCalculatorDisplay();
    };
    
    window.cube = () => {
      this.calculator.cube((exp, res) => this.history.add({ exp, res }));
      this.ui.updateCalculatorDisplay();
    };
    
    window.power = () => {
      this.calculator.power();
      this.ui.updateCalculatorDisplay();
    };
    
    window.factorial = () => {
      this.calculator.factorial((exp, res) => this.history.add({ exp, res }));
      this.ui.updateCalculatorDisplay();
    };
    
    window.inverse = () => {
      this.calculator.inverse((exp, res) => this.history.add({ exp, res }));
      this.ui.updateCalculatorDisplay();
    };
    
    window.appendValue = (val) => {
      this.calculator.appendValue(val);
      this.ui.updateCalculatorDisplay();
    };

    // History
    window.toggleHistoryDrawer = () => this.ui.toggleHistoryDrawer();
    window.historySelect = (idx) => {
      const item = this.history.getLogs()[idx];
      this.calculator.state.currentInput = item.res;
      this.calculator.state.history = item.exp + ' =';
      this.ui.updateCalculatorDisplay();
      this.ui.toggleHistoryDrawer();
      this.ui.showToast('Result restored');
    };
    window.clearHistoryLog = () => {
      this.history.clear();
      this.ui.renderHistory();
      this.ui.showToast('History cleared');
    };

    // Scientific toggle
    window.toggleScientific = () => this.ui.toggleScientificMode();

    // Navigation
    window.showPage = (page) => this.ui.showPage(page);
    window.openConverter = (type) => this.ui.openConverter(type);
    window.closeConverter = () => this.ui.closeConverter();
    window.toggleMenu = () => this.ui.toggleMenu();
    window.showToast = (message) => this.ui.showToast(message);

    // Theme
    window.setTheme = (themeName) => {
      this.themeManager.applyTheme(themeName);
      this.ui.showToast('Theme updated!');
    };

    // Swap units
    window.swapUnits = (type) => Converter.swap(type);

    // Programmer
    window.progAppend = (char) => {
      this.programmer.append(char);
      this.ui.updateProgrammerDisplay();
    };
    window.progClear = () => {
      this.programmer.clear();
      this.ui.updateProgrammerDisplay();
    };
    window.progBackspace = () => {
      this.programmer.backspace();
      this.ui.updateProgrammerDisplay();
    };
  }

  initKeyboard() {
    initKeyboard(this.ui, this.calculator);
    initClickOutside();
  }
}

const converters = ['length', 'weight', 'temperature', 'currency', 'area', 'speed', 'volume', 'energy', 'pressure', 'fuel', 'data', 'time'];
converters.forEach(type => {
  window['convert' + type.charAt(0).toUpperCase() + type.slice(1)] = () => Converter.convert(type);
});

new App();
