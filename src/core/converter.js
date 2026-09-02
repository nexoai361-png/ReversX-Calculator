import { conversionData } from '../utils/data.js';

export class Converter {
  static converters = {
    length: {
      fromEl: 'lengthFrom', toEl: 'lengthTo',
      fromUnit: 'lengthFromUnit', toUnit: 'lengthToUnit',
      dataKey: 'length'
    },
    weight: {
      fromEl: 'weightFrom', toEl: 'weightTo',
      fromUnit: 'weightFromUnit', toUnit: 'weightToUnit',
      dataKey: 'weight'
    },
    temperature: {
      fromEl: 'tempFrom', toEl: 'tempTo',
      fromUnit: 'tempFromUnit', toUnit: 'tempToUnit',
      dataKey: 'temperature'
    },
    currency: {
      fromEl: 'currencyFrom', toEl: 'currencyTo',
      fromUnit: 'currencyFromUnit', toUnit: 'currencyToUnit',
      dataKey: 'currency'
    },
    area: {
      fromEl: 'areaFrom', toEl: 'areaTo',
      fromUnit: 'areaFromUnit', toUnit: 'areaToUnit',
      dataKey: 'area'
    },
    speed: {
      fromEl: 'speedFrom', toEl: 'speedTo',
      fromUnit: 'speedFromUnit', toUnit: 'speedToUnit',
      dataKey: 'speed'
    },
    volume: {
      fromEl: 'volumeFrom', toEl: 'volumeTo',
      fromUnit: 'volumeFromUnit', toUnit: 'volumeToUnit',
      dataKey: 'volume'
    },
    energy: {
      fromEl: 'energyFrom', toEl: 'energyTo',
      fromUnit: 'energyFromUnit', toUnit: 'energyToUnit',
      dataKey: 'energy'
    },
    pressure: {
      fromEl: 'pressureFrom', toEl: 'pressureTo',
      fromUnit: 'pressureFromUnit', toUnit: 'pressureToUnit',
      dataKey: 'pressure'
    },
    fuel: {
      fromEl: 'fuelFrom', toEl: 'fuelTo',
      fromUnit: 'fuelFromUnit', toUnit: 'fuelToUnit',
      dataKey: 'fuel'
    },
    data: {
      fromEl: 'dataFrom', toEl: 'dataTo',
      fromUnit: 'dataFromUnit', toUnit: 'dataToUnit',
      dataKey: 'data'
    },
    time: {
      fromEl: 'timeFrom', toEl: 'timeTo',
      fromUnit: 'timeFromUnit', toUnit: 'timeToUnit',
      dataKey: 'time'
    }
  };

  static convert(type) {
    const config = this.converters[type];
    if (!config) return;
    
    const val = parseFloat(document.getElementById(config.fromEl).value) || 0;
    const from = document.getElementById(config.fromUnit).value;
    const to = document.getElementById(config.toUnit).value;
    
    let result;
    
    if (type === 'temperature') {
      result = this.convertTemperature(val, from, to);
    } else if (type === 'fuel') {
      result = this.convertFuel(val, from, to);
    } else {
      const data = conversionData[config.dataKey];
      result = val * data[from] / data[to];
    }
    
    document.getElementById(config.toEl).value = parseFloat(result.toPrecision(10));
  }

  static convertTemperature(val, from, to) {
    let celsius;
    if (from === 'c') celsius = val;
    else if (from === 'f') celsius = (val - 32) * 5 / 9;
    else celsius = val - 273.15;

    if (to === 'c') return celsius;
    if (to === 'f') return celsius * 9 / 5 + 32;
    return celsius + 273.15;
  }

  static convertFuel(val, from, to) {
    if (from === to) return val;
    
    const toL100 = { mpg: 235.215, kml: 100, l100: 1 };
    const toMpg = { mpg: 1, kml: 1 / 0.425144, l100: (val) => val === 0 ? 0 : 235.215 / val };
    const toL = { mpg: 0.425144, kml: 1, l100: 0 };
    
    if (from === 'l100') {
      if (to === 'mpg') return val === 0 ? 0 : 235.215 / val;
      if (to === 'kml') return val === 0 ? 0 : 100 / val;
    }
    if (to === 'l100') {
      if (from === 'mpg') return val === 0 ? 0 : 235.215 / val;
      if (from === 'kml') return val === 0 ? 0 : 100 / val;
    }
    if (from === 'mpg' && to === 'kml') return val * 0.425144;
    if (from === 'kml' && to === 'mpg') return val / 0.425144;
    
    return val;
  }

  static swap(type) {
    const config = this.converters[type];
    if (!config) return;
    
    const fromVal = document.getElementById(config.fromEl).value;
    const toVal = document.getElementById(config.toEl).value;
    document.getElementById(config.fromEl).value = toVal;
    document.getElementById(config.toEl).value = toVal === '' ? '' : fromVal;
    
    const fromSelect = document.getElementById(config.fromUnit);
    const toSelect = document.getElementById(config.toUnit);
    const temp = fromSelect.value;
    fromSelect.value = toSelect.value;
    toSelect.value = temp;
    
    this.convert(type);
  }
}
