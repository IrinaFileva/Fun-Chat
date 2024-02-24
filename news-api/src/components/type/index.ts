export interface NewsArticle{
    author: string;
    source: { name: string};
    publishedAt: string;
    title: string;
    description: string;
    url: string;
    urlToImage: string;
}

export interface NewSources{
    name: string;
    id: string;
}