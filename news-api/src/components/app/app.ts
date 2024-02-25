import AppController from '../controller/controller';
import { AppView } from '../view/appView';
import { getElementAndType } from '../view/news/news';

class App {
    private _controller: AppController;
    private _view: AppView;
    constructor() {
        this._controller = new AppController();
        this._view = new AppView();
    }

    public start() {
        getElementAndType<HTMLElement>(document, '.sources').addEventListener('click', (e) =>
            this._controller.getNews(e, (data) => this._view.drawNews(data))
        );
        this._controller.getSources((data) => this._view.drawSources(data));
    }
}

export default App;
