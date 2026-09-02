export class UIManager {
  constructor(calculator, history, programmer, themeManager) {
    this.calculator = calculator;
    this.history = history;
    this.programmer = programmer;
    this.themeManager = themeManager;

    this.elements = {
      calcResult: document.getElementById('calcResult'),
      calcExpression: document.getElementById('calcExpression'),
      calcHistory: document.getElementById('calcHistory'),
      historyList: document.getElementById('historyList'),
      historyDrawer: document.getElementById('historyDrawer'),
      scientificGrid: document.getElementById('scientificGrid'),
      sciToggleIndicator: document.getElementById('sciToggleIndicator'),
      pageTitle: document.getElementById('pageTitle'),
      toolsGrid: document.getElementById('toolsGrid'),
      toast: document.getElementById('toast')
    };
  }

  updateCalculatorDisplay() {
    const state = this.calculator.getState();
    this.elements.calcResult.textContent = state.formatDisplay(state.currentInput);
    this.elements.calcExpression.innerHTML = state.history || '&nbsp;';
  }

  renderHistory() {
    const logs = this.history.getLogs();
    if (logs.length === 0) {
      this.elements.historyList.innerHTML = '<div class="history-empty">No history yet</div>';
      return;
    }
    this.elements.historyList.innerHTML = logs.map((item, idx) => `
      <div class="history-item" onclick="historySelect(${idx})">
        <div class="history-item-exp">${item.exp} =</div>
        <div class="history-item-res">${item.res}</div>
      </div>
    `).join('');
  }

  toggleHistoryDrawer() {
    this.elements.historyDrawer.classList.toggle('active');
  }

  toggleScientificMode() {
    this.elements.scientificGrid.classList.toggle('active');
    const indicator = this.elements.sciToggleIndicator;
    const knob = indicator.querySelector('div');
    
    if (this.elements.scientificGrid.classList.contains('active')) {
      indicator.style.background = 'var(--accent)';
      knob.style.transform = 'translateX(20px)';
    } else {
      indicator.style.background = 'var(--bg-hover)';
      knob.style.transform = 'translateX(0)';
    }
  }

  showPage(page) {
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
    document.querySelectorAll('.menu-item').forEach(m => m.classList.remove('active'));
    
    document.getElementById('page-' + page).classList.add('active');
    
    const navItems = document.querySelectorAll('.nav-item');
    const pageMap = { 'calculator': 0, 'programmer': 1, 'converters': 2, 'settings': 3 };
    if (navItems[pageMap[page]] !== undefined) {
      navItems[pageMap[page]].classList.add('active');
    }
    
    const titles = {
      'calculator': 'Calculator',
      'programmer': 'Programmer Mode',
      'converters': 'Converters',
      'settings': 'Settings'
    };
    this.elements.pageTitle.textContent = titles[page];
    
    if (page === 'converters') {
      this.closeConverter();
    }
  }

  openConverter(type) {
    this.elements.toolsGrid.style.display = 'none';
    document.querySelectorAll('.converter-section').forEach(s => s.classList.remove('active'));
    document.getElementById('section-' + type).classList.add('active');
  }

  closeConverter() {
    this.elements.toolsGrid.style.display = 'block';
    document.querySelectorAll('.converter-section').forEach(s => s.classList.remove('active'));
  }

  toggleMenu() {
    document.getElementById('menuOverlay').classList.toggle('active');
    document.getElementById('menuPanel').classList.toggle('active');
  }

  showToast(message) {
    this.elements.toast.textContent = message;
    this.elements.toast.classList.add('active');
    setTimeout(() => this.elements.toast.classList.remove('active'), 2000);
  }

  updateProgrammerDisplay() {
    document.getElementById('val-HEX').textContent = this.programmer.toHEX();
    document.getElementById('val-DEC').textContent = this.programmer.toDEC();
    document.getElementById('val-OCT').textContent = this.programmer.toOCT();
    document.getElementById('val-BIN').textContent = this.programmer.toBIN();
  }

  updateThemeButtons() {
    const currentTheme = this.themeManager.getCurrentTheme();
    document.querySelectorAll('.theme-btn').forEach(btn => {
      btn.classList.remove('active');
      if (btn.onclick.toString().includes(currentTheme)) {
        btn.classList.add('active');
      }
    });
  }
}
