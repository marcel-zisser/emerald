import { inject, Injectable, Signal, signal, WritableSignal } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { first, map, Observable, of } from 'rxjs';
import {
  ApiEndpoint,
  ApiRoutes, Feature, FeatureRoutes,
  LoginRequest,
  LoginResponse,
  RefreshTokenResponse,
  RegisterRequest,
  User
} from '@club-master/models';
import { BackendService } from '../backend';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private readonly router = inject(Router);
  private jwtHelper =inject(JwtHelperService);
  private backendService = inject(BackendService);
  private _isAuthenticated: WritableSignal<boolean> = signal(false);

  /**
   * Returns a read-only signal to determine the authentication status
   */
  get isAuthenticated(): Signal<boolean> {
    return this._isAuthenticated.asReadonly();
  }

  /**
   * Sends the backend request to register a given user
   * @param user the user to be registered
   */
  register(user: User): Observable<void> {
    const body: RegisterRequest = { user: user };

    return this.backendService.doPost<void, RegisterRequest>(
      `${ApiRoutes.get(ApiEndpoint.Register)}`,
      body
      )
  }

  /**
   * Logs in a user with the provided credentials
   * @param username the provided username
   * @param password the provided password
   * @returns {Observable<LoginResponse>} Observable with information about the success of the login
   */
  login(username: string, password: string): Observable<LoginResponse> {
    const body: LoginRequest = { username: username, password: password };

    return this.backendService.doPost<LoginResponse, LoginRequest>(
      `${ApiRoutes.get(ApiEndpoint.Login)}`,
      body
    );
  }

  /**
   * Method to set the isAuthenticated signal to true
   */
  authenticate(): void {
    this._isAuthenticated.set(true);
  }

  /**
   * Saves the token to the local storage
   * @param token the token to be set
   */
  saveToken(token: string): void {
    localStorage.setItem('auth_token', token);
    window.dispatchEvent( new StorageEvent(
      'storage',
      {
        key: 'auth_token',
        newValue: token
      }
    ));
  }

  /**
   * Retrieves the current JWT token from local storage
   * @returns {string} the current JWT token
   */
  getToken(): string | null {
    return localStorage.getItem('auth_token');
  }

  /**
   * Refreshes the JWT token by retrieving a new token with the refresh token
   * @returns {Observable<RefreshTokenResponse>} a new and valid JWT token response
   */
  refreshToken(): Observable<RefreshTokenResponse | null> {

    return this.backendService.doPost<RefreshTokenResponse, Record<string, never>>(
      `${ApiRoutes.get(ApiEndpoint.RefreshJWT)}`,
      {}
    ).pipe(
      first(),
      catchError(() => {
        this.logout();
        return of(null)
      })
    );
  }

  /**
   * Checks if the user is currently authenticated
   */
  checkAuthentication(): Observable<boolean> {
    const token = this.getToken();
    const isAuthenticated = token ? !this.jwtHelper.isTokenExpired(token) : false;

    if (!isAuthenticated) {
     return this.refreshToken().pipe(
       map(response => {
         if (response?.accessToken) {
           this.saveToken(response.accessToken);
           this._isAuthenticated.set(true);
           return true;
         } else {
           this.logout();
           return false;
         }
       })
     );
    }

    this._isAuthenticated.set(true);
    return of(true);
  }

  /**
   * Logs the current user out, by removing the JWT token
   */
  logout(): void {
    this._isAuthenticated.set(false);
    localStorage.removeItem('auth_token');

    this.backendService.doPost<never, Record<string, never>>(
      `${ApiRoutes.get(ApiEndpoint.Logout)}`,
      {}
    ).pipe(
      first()
    ).subscribe(() => {
      this.router.navigate([FeatureRoutes.get(Feature.Login)])
    });
  }
}
