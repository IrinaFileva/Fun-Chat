import { SERVER } from '../const/const';
import { HTTPMethod, HeadersRequest, PathFile } from '../types/api';

export class Api {
  url: string;

  pathGarage: string;

  pathWinners: string;

  pathEngine: string;

  constructor() {
    this.url = SERVER;
    this.pathGarage = PathFile.Garage;
    this.pathWinners = PathFile.Winners;
    this.pathEngine = PathFile.Engine;
  }

  public async getDate<T>(path: string): Promise<T> {
    const res: Response = await fetch(`${this.url}${path}`);
    const json: T = await res.json();
    return json;
  }

  public async postDate<T>(obj: T, path: string): Promise<T> {
    const date: T = obj;
    const res: Response = await fetch(`${this.url}${path}`, {
      method: HTTPMethod.Post,
      body: JSON.stringify(date),
      headers: { 'Content-Type': HeadersRequest.ContentType },
    });
    const json: T = await res.json();
    return json;
  }

  public async putDate<T>(obj: T, id: string, path: string): Promise<T> {
    const date: T = obj;
    const res: Response = await fetch(`${this.url}${path}/${id}`, {
      method: HTTPMethod.Put,
      body: JSON.stringify(date),
      headers: { 'Content-Type': HeadersRequest.ContentType },
    });
    const json: T = await res.json();
    return json;
  }

  public async deleteDate(id: string, path: string): Promise<void> {
    await fetch(`${this.url}${path}/${id}`, {
      method: HTTPMethod.Delete,
    });
  }

  public async pathDateJson<T>(id: string, status: string): Promise<T> {
    const res: Response = await fetch(`${this.url}${this.pathEngine}?${id}&${status}`, {
      method: HTTPMethod.Patch,
    });
    const json: T = await res.json();
    return json;
  }

  public async pathDareResponse(id: string, status: string): Promise<Response> {
    const res: Response = await fetch(`${this.url}${this.pathEngine}?${id}&${status}`, {
      method: HTTPMethod.Patch,
    });
    return res;
  }
}
