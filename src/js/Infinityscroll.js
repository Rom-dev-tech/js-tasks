// https://www.smashingmagazine.com/2018/01/deferring-lazy-loading-intersection-observer-api/

// import './js/if';
// import './js/io';
import articlesTpl from '../templates/12-articles.hbs';
import NewsApiService from './news-service';
import '../sass/modul12.scss';

const refs = getRefs();
const newsApiService = new NewsApiService();

refs.searchForm.addEventListener('submit', onSearch);

function onSearch(e) {
  e.preventDefault();
  newsApiService.query = e.currentTarget.elements.query.value;

  if (newsApiService.query === '') {
    return alert('Введи что-то нормальное');
  }

  newsApiService.resetPage();
  clearArticlesContainer();
  newsApiService.fetchArticles().then(articles => {
    appendArticlesMarkup(articles);
    newsApiService.incrementPage();
  });
}

function appendArticlesMarkup(articles) {
  refs.articlesContainer.insertAdjacentHTML('beforeend', articlesTpl(articles));
}

function clearArticlesContainer() {
  refs.articlesContainer.innerHTML = '';
}

function getRefs() {
  return {
    searchForm: document.querySelector('.js-search-form'),
    articlesContainer: document.querySelector('.js-articles-container'),
    sentinel: document.querySelector('#sentinel'),
  };
}

const onEntry = entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting && newsApiService.query !== '') {
      // console.log('Пора грузить еще статьи' + Date.now());
      newsApiService.fetchArticles().then(articles => {
        appendArticlesMarkup(articles);
        newsApiService.incrementPage();
      });
    }
  });
};

const observer = new IntersectionObserver(onEntry, {
  rootMargin: '150px',
});
observer.observe(refs.sentinel);

//* =================== https://infinite-scroll.com/ ============='./js/if'======================================

// import InfiniteScroll from 'infinite-scroll';

// var unsplashID =
//   '9ad80b14098bcead9c7de952435e937cc3723ae61084ba8e729adb642daf0251';

// const infScroll = new InfiniteScroll('.container', {
//   responseType: 'text',
//   history: false,
//   path() {
//     return `https://newsapi.org/v2/everything?q=bitcoin&apiKey=bb47a995514a49758140b073ef1103f5`;
//   },
// });

// infScroll.loadNextPage();

// infScroll.on('load', (response, path) => {
//   console.log(JSON.parse(response));

//   тут по шаблну сделали строку с тегами
//   потом кинули в фрагмент
//   фрагмент передали в infScroll.appendItems(фоагмент)
// });

// const markup = '<p>qweqweqwe</p>';
// const fragment = new DocumentFragment();
// const d = document.createElement('div');
// fragment.innerHTML = markup;
// console.log(fragment);
// * ===========================================================================================================

//* =================== Typical Observer's registration ============='./js/io'==================================
/**
 * Typical Observer's registration
 */
// const callback = (entries, io) => {
//   entries.forEach(entry => {
//     if (entry.isIntersecting) {
//       console.log('Привет из колбека в forEach');
//       console.log(entry.target);
//     }
//   });
// };
// const options = {
//   // rootMargin: '100px',
//   // threshold: 0.5,
// };
// const observer = new IntersectionObserver(callback, options);

// const sentinel = document.querySelector('#sentinel');
// observer.observe(sentinel);
// * ===========================================================================================================
