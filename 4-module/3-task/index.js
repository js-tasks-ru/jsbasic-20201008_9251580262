/**
 * Метод устанавливает необходимые по условию аттрибуты таблице
 * @param {Element} table
 */
function highlight(table) {
  for (let i = 0; i < table.rows.length; i++) {
    const columns = [...table.rows[i].cells];

    columns.forEach(item => {
      if (item.dataset.available === 'true') {
        item.parentElement.classList.add('available');
      } else if (item.dataset.available === 'false') {
        console.dir(item);
        item.parentElement.classList.add('unavailable');
      } else if (item.cellIndex === 3 && item.dataset.available === undefined && item.textContent !== 'Status') {
        item.parentElement.setAttribute('hidden', '');
      } else if (item.cellIndex === 2 && item.textContent === 'm') {
        item.parentElement.classList.add('male');
      } else if (item.cellIndex === 2 && item.textContent === 'f') {
        item.parentElement.classList.add('female');
      } else if (item.cellIndex === 1 && Number(item.textContent) < 18) {
        item.parentElement.style.textDecoration = 'line-through';
      }
    });
  }
}
