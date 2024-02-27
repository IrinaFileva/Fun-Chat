import AppLoader from './appLoader';
import { NewsResponse, SourcesAndNews } from '../type';

class AppController extends AppLoader {
    public getSources(callback: (data: NewsResponse) => void): void {
        super.getResp(
            {
                endpoint: SourcesAndNews.Source,
            },
            callback
        );
    }

    public getNews(e: Event, callback: (data: NewsResponse) => void): void {
        let target: EventTarget | null = e.target;
        const newsContainer: EventTarget | null = e.currentTarget;
        if (newsContainer === null || newsContainer instanceof HTMLElement === false) {
            throw Error('Incorrect current target');
        }

        while (target !== newsContainer) {
            if (target === null || target instanceof HTMLElement === false) {
                throw Error('Incorrect target');
            }
            if (target.classList.contains('source__item')) {
                const sourceId: string | null = target.getAttribute('data-source-id');
                if (sourceId === null) {
                    throw Error('The attribute has no data');
                }
                if (newsContainer.getAttribute('data-source') !== sourceId) {
                    newsContainer.setAttribute('data-source', sourceId);
                    super.getResp(
                        {
                            endpoint: SourcesAndNews.News,
                            options: {
                                sources: sourceId,
                            },
                        },
                        callback
                    );
                }
                return;
            }
            target = target.parentNode;
        }
    }
}

export default AppController;
