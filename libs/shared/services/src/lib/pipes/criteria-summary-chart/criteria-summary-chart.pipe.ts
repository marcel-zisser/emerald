import { Pipe, PipeTransform } from '@angular/core';
import { CriteriaSummary, StatusBarSegment } from '@emerald/models';

@Pipe({
  name: 'criteriaSummaryChart',
  standalone: true,
})
export class CriteriaSummaryChartPipe implements PipeTransform {
  transform(segments: CriteriaSummary): StatusBarSegment[] {
    const total = segments.TBD + segments.failed + segments.passed;
    return [
      {
        label: 'TBD',
        count: segments.TBD,
        width: (segments.TBD / total) * 100,
        color: 'gray',
      },
      {
        label: 'Fail',
        count: segments.failed,
        width: (segments.failed / total) * 100,
        color: 'red',
      },
      {
        label: 'Pass',
        count: segments.passed,
        width: (segments.passed / total) * 100,
        color: 'green',
      },
    ];
  }
}
