import {
  ARABIC_NUMBERS,
  ROMAN_NUMBERS,
  convertArabicNumberToRomanNumber,
  convertRomanNumberToArabicNumber,
  calculateInArabicNumbers,
  calculateInRomanNumbers,
  parseExpression,
} from './index';

describe(convertArabicNumberToRomanNumber, () => {
  test('существует', () => {
    expect(convertArabicNumberToRomanNumber).toBeDefined();
    expect(typeof convertArabicNumberToRomanNumber).toBe('function');
  });

  test('возвращает строку', () => {
    expect(typeof convertArabicNumberToRomanNumber('81')).toBe('string');
  });

  test('корректно работает с example значениями', () => {
    expect(convertArabicNumberToRomanNumber('81')).toBe('LXXXI');
  });

  test('корректно работает с крайними значениями', () => {
    ARABIC_NUMBERS.forEach((arabicNumber, index) => {
      expect(convertArabicNumberToRomanNumber(arabicNumber.toString(10))).toBe(
        ROMAN_NUMBERS[index]
      );
    });
  });
});

describe(convertRomanNumberToArabicNumber, () => {
  test('существует', () => {
    expect(convertRomanNumberToArabicNumber).toBeDefined();
    expect(typeof convertRomanNumberToArabicNumber).toBe('function');
  });

  test('возвращает строку', () => {
    expect(typeof convertRomanNumberToArabicNumber('LXXXI')).toBe('string');
  });

  test('корректно работает с example значениями', () => {
    expect(convertRomanNumberToArabicNumber('LXXXI')).toBe('81');
  });

  test('корректно работает с крайними значениями', () => {
    ROMAN_NUMBERS.forEach((romanNumber, index) => {
      expect(convertRomanNumberToArabicNumber(romanNumber)).toBe(
        ARABIC_NUMBERS[index].toString()
      );
    });
  });
});

describe(calculateInArabicNumbers, () => {
  test('существует', () => {
    expect(calculateInArabicNumbers).toBeDefined();
    expect(typeof calculateInArabicNumbers).toBe('function');
  });

  test('возвращает строку', () => {
    expect(typeof calculateInArabicNumbers('9', '*', '9')).toBe('string');
  });

  test('корректно работает с example значениями', () => {
    expect(calculateInArabicNumbers('9', '*', '9')).toBe('81');
  });

  test('корректно работает с крайними значениями', () => {
    expect(calculateInArabicNumbers('1', '+', '1')).toBe('2');
    expect(calculateInArabicNumbers('1', '-', '1')).toBe('0');
    expect(calculateInArabicNumbers('1', '*', '1')).toBe('1');
    expect(calculateInArabicNumbers('1', '/', '1')).toBe('1');

    expect(calculateInArabicNumbers('10', '+', '10')).toBe('20');
    expect(calculateInArabicNumbers('10', '-', '10')).toBe('0');
    expect(calculateInArabicNumbers('10', '*', '10')).toBe('100');
    expect(calculateInArabicNumbers('10', '/', '10')).toBe('1');
  });
});

describe(calculateInRomanNumbers, () => {
  test('существует', () => {
    expect(calculateInRomanNumbers).toBeDefined();
    expect(typeof calculateInRomanNumbers).toBe('function');
  });

  test('возвращает строку', () => {
    expect(typeof calculateInRomanNumbers('IX', '*', 'IX')).toBe('string');
  });

  test('корректно работает с example значениями', () => {
    expect(calculateInRomanNumbers('IX', '*', 'IX')).toBe('LXXXI');
  });

  test('корректно работает с крайними значениями', () => {
    expect(calculateInRomanNumbers('I', '+', 'I')).toBe('II');
    expect(calculateInRomanNumbers('I', '-', 'I')).toBe('');
    expect(calculateInRomanNumbers('I', '*', 'I')).toBe('I');
    expect(calculateInRomanNumbers('I', '/', 'I')).toBe('I');

    expect(calculateInRomanNumbers('X', '+', 'X')).toBe('XX');
    expect(calculateInRomanNumbers('X', '-', 'X')).toBe('');
    expect(calculateInRomanNumbers('X', '*', 'X')).toBe('C');
    expect(calculateInRomanNumbers('X', '/', 'X')).toBe('I');
  });
});

describe(parseExpression, () => {
  test('существует', () => {
    expect(parseExpression).toBeDefined();
    expect(typeof parseExpression).toBe('function');
  });

  test('возвращает object, при корректных вводных', () => {
    expect(typeof parseExpression('9 * 9')).toBe('object');
    expect(typeof parseExpression('IX * IX')).toBe('object');
  });

  test('возвращает null, при не корректных вводных', () => {
    expect(parseExpression('')).toBe(null);

    expect(parseExpression('9')).toBe(null);
    expect(parseExpression('9 * ')).toBe(null);
    expect(parseExpression(' * 9')).toBe(null);

    expect(parseExpression('IX')).toBe(null);
    expect(parseExpression('IX * ')).toBe(null);
    expect(parseExpression(' * IX')).toBe(null);
  });

  test('корректно работает с example значениями', () => {
    expect(parseExpression('9 * 9')).toEqual({
      leftOperand: '9',
      operation: '*',
      rightOperand: '9',
      notation: 'arabic',
    });

    expect(parseExpression('IX * IX')).toEqual({
      leftOperand: 'IX',
      operation: '*',
      rightOperand: 'IX',
      notation: 'roman',
    });
  });

  test('корректно работает с крайними значениями', () => {
    ['+', '-', '*', '/'].forEach((operation) => {
      ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'].forEach((operand) => {
        expect(parseExpression(`${operand} ${operation} ${operand}`)).toEqual({
          leftOperand: operand,
          operation,
          rightOperand: operand,
          notation: 'arabic',
        });
      });
    });

    ['+', '-', '*', '/'].forEach((operation) => {
      ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X'].forEach(
        (operand) => {
          expect(parseExpression(`${operand} ${operation} ${operand}`)).toEqual(
            {
              leftOperand: operand,
              operation,
              rightOperand: operand,
              notation: 'roman',
            }
          );
        }
      );
    });
  });
});
