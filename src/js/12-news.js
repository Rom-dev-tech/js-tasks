/*
 * - Пагинация
 *   - страница и кол-во на странице
 * - Загружаем статьи при сабмите формы
 * - Загружаем статьи при нажатии на кнопку «Загрузить еще»
 * - Обновляем страницу в параметрах запроса
 * - Рисуем статьи
 * - Сброс значения при поиске по новому критерию
 *
 * https://newsapi.org/
 * 4330ebfabc654a6992c2aa792f3173a3
 * http://newsapi.org/v2/everything?q=cat&language=en&pageSize=5&page=1
 */

// imports
import articlesTpl from '../templates/12-articles.hbs';
import '../sass/modul12.scss';
import NewsApiService from './12-news-service';
import LoadMoreBtn from './12-load-more-btn';

// refs
const refs = {
  searchForm: document.querySelector('.js-search-form'),
  articlesContainer: document.querySelector('.js-articles-container'),
};

// Class for button
const loadMoreBtn = new LoadMoreBtn({
  selector: '[data-action="load-more"]',
  hidden: true,
});

// class for Api server
const newsApiService = new NewsApiService();

// Lisiner
refs.searchForm.addEventListener('submit', onSearch);
loadMoreBtn.refs.button.addEventListener('click', fetchArticles);

// Submit
function onSearch(e) {
  e.preventDefault();

  newsApiService.query = e.currentTarget.elements.query.value;

  if (newsApiService.query === '') {
    return alert('Введи что-то нормальное');
  }

  loadMoreBtn.show();
  newsApiService.resetPage();
  clearArticlesContainer();
  fetchArticles();
}

// loadMoreBtn
function fetchArticles() {
  loadMoreBtn.disable();
  newsApiService.fetchArticles().then(articles => {
    appendArticlesMarkup(articles);
    loadMoreBtn.enable();
  });
}

// Markup
function appendArticlesMarkup(articles) {
  refs.articlesContainer.insertAdjacentHTML('beforeend', articlesTpl(articles));
}

// clear markup
function clearArticlesContainer() {
  refs.articlesContainer.innerHTML = '';
}