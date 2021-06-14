/**
 * Create counter with template
 */
'use strict';

import '../sass/counter.scss'
const template = value => `
<div class="counter">
  <button class="button decrement">-</button>
  <span class="value">${value}</span>
  <button class="button increment">+</button>
</div>
`;

function Counter({ selector, initialValue = 0, step = 1 }) {
  this.value = initialValue;

  document
    .querySelector(selector)
    .insertAdjacentHTML('beforeend', template(this.value));

  const refs = {
    decrement: document.querySelector(`${selector} .decrement`),
    increment: document.querySelector(`${selector} .increment`),
    value: document.querySelector(`${selector} .value`),
  };

  const render = () => {
    refs.value.textContent = this.value;
  };

  this.handleDecrement = () => {
    this.value -= step;
    render();
  };

  this.handleIncrement = () => {
    this.value += step;
    render();
  };

  refs.decrement.addEventListener('click', this.handleDecrement);
  refs.increment.addEventListener('click', this.handleIncrement);
}
// ===========================================================================
const counter1 = new Counter({
  selector: '.counter-1',
  initialValue: 10,
  step: 10,
});

const counter2 = new Counter({
  selector: '.counter-2',
  initialValue: 5,
  step: 5,
});

document
  .querySelector('#b1-minus')
  .addEventListener('click', counter2.handleDecrement);

document
  .querySelector('#b1-plus')
  .addEventListener('click', counter2.handleIncrement);