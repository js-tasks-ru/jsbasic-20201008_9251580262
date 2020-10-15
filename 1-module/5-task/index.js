/**
 * truncate
 * @param {string} str
 * @param {number} maxlength
 * @returns {string}
 */
function truncate(str, maxlength) {
  (str.length > maxlength) ? str = str.slice(0, maxlength - 1) + '…' : str = str;
   return str;
}