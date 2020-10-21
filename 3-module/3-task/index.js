/**
 * @param {string} str
 * @returns {string}
 */
function camelize(str) {
  str = str.trim().split('-');
  str = str.map( item =>{
    (item === str[0]) ? item : item = item[0].toUpperCase() + item.slice(1);
    return item;
  })
  return str.join('');
}

camelize('background-color');
camelize('list-style-image');
camelize('-webkit-transition');