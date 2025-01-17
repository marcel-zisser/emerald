import { Pipe, PipeTransform } from '@angular/core';
import { CriteriaSummary, StatusBarSegment } from '@emerald/models';

@Pipe({
  name: 'criteriaSummaryChart',
  standalone: true,
})
export class CriteriaSummaryChartPipe implements PipeTransform {
  transform(segments: CriteriaSummary): StatusBarSegment[] {
    const total = segments.pending + segments.failed + segments.passed;
    return [
      {
        label: 'Pass',
        count: segments.passed,
        width: (segments.passed / total) * 100,
        color: 'green',
      },
      {
        label: 'Fail',
        count: segments.failed,
        width: (segments.failed / total) * 100,
        color: 'firebrick',
      },
      {
        label: 'TBD',
        count: segments.pending,
        width: (segments.pending / total) * 100,
        color: 'grey',
      }
    ];
  }
}
