import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'project-finish-project',
  imports: [CommonModule],
  templateUrl: './finish-project.component.html',
  styleUrl: './finish-project.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true
})
export class FinishProjectComponent {}
