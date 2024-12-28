import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { StatusBarSegment } from '@emerald/models';

@Component({
  selector: 'em-status-bar',
  imports: [],
  templateUrl: './status-bar.component.html',
  styleUrl: './status-bar.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
})
export class StatusBarComponent {
  segments = input.required<StatusBarSegment[]>();
}
