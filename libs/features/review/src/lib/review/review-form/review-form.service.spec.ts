import { TestBed } from '@angular/core/testing';

import { ReviewFormService } from './review-form.service';

describe('ReviewFormService', () => {
  let service: ReviewFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReviewFormService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
