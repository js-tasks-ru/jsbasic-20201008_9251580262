/**
 * Компонент, который реализует таблицу
 * с возможностью удаления строк
 *
 * Пример одного элемента, описывающего строку таблицы
 *
 *      {
     *          name: '',
     *          age: 25,
     *          salary: '1000',
     *          city: 'Petrozavodsk'
     *   },
 *
 * @constructor
 */
/**
 * Компонент, который реализует таблицу
 * с возможностью удаления строк
 *
 * Пример одного элемента, описывающего строку таблицы
 *
 *      {
 *          name: 'Ilia',
 *          age: 25,
 *          salary: '1000',
 *          city: 'Petrozavodsk'
 *      },ы
 *
 * @constructor
 */
export default class UserTable {
  constructor(rows) {
    this.rows = rows;
    this.elem = document.createElement('table');
    this.render();
    this.delite();
  }

  render() {
    this.rows.forEach(item => {
      const { name, age, salary, city } = item;
      this.elem.insertAdjacentHTML('afterbegin', `
    <tr>
      <td>${name}</td>
      <td>${age}</td>
      <td>${salary}</td>
      <td>${city}</td>
      <td><button>X</button></td>
    </tr>
      `)
    })
  }

  delite() {
    const btn = [...this.elem.querySelectorAll('button')];
    btn.forEach(item => {
      item.addEventListener('click', (event) => {
        let tr = event.target.closest('tr');
        tr.remove();
      })
    })
  }
}
