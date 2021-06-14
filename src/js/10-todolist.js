/**
 * TODO list with
 * 1. Saving data in local storage
 * 2. Removing btn
 */
//! Допилить

//* Импорты
import '../sass/common.scss';
import template from '../templates/todos.hbs';
import Storage from './storage-todolist';

//* Рефы
const refs = {
  form: document.querySelector('.form'),
  todoList: document.querySelector('.todo-list'),
};

//* Подгружаем список из памяти localStorage TODO List
const todoList = Storage.load() || [];

//* CallBack для слушателя
const handleSubmit = e => {
  e.preventDefault();

  todoList.push({
    id: Date.now(),
    value: e.target.elements.text.value,
  });

  e.target.elements.text.value = '';
  Storage.save(todoList);
  rederer(todoList);
};

//* Рендер страницы
const rederer = list => {
  refs.todoList.innerHTML = '';
  refs.todoList.insertAdjacentHTML(
    'beforeend',
    template({
      todos: list,
    }),
  );

  for (const item of list) {
    const button = document.querySelector(`#btn-${item.id}`);
    button.addEventListener('click', () => {
      const todoListItemIndex = todoList.findIndex(i => i.id === item.id);
      if (todoListItemIndex > -1) {
        todoList.splice(todoListItemIndex, 1);
        Storage.save(todoList);
        rederer(todoList);
      }
    });
  }
};

// Вызываем рендер страницы
rederer(todoList);

//* Вешаем слушатель
refs.form.addEventListener('submit', handleSubmit);