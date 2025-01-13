import { computed, inject, Injectable, Signal, signal } from '@angular/core';
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
import { cloneDeep } from 'lodash';

@Injectable()
export class ReviewFormService {
  private readonly backendService = inject(BackendService);
  private readonly activatedRoute = inject(ActivatedRoute);

  private readonly reviewId = this.activatedRoute.snapshot.params['reviewId'];

  private _review = signal<Review | undefined>(undefined);
  private _results = computed<Map<string | undefined, ReviewResult>>(() => {
    return new Map<string | undefined, ReviewResult>(this._review()?.results?.map(result => [result?.criterionId, result]));
  });

  constructor() {
    this.backendService
      .doGet<Review>(`${ApiRoutes.get(ApiEndpoint.Review)}/${this.reviewId}`)
      .pipe(first())
      .subscribe((review) => {
        this._review.set(review);
      });
  }

  /**
   * Gets a review
   * @returns { Review } the review
   */
  getReview(): Signal<Review | undefined> {
    return this._review.asReadonly();
  }

  /**
   * Gets the review results
   * @returns { Map<string | undefined, ReviewResult> } the review results
   */
  getResults(): Signal<Map<string | undefined, ReviewResult>> {
    return this._results;
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
          const newReview = cloneDeep(review);

          const index = newReview?.results?.findIndex(
            (result) =>
              result.criterionId === request.criterionId &&
              result.reviewId === request.reviewId
          );

          if (index !== undefined && index !== -1 && newReview?.results?.[index]) {
            newReview.results[index] = {
              ...newReview.results[index],
              status: updatedResult.status,
              comments: updatedResult.comments,
            } satisfies ReviewResult;
          }

          return newReview;
        });
      });
  }
}
