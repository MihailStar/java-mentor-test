// https://repl.it/repls/ImmediateWellwornProperty
/** @constant */
export const ARABIC_NUMBERS = [1000, 900, 500, 400, 100, 90, 50, 40, 10, 9, 5, 4, 1];
/** @constant */
export const ROMAN_NUMBERS = ['M', 'CM', 'D', 'CD', 'C', 'XC', 'L', 'XL', 'X', 'IX', 'V', 'IV', 'I'];

/**
 * Конвертирует целые арабские числа, от '1' до '1000' включительно, в римские числа.
 *
 * @example convertArabicNumberToRomanNumber('81'); // -> 'LXXXI'
 * @tutorial https://github.com/carlaam/roman-to-arabic-numerals/blob/master/lib/index.js#L25
 */
export function convertArabicNumberToRomanNumber(arabicNumber: string): string {
  let number = Number.parseInt(arabicNumber, 10);
  let result = '';

  ROMAN_NUMBERS.forEach((romanNumber, index) => {
    while (number >= ARABIC_NUMBERS[index]) {
      result += romanNumber;
      number -= ARABIC_NUMBERS[index];
    }
  });

  return result;
}

/**
 * Конвертирует римские числа, от 'I' до 'M' включительно, в арабские числа.
 *
 * @example convertRomanNumberToArabicNumber('LXXXI'); // -> '81'
 * @tutorial https://github.com/carlaam/roman-to-arabic-numerals/blob/master/lib/index.js#L39
 */
export function convertRomanNumberToArabicNumber(romanNumber: string): string {
  let previousIndex = -1;
  let result = 0;

  Array.from(romanNumber).forEach((char) => {
    const index = ROMAN_NUMBERS.indexOf(char);

    if (ARABIC_NUMBERS[previousIndex] < ARABIC_NUMBERS[index]) {
      result += ARABIC_NUMBERS[index] - ARABIC_NUMBERS[previousIndex] * 2;
    } else {
      result += ARABIC_NUMBERS[index];
    }

    previousIndex = index;
  });

  return String(result);
}

type ArabicOperand = '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | '10';
type RomanOperand = 'I' | 'II' | 'III' | 'IV' | 'V' | 'VI' | 'VII' | 'VIII' | 'IX' | 'X';
type Operation = '+' | '-' | '*' | '/';

/**
 * Вычисляет выражение с операндами от '1' до '10' включительно.
 *
 * @example calculateInArabicNumbers('9', '*', '9'); // -> '81'
 */
export function calculateInArabicNumbers(
  leftOperand: ArabicOperand,
  operation: Operation,
  rightOperand: ArabicOperand
): string {
  const left = Number.parseInt(leftOperand, 10);
  const right = Number.parseInt(rightOperand, 10);
  const result = {
    '+': left + right,
    '-': left - right,
    '*': left * right,
    '/': Math.trunc(left / right),
  }[operation];

  return String(result);
}

/**
 * Вычисляет выражение с операндами от 'I' до 'X' включительно.
 *
 * @example calculateInArabicNumbers('IX', '*', 'IX'); // -> 'LXXXI'
 */
export function calculateInRomanNumbers(
  leftOperand: RomanOperand,
  operation: Operation,
  rightOperand: RomanOperand
): string {
  const left = convertRomanNumberToArabicNumber(leftOperand);
  const right = convertRomanNumberToArabicNumber(rightOperand);
  const result = Number.parseInt(
    calculateInArabicNumbers(
      left as ArabicOperand,
      operation,
      right as ArabicOperand
    ),
    10
  );

  return result > 0 ? convertArabicNumberToRomanNumber(String(result)) : '';
}

type ParsedExpression = {
  leftOperand: ArabicOperand | RomanOperand;
  operation: Operation;
  rightOperand: ArabicOperand | RomanOperand;
  notation: 'arabic' | 'roman';
};

/**
 * Разбирает выражение на операнды, знак операции, систему счисления.
 *
 * @example parseExpression('9 * 9');
 * // -> { leftOperand: '9', operation: '*', rightOperand: '9', notation: 'arabic' }
 * @example parseExpression('IX * IX');
 * // -> { leftOperand: 'IX', operation: '*', rightOperand: 'IX', notation: 'roman' }
 * @example parseExpression(''); // -> null
 */
export function parseExpression(expression: string): ParsedExpression | null {
  const trimmedExpression = expression.trim();
  const arabicRegExp = /^([1-9]|10) *(\+|-|\*|\/) *([1-9]|10)$/;
  const arabicMatch = arabicRegExp.exec(trimmedExpression);
  const romanRegExp = /^(I|II|III|IV|V|VI|VII|VIII|IX|X) *(\+|-|\*|\/) *(I|II|III|IV|V|VI|VII|VIII|IX|X)$/;
  const romanMatch = romanRegExp.exec(trimmedExpression);

  if (arabicMatch !== null) {
    const [, leftOperand, operation, rightOperand] = arabicMatch;

    return {
      leftOperand: leftOperand as ArabicOperand,
      operation: operation as Operation,
      rightOperand: rightOperand as ArabicOperand,
      notation: 'arabic',
    };
  }

  if (romanMatch !== null) {
    const [, leftOperand, operation, rightOperand] = romanMatch;

    return {
      leftOperand: leftOperand as RomanOperand,
      operation: operation as Operation,
      rightOperand: rightOperand as RomanOperand,
      notation: 'roman',
    };
  }

  return null;
}

export default function calculator(expression: string): string {
  const parsedExpression = parseExpression(expression);

  if (parsedExpression !== null) {
    const { leftOperand, operation, rightOperand, notation } = parsedExpression;

    if (notation === 'arabic') {
      return calculateInArabicNumbers(
        leftOperand as ArabicOperand,
        operation,
        rightOperand as ArabicOperand
      );
    }

    if (notation === 'roman') {
      return calculateInRomanNumbers(
        leftOperand as RomanOperand,
        operation,
        rightOperand as RomanOperand
      );
    }
  }

  throw new RangeError();
}
