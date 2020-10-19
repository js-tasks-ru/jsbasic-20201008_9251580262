/**
 * Проверяем объект obj на пустоту
 * @param {Object} obj
 * @returns {Boolean}
 */
function isEmpty(obj) {
  let result = Object.values(obj);
  if(result.length > 0){
    return false;
  } else{
    return true;
  } 
}

