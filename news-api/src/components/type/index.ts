export interface NewsArticle{
    author: string;
    source: { name: string};
    publishedAt: string;
    title: string;
    description: string;
    url: string;
    urlToImage: string;
}

export interface NewsSources{
    name: string;
    id: string;
}

export interface NewsResponse{
    articles?: NewsArticle[];
    sources?: NewsSources[]
}