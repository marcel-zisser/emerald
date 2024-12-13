import { TestBed } from '@angular/core/testing';

import { UserTableService } from './user-table.service';

describe('UserTableService', () => {
  let service: UserTableService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserTableService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
