export class HistoryLog {
  constructor() {
    this.logs = JSON.parse(localStorage.getItem('calcHistory')) || [];
  }

  add(entry) {
    this.logs.unshift(entry);
    if (this.logs.length > 100) this.logs.pop();
    localStorage.setItem('calcHistory', JSON.stringify(this.logs));
  }

  clear() {
    this.logs = [];
    localStorage.setItem('calcHistory', JSON.stringify(this.logs));
  }

  getLogs() {
    return this.logs;
  }

  render(container, onSelect) {
    if (this.logs.length === 0) {
      container.innerHTML = '<div class="history-empty">No history yet</div>';
      return;
    }
    container.innerHTML = this.logs.map((item, idx) => `
      <div class="history-item" onclick="historySelect(${idx})">
        <div class="history-item-exp">${item.exp} =</div>
        <div class="history-item-res">${item.res}</div>
      </div>
    `).join('');
  }
}
