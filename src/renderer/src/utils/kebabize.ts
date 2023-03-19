/**
 * any string in Pascal, camel, or any variation of the two to kebab-case
 * @link https://stackoverflow.com/questions/63116039/camelcase-to-kebab-case
 */
const kebabize = (str: string): string =>
  str.replace(/[A-Z]+(?![a-z])|[A-Z]/g, ($, ofs) => (ofs ? '-' : '') + $.toLowerCase())

export default kebabize
