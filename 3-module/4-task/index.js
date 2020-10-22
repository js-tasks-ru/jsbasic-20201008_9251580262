/**
 * showSalary
 * @param {Array} users - данные о пользователях
 * @param {number} age - максимальный возраст
 * @returns {string}
 */


let user1 = {
  "balance": "$1,825.65",
  "picture": "https://placehold.it/32x32",
  "age": 21,
  "name": "Golden Branch",
  "gender": "male",
  "greeting": "Hello, Golden Branch! You have 7 unread messages.",
  "favouriteFruit": "banana"
};

let user2 = {
  "balance": "$1,490.15",
  "picture": "https://placehold.it/32x32",
  "age": 21,
  "name": "Duncan Randall",
  "gender": "male",
  "greeting": "Hello, Duncan Randall! You have 7 unread messages.",
  "favouriteFruit": "banana"
};

let users = [user1, user2];

function showSalary(users, age) {
  let result = '';
  users.forEach(item => {
    if(age >= item.age){
      result += `${item.name}, ${item.balance}\n`
    }
  }); 
  result = result.slice(0, result.length - 1);
  return result;
}

let result = showSalary(users, 40);
