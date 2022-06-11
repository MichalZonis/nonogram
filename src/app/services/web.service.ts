import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http"

@Injectable({
  providedIn: 'root'
})
export class WebService {
  readonly ROOT_URL;

  constructor(private http: HttpClient) {
    this.ROOT_URL = "http://localhost:8000";
  }

  public get(uri: string) {
    
    return this.http.get(`${this.ROOT_URL}/${uri}`)
  }

  public post(uri: string, payload: Object) {
    return this.http.get(`${this.ROOT_URL}/${uri}`, payload)
  }

  public put(uri: string, payload: Object) {
    return this.http.get(`${this.ROOT_URL}/${uri}`, payload)
  }

  public delete(uri: string) {
    return this.http.get(`${this.ROOT_URL}/${uri}`)
  }

}
