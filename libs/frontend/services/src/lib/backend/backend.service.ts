import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DeleteResult } from 'typeorm';

@Injectable({
  providedIn: 'root',
})
export class BackendService {
  private apiUrl = 'http://localhost:3000/api/';
  private readonly httpClient = inject(HttpClient);

  /**
   * Executes a GET request to the backend API to a specific endpoint
   * @param url the endpoint to be targeted
   * @returns {Observable<never>} Observable with the result of the request
   */
  doGet<T>(url: string | undefined): Observable<T> {
    return this.httpClient.get<T>(this.apiUrl + url);
  }

  /**
   * Executes a POST request to the backend API to a specific endpoint
   * @param url the endpoint to be targeted
   * @param body the body to add to POST request
   * @returns {Observable<never>} Observable with the result of the request
   */
  doPost<T, K>(url: string | undefined, body: K): Observable<T> {
    return this.httpClient.post<T>(this.apiUrl + url, body, { withCredentials: true });
  }

  /**
   * Executes a DELETE request to the backend API to a specific endpoint
   * @param url the endpoint to be targeted
   * @returns {Observable<DeleteResult>} Observable with the result of the request
   */
  doDelete(url: string | undefined): Observable<DeleteResult> {
    return this.httpClient.delete<never>(this.apiUrl + url);
  }
}
