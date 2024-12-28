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
    let tbd = 0;

    results.forEach((criterion) => {
      switch (criterion.status) {
        case CriterionStatus.Pass:
          passed += 1;
          break;
        case CriterionStatus.Fail:
          failed += 1;
          break;
        default:
          tbd += 1;
      }
    });

    return {
      passed: passed,
      failed: failed,
      TBD: tbd
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
      return reviewResult.status !== CriterionStatus.TBD;
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
