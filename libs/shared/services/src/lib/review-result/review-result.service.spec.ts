import { TestBed } from '@angular/core/testing';

import { ReviewResultService } from './review-result.service';

describe('ReviewService', () => {
  let service: ReviewResultService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReviewResultService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
