/**
 * checkSpam
 * @param {string} str base
 * @returns {boolean}
 */
function checkSpam(str) {
  const spam1 = '1xBet'.toUpperCase(),
        spam2 = 'XXX'.toUpperCase();
        str = str.toUpperCase();
  if(str.includes(spam1) || str.includes(spam2)){
    return true
  }
  return false;  
}

