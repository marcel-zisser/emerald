import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { MatCard, MatCardHeader, MatCardTitle } from '@angular/material/card';
import { Checklist } from '@emerald/models';

@Component({
  selector: 'em-projects-overview',
  imports: [MatCard, MatCardHeader, MatCardTitle],
  templateUrl: './projects-overview.component.html',
  styleUrl: './projects-overview.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true
})
export class ProjectsOverviewComponent {
  projects = input.required<Checklist[]>();
}
