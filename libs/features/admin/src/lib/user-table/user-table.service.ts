import { inject, Injectable } from '@angular/core';
import { BackendService } from '@emerald/services';
import { Observable } from 'rxjs';
import { ApiEndpoint, ApiRoutes, User } from '@emerald/models';

@Injectable({
  providedIn: 'root',
})
export class UserTableService {
  private readonly backendService = inject(BackendService);

  /**
   * Requests all users from the backend
   */
  getUsers(): Observable<User[]> {
    return this.backendService.doGet<User[]>(ApiRoutes.get(ApiEndpoint.User));
  }

  /**
   * Creates a new user
   */
  createUser(user: User): Observable<User> {
    return this.backendService.doPost<User, User>(
      ApiRoutes.get(ApiEndpoint.User),
      user
    );
  }

  /**
   * Updates an existing user
   */
  updateUser(user: User): Observable<User> {
    return this.backendService.doPut<User, User>(
      ApiRoutes.get(ApiEndpoint.User),
      user
    );
  }

  /**
   * Deletes the given user
   * @param user the user to delete
   */
  deleteUser(user: User): Observable<User> {
    return this.backendService.doDelete(
       `${ApiRoutes.get(ApiEndpoint.User)}/${user.uuid}`
    );
  }
}
