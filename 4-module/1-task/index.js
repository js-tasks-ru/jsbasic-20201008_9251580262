/**
 * Генерация HTML списка друзей
 * @param {Object[]} friends
 * @return {HTMLUListElement}
 */
function makeFriendsList(friends) {
  const ul = document.createElement('ul');
  document.body.insertAdjacentElement('afterbegin', ul);
  friends.forEach(item => {
    ul.insertAdjacentHTML('beforebegin', `<li>${item.firstName} ${item.lastName}</li>`);
  });
  return ul;
}
