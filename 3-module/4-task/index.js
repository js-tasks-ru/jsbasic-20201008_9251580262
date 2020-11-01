/**
 * showSalary
 * @param {Array} users - данные о пользователях
 * @param {number} age - максимальный возраст
 * @returns {string}
 */


function showSalary(users, age) {
  let result = '';
  users.forEach(item => {
    if (age >= item.age) {
      result += `${item.name}, ${item.balance}\n`
    }
  });
  result = result.slice(0, result.length - 1);
  return result;
}

