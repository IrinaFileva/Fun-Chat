import { HTTPMethod, ApiKey, RequestParams, NewsResponse, SourcesAndNews, ErrorNumber } from '../type';

class Loader {
    private _baseLink: string;
    private _options: Pick<ApiKey, 'apiKey'>;

    constructor(baseLink: string, options: Pick<ApiKey, 'apiKey'>) {
        this._baseLink = baseLink;
        this._options = options;
    }

    public getResp(
        { endpoint, options = {} }: RequestParams,
        callback: (data: NewsResponse) => void = () => console.error('No callback for GET response')
    ): void {
        this.load(HTTPMethod.Get, endpoint, callback, options);
    }

    private errorHandler(res: Response): Response {
        if (!res.ok) {
            if (res.status === ErrorNumber.Unauthorized || res.status === ErrorNumber.NotFound)
                console.log(`Sorry, but there is ${res.status} error: ${res.statusText}`);
            throw Error(res.statusText);
        }

        return res;
    }

    private makeUrl(options: Record<string, string>, endpoint: SourcesAndNews): string {
        const urlOptions: Record<string, string> = { ...this._options, ...options };
        let url: string = `${this._baseLink}${endpoint}?`;

        Object.keys(urlOptions).forEach((key: string) => {
            url += `${key}=${urlOptions[key]}&`;
        });

        return url.slice(0, -1);
    }

    private load(
        method: HTTPMethod,
        endpoint: SourcesAndNews,
        callback: (data: NewsResponse) => void,
        options: Record<string, string> = {}
    ): void {
        fetch(this.makeUrl(options, endpoint), { method })
            .then(this.errorHandler)
            .then((res: Response) => res.json())
            .then((data: NewsResponse) => callback(data))
            .catch((err: string) => console.error(err));
    }
}

export default Loader;
