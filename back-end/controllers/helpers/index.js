/**
 * Ceasar encrypt and decrypt string using a key
 * @param {string} str
 * @param {number} k
 * @param {'+' | '-'} operator
 * @returns string
 */
const ceasar = (str, k, operator) => {
  let ans = "";

  for (let i = 0; i < str.length; i++) {
    const code = {
      "+": () => str[i].charCodeAt() + (k % 26),
      "-": () => str[i].charCodeAt() - (k % 26),
    };
    const letterFound = String.fromCharCode(code[operator]());
    const letter = letterFound.match(/[^A-Za-z]/) ? " " : letterFound;
    ans += letter;
  }

  return ans;
};

module.exports = { ceasar };
