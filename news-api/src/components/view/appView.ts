import News from './news/news';
import Sources from './sources/sources';
import { NewsResponse } from '../type';

export class AppView {
    _news: News;
    _sources: Sources;

    constructor() {
        this._news = new News();
        this._sources = new Sources();
    }

    public drawNews(data: NewsResponse): void {
        const values = data?.articles ? data?.articles : [];
        console.log(data);
        this._news.draw(values);
    }

    public drawSources(data: NewsResponse): void {
        const values = data?.sources ? data?.sources : [];
        this._sources.draw(values);
    }
}

export default AppView;
