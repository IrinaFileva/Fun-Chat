import './news.css';
import { NewsArticle } from '../../type';
import { getElementAndType } from '../../utilities';

class News {
    public draw(data: NewsArticle[]) {
        const news: NewsArticle[] = data.length >= 10 ? data.filter((_item, idx) => idx < 10) : data;
        const fragment: DocumentFragment = document.createDocumentFragment();

        const newsItemTemp = document.querySelector('#newsItemTemp') as HTMLTemplateElement;
        news.forEach((item: NewsArticle, idx: number): void => {
            const newsClone = newsItemTemp.content.cloneNode(true) as HTMLElement;

            if (idx % 2) {
                getElementAndType<HTMLElement>(newsClone, '.news__item').classList.add('alt');
            }
            getElementAndType<HTMLElement>(newsClone, '.news__meta-photo').style.backgroundImage =
                `url(${item.urlToImage || 'img/news_placeholder.jpg'})`;
            getElementAndType<HTMLElement>(newsClone, '.news__meta-author').textContent =
                item.author || item.source.name;
            getElementAndType<HTMLElement>(newsClone, '.news__meta-date').textContent = item.publishedAt
                .slice(0, 10)
                .split('-')
                .reverse()
                .join('-');

            getElementAndType<HTMLElement>(newsClone, '.news__description-title').textContent = item.title;
            getElementAndType<HTMLElement>(newsClone, '.news__description-source').textContent = item.source.name;
            getElementAndType<HTMLElement>(newsClone, '.news__description-content').textContent = item.description;
            getElementAndType<HTMLElement>(newsClone, '.news__read-more a').setAttribute('href', item.url);

            fragment.append(newsClone);
        });

        getElementAndType<HTMLElement>(document, '.news').innerHTML = '';
        getElementAndType<HTMLElement>(document, '.news').appendChild(fragment);
    }
}

export default News;
