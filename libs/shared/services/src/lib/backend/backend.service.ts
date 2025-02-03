import { Inject, inject, Injectable, InjectionToken } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '@emerald/models';

export const API_URL_TOKEN = new InjectionToken<string>('apiUrl');

@Injectable({
  providedIn: 'root',
})
export class BackendService {
  private readonly httpClient = inject(HttpClient);

  constructor(@Inject(API_URL_TOKEN) public apiUrl: string) {}

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
   * @returns {Observable<User>} Observable with the result of the request
   */
  doDelete(url: string | undefined): Observable<User> {
    return this.httpClient.delete<never>(this.apiUrl + url);
  }

  /**
   * Executes a PUT request to the backend API to a specific endpoint
   * @param url the endpoint to be targeted
   * @param body the body to add to PUT request
   * @returns {Observable<never>} Observable with the result of the request
   */
  doPut<T, K>(url: string | undefined, body: K): Observable<T> {
    return this.httpClient.put<T>(this.apiUrl + url, body, { withCredentials: true });
  }

  /**
   * Executes a PATCH request to the backend API to a specific endpoint
   * @param url the endpoint to be targeted
   * @param body the body to add to PUT request
   * @returns {Observable<never>} Observable with the result of the request
   */
  doPatch<T, K>(url: string | undefined, body: K): Observable<T> {
    return this.httpClient.patch<T>(this.apiUrl + url, body, { withCredentials: true });
  }
}
