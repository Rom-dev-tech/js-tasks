  import '../sass/modul11.scss';
/**
 * You have current UTC. Write func for getting
 * 1. Days
 * 2. Hours
 * 3. Mins
 * 4. Seconds
 */

//* backgroundImage
document.body.style.backgroundImage = "url('https://i.ibb.co/3mThcXc/afternoon.jpg')";

// * Рефы
const Refs = {
  startBtn: document.getElementById('start'),
  stopBtn:document.getElementById('stop'),
}
// * Расчёт поиска (дни, часы, минуты, секунды)
const getDays = time => Math.floor(time / 1000 / 60 / 60 / 24);
const getHours = time => Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60 ));
const getMins = time =>  Math.floor((time % (1000 * 60 * 60)) / (1000 * 60 ));
const getSeconds = time =>  Math.floor((time % (1000 * 60)) / 1000); 

//* Разметка ==============
const template = (value, event) => `
<p class="clockface js-clockface">${event} starts</p>
<span class="clockface js-clockface" id="value">${value}</span>
`;

// * Событие которое настанет
const EVENT_DISC = 'New Year 2022';

// * Дата до которого времени считает таймер
const newYearDate = new Date('01/01/2022').getTime();

//* Add Zeros
function addZero(n) {
  return (parseInt(n, 10) < 10 ? '0' : '') + n;
}

// * Конструктор
function Timer({selector}) {
    let id = 0;
    document.querySelector(selector)
        .insertAdjacentHTML('beforeend', template('00:00:00:00', EVENT_DISC));

    const valueRef = document.querySelector(`${selector} #value`);

    const updateValue = (value) => {
        valueRef.textContent = value;
    }

    this.start = () => {
        if(id) {
            return;
        }
        id = setInterval(() => {
            const diff = newYearDate - Date.now();
            const days = getDays(diff);
            const hours = getHours(diff);
            const mins = getMins(diff);
            const seconds = getSeconds(diff);
            updateValue(`${addZero(days)} days ${addZero(hours)} hours ${addZero(mins)} mins ${addZero(seconds)} seconds`);
          
          // * Если событее прошло
          if (diff < 0) {
            clearInterval(id);
            Refs.startBtn.remove();
            Refs.stopBtn.remove();
                  document.querySelector(selector).innerHTML =`<p class="end">EXPIRED</p>`;
  }
        }, 100);
    };

    this.stop = () => {
        clearInterval(id);
        id = 0;
  }
}

// * Создаём Экземпляр ==================
/**
 * Create timer how many days:hours:minutes:seconds left to some date
 */
const timer = new Timer({selector: '#timer'});

// * Вешаем события на кнопки
Refs.startBtn
  .addEventListener('click', () => {
    timer.start()
    Refs.stopBtn.classList.remove('is-active')
    Refs.startBtn.classList.add('is-active')
  });
Refs.stopBtn
  .addEventListener('click', () => {
    timer.stop()
    Refs.startBtn.classList.remove('is-active')
    Refs.stopBtn.classList.add('is-active')
  });

// * Если необходимо запуск при открытии страницы (run)
// timer.start();