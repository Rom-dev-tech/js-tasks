import '../sass/modul12.scss';

// Массив Лошадей
const horses = ['Secretariat', 'Eclipse', 'West Australian', 'Flying Fox', 'Seabiscuit'];

// Переменная для нумерации заезда для таблицы
let raceCounter = 0;

// Рефы
const refs = {
  startBtn: document.querySelector('.js-start-race'),
  winnerField: document.querySelector('.js-winner'),
  progressField: document.querySelector('.js-progress'),
  tableBody: document.querySelector('.js-results-table > tbody'),
};

// Слушатель на кнопку
refs.startBtn.addEventListener('click', onStart);

// Старт
function onStart() {
  raceCounter += 1;
  const promises = horses.map(run);

  updateWinnerField('');
  updateProgressField('🤖 Заезд начался, ставки не принимаются!');
  determineWinner(promises);
  waitForAll(promises);
}

// * Promise.race([]) для ожидания первого выполнившегося промиса
function determineWinner(horsesP) {
  Promise.race(horsesP).then(({ horse, time }) => {
    updateWinnerField(`🎉 Победил ${horse}, финишировав за ${time}
    времени`);
    updateResultsTable({ horse, time, raceCounter });
  });
}

// * Promise.all([]) для ожидания всех промисов
function waitForAll(horsesP) {
  Promise.all(horsesP).then(() => {
    updateProgressField('📝 Заезд окончен, принимаются ставки.');
  });
}

// Обнавляет текст победителя
function updateWinnerField(message) {
  refs.winnerField.textContent = message;
}

// Обновляет текст прогресса
function updateProgressField(message) {
  refs.progressField.textContent = message;
}

// Записывает данные по забегу в таблицу
function updateResultsTable({ horse, time, raceCounter }) {
  const tr = `<tr><td>${raceCounter}</td><td>${horse}</td><td>${time}</td></tr>`;
  refs.tableBody.insertAdjacentHTML('beforeend', tr);
}

// Промис для одной лошади (создаёт промис)
function run(horse) {
  return new Promise(resolve => {
    const time = getRandomTime(2000, 3500);

    setTimeout(() => {
      resolve({ horse, time });
    }, time);
  });
}

// Случайное число
function getRandomTime(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}
