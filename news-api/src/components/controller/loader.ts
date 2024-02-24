import { HTTPMethod, ApiKey, RequestParams, NewsResponse, SourcesAndNews, ErrorNumber } from '../type';

class Loader {
    _baseLink: Partial<string>;
    _options: Pick<ApiKey, 'apiKey'>;

    constructor(baseLink: Partial<string>, options: Pick<ApiKey, 'apiKey'>) {
        this._baseLink = baseLink;
        this._options = options;
    }

    getResp(
        { endpoint, options = {} }: RequestParams,
        callback: (data: NewsResponse) => void = () => console.error('No callback for GET response')
    ): void {
        this.load(HTTPMethod.Get, endpoint, callback, options);
    }

    errorHandler(res: Response): Response {
        if (!res.ok) {
            if (res.status === ErrorNumber.Unauthorized || res.status === ErrorNumber.NotFound)
                console.log(`Sorry, but there is ${res.status} error: ${res.statusText}`);
            throw Error(res.statusText);
        }

        return res;
    }

    makeUrl(options: Record<string, string>, endpoint: SourcesAndNews) {
        const urlOptions: Record<string, string> = { ...this._options, ...options };
        let url: string = `${this._baseLink}${endpoint}?`;

        Object.keys(urlOptions).forEach((key) => {
            url += `${key}=${urlOptions[key]}&`;
        });

        return url.slice(0, -1);
    }

    load(
        method: HTTPMethod,
        endpoint: SourcesAndNews,
        callback: (data: NewsResponse) => void,
        options: Record<string, string> = {}
    ) {
        fetch(this.makeUrl(options, endpoint), { method })
            .then(this.errorHandler)
            .then((res) => res.json())
            .then((data: NewsResponse) => callback(data))
            .catch((err: string) => console.error(err));
    }
}

export default Loader;
