import { Pipe, PipeTransform } from '@angular/core';
import { CriterionStatus } from '@emerald/models';

@Pipe({
  name: 'criterionStatus',
  standalone: true,
})
export class CriterionStatusPipe implements PipeTransform {
  transform(status: CriterionStatus): string {
    switch (status) {
      case CriterionStatus.Pass:
        return 'Passed';
      case CriterionStatus.Fail:
        return 'Failed';
      case CriterionStatus.Pending:
        return 'Pending';
      case CriterionStatus.Evaluated:
        return 'Evaluated';
    }
  }
}
