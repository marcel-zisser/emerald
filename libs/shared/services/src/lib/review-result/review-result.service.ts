import { Injectable } from '@angular/core';
import { CriteriaSummary, CriterionStatus, ReviewResult, ReviewSummary } from '@emerald/models';

@Injectable({
  providedIn: 'root'
})
export class ReviewResultService {

  /**
   * Retrieves the criterion summary from the review results
   * @param results the review results
   * @returns {CriteriaSummary} the criterion summary
   */
  getCriterionSummary(results: ReviewResult[]): CriteriaSummary {
    let passed = 0;
    let failed = 0;
    let pending = 0;

    results.forEach((criterion) => {
      switch (criterion.status) {
        case CriterionStatus.PASSED:
          passed += 1;
          break;
        case CriterionStatus.FAILED:
          failed += 1;
          break;
        default:
          pending += 1;
      }
    });

    return {
      passed: passed,
      failed: failed,
      pending: pending
    } satisfies CriteriaSummary;
  }

  /**
   * Retrieves the review summary from the review results
   * @param results the review results
   * @returns {CriteriaSummary} the review summary
   */
  getReviewSummary(results: ReviewResult[]): ReviewSummary {
    let completed = 0;
    let uncompleted = 0;

    const complete = results.every((reviewResult) => {
      return reviewResult.status !== CriterionStatus.PENDING;
    });

    if (complete) {
      completed += 1;
    } else {
      uncompleted += 1;
    }

    return {
      completed: completed,
      uncompleted: uncompleted,
    } satisfies ReviewSummary;
  }
}
