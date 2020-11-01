/*
 * Найти min/max в произвольной строке
 * @param   {string} str -  входные данные
 * @returns {{min:number, max:number}}  объект
 **/

function getMinMax(str) {
  str = str.split(',');
  str = str.map(item => item.trim());
  str = str.join(' ').split(' ');
  str = str.filter(item => Number(item));
  let max = Math.max(...str);
  let min = Math.min(...str);
  return {
    min,
    max,
  }
}
