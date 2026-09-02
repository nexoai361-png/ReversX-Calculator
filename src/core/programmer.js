export class Programmer {
  constructor() {
    this.value = 0;
  }

  append(char) {
    const hexStr = this.value.toString(16).toUpperCase();
    const newStr = (hexStr === '0' ? '' : hexStr) + char;
    const parsed = parseInt(newStr, 16);
    if (!isNaN(parsed)) {
      this.value = parsed;
    }
  }

  clear() {
    this.value = 0;
  }

  backspace() {
    const hexStr = this.value.toString(16).toUpperCase();
    if (hexStr.length > 1) {
      this.value = parseInt(hexStr.slice(0, -1), 16);
    } else {
      this.value = 0;
    }
  }

  getValue() {
    return this.value;
  }

  toHEX() {
    return this.value.toString(16).toUpperCase();
  }

  toDEC() {
    return this.value.toString(10);
  }

  toOCT() {
    return this.value.toString(8);
  }

  toBIN() {
    return this.value.toString(2);
  }
}
