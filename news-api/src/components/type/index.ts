export interface NewsArticle {
    author: string;
    source: { name: string };
    publishedAt: string;
    title: string;
    description: string;
    url: string;
    urlToImage: string;
}

export interface NewsSources {
    name: string;
    id: string;
}

export interface NewsResponse {
    articles?: NewsArticle[];
    sources?: NewsSources[];
}

export enum HTTPMethod {
    Get = 'GET',
}

export interface ApiKey {
    apiKey: Readonly<string>;
}

export enum SourcesAndNews {
    Source = 'sources',
    News = 'everything',
}

export interface RequestParams {
    endpoint: SourcesAndNews;
    options?: Record<string, string>;
}

export enum ErrorNumber {
    Unauthorized = 401,
    NotFound = 404,
}
