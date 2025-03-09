/**
 * Вычислить сумму двух чисел
 *
 * @param {number} a - первое число
 * @param {number} b - второе целое
 * @return {number} сумма чисел a и b
 */
export function sum(a, b) {
  if (isNaN(a)) {
    a = 0
  }
  if (isNaN(b)) {
    b = 0
  }
  return a + b
}
