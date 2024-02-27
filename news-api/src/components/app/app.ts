import AppController from '../controller/controller';
import { AppView } from '../view/appView';
import { getElementAndType } from '../utilities';
import { NewsResponse } from '../type';

class App {
    private _controller: AppController;
    private _view: AppView;
    constructor() {
        this._controller = new AppController();
        this._view = new AppView();
    }

    public start() {
        getElementAndType<HTMLElement>(document, '.sources').addEventListener('click', (e: MouseEvent): void =>
            this._controller.getNews(e, (data: NewsResponse): void => this._view.drawNews(data))
        );
        this._controller.getSources((data: NewsResponse): void => this._view.drawSources(data));
    }
}

export default App;
