export interface Car {
  name: string;
  color: string;
  id?: string;
}

export enum HTTPMethod {
  Get = 'GET',
  Post = 'POST',
  Put = 'PUT',
  Delete = 'DELETE',
  Patch = 'PATCH',
}

export interface Speed {
  distance: number;
  velocity: number;
}

export enum EngineStatus {
  Drive = 'drive',
  Started = 'started',
  Stopped = 'stopped',
}

export enum PathFile {
  Engine = '/engine',
  Garage = '/garage',
  Winners = '/winners',
}

export enum RequestParam {
  Id = 'id=',
  Limit = '_limit=',
  Page = '_page=',
  Status = 'status=',
}

export interface ResponseOfDrive {
  ok: { success: boolean };
}

export enum HeadersRequest {
  ContentType = 'application/json',
}

export interface Winner {
  id?: number;
  wins: number;
  time: number;
}

export enum ParamWinner {
  Id = 'id=',
  Page = '_page=',
  limit = '_limit=',
  Sort = '_sort=',
}
