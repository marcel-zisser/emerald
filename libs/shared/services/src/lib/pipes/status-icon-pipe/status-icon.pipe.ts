import { Pipe, PipeTransform } from '@angular/core';
import { CriterionStatus } from '@emerald/models';

@Pipe({
  name: 'statusIcon',
  standalone: true,
})
export class StatusIconPipe implements PipeTransform {
  transform(value: CriterionStatus): string {
    switch (value) {
      case CriterionStatus.Pass:
        return 'check';
      case CriterionStatus.Fail:
        return 'close';
      case CriterionStatus.Pending:
        return 'schedule';
    }

    return '';
  }
}
