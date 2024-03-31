import { SERVER } from '../const/const';
import { Car, HTTPMethod, HeadersRequest, PathFile } from '../types/api';

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

  public async postDate<T>(nameCar: string, colorCar: string): Promise<T> {
    const date: Car = { name: nameCar, color: colorCar };
    const res: Response = await fetch(`${this.url}${this.pathGarage}`, {
      method: HTTPMethod.Post,
      body: JSON.stringify(date),
      headers: { 'Content-Type': HeadersRequest.ContentType },
    });
    const json: T = await res.json();
    return json;
  }

  public async putDate<T>(id: string, nameCar: string, colorCar: string): Promise<T> {
    const date: Car = { name: nameCar, color: colorCar };
    const res: Response = await fetch(`${this.url}${this.pathGarage}/${id}`, {
      method: HTTPMethod.Put,
      body: JSON.stringify(date),
      headers: { 'Content-Type': HeadersRequest.ContentType },
    });
    const json: T = await res.json();
    return json;
  }

  public async deleteDate(id: string): Promise<void> {
    await fetch(`${this.url}${this.pathGarage}/${id}`, {
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
