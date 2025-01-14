import { Pipe, PipeTransform } from '@angular/core';
import { CriterionStatus } from '@emerald/models';

@Pipe({
  name: 'criterionStatus',
})
export class CriterionStatusPipe implements PipeTransform {
  transform(status: CriterionStatus): string {
    switch (status) {
      case CriterionStatus.PASSED:
        return 'Passed';
        case CriterionStatus.FAILED:
          return 'Failed';
      case CriterionStatus.PENDING:
        return 'Pending';
    }
  }
}
