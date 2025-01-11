import { inject, Injectable, Signal, signal } from '@angular/core';
import { BackendService } from '@emerald/services';
import {
  ApiEndpoint,
  ApiRoutes,
  CriterionReviewRequest,
  Review,
  ReviewResult,
} from '@emerald/models';
import { first } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Injectable()
export class ReviewFormService {
  private readonly backendService = inject(BackendService);
  private readonly activatedRoute = inject(ActivatedRoute);

  private readonly reviewId = this.activatedRoute.snapshot.params['reviewId'];

  private _review = signal<Review | undefined>(undefined);

  constructor() {
    this.backendService
      .doGet<Review>(`${ApiRoutes.get(ApiEndpoint.Review)}/${this.reviewId}`)
      .pipe(first())
      .subscribe((review) => {
        this._review.set(review);
      });
  }

  /**
   * Gets a review by uuid
   * @returns { Review } the review with the specified uuid
   */
  getReview(): Signal<Review | undefined> {
    return this._review.asReadonly();
  }

  reviewCriterion(request: CriterionReviewRequest) {
    this.backendService
      .doPut<ReviewResult, CriterionReviewRequest>(
        ApiRoutes.get(ApiEndpoint.ReviewResult),
        request
      )
      .pipe(first())
      .subscribe((updatedResult) => {
        this._review.update((review) => {
          const index = review?.results?.findIndex(
            (result) =>
              result.criterionId === request.criterionId &&
              result.reviewId === request.reviewId
          );

          if (index !== undefined && index !== -1 && review?.results?.[index]) {
            review.results[index] = {
              ...review.results[index],
              status: updatedResult.status,
              comments: updatedResult.comments,
            } satisfies ReviewResult;
          }

          return review;
        });
      });
  }
}
