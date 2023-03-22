/**
 * Takes a number or string and returns a CSS parsable size in px if passed a number a string goes right through
 * @param size number or string
 * @returns CSS parsable size in px if passed a number. String goes right through
 */
const parseSizes = (size: number | string): string =>
  typeof size === 'number' ? size + 'px' : size

export default parseSizes
