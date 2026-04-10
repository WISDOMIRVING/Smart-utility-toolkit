export const unitConversions = {
  length: {
    units: ['meters', 'kilometers', 'miles', 'feet', 'inches'],
    rates: {
      meters: 1,
      kilometers: 1000,
      miles: 1609.34,
      feet: 0.3048,
      inches: 0.0254,
    },
  },
  weight: {
    units: ['kilograms', 'grams', 'pounds', 'ounces'],
    rates: {
      kilograms: 1,
      grams: 0.001,
      pounds: 0.453592,
      ounces: 0.0283495,
    },
  },
};

export const convertUnits = (value, fromUnit, toUnit, category) => {
  if (category === 'temp') {
    return convertTemperature(value, fromUnit, toUnit);
  }

  const { rates } = unitConversions[category];
  const valueInBase = value * rates[fromUnit];
  return valueInBase / rates[toUnit];
};

const convertTemperature = (value, from, to) => {
  let inCelsius;
  if (from === 'Celsius') inCelsius = value;
  else if (from === 'Fahrenheit') inCelsius = (value - 32) * (5 / 9);
  else if (from === 'Kelvin') inCelsius = value - 273.15;

  if (to === 'Celsius') return inCelsius;
  else if (to === 'Fahrenheit') return inCelsius * (9 / 5) + 32;
  else if (to === 'Kelvin') return inCelsius + 273.15;
  return value;
};
