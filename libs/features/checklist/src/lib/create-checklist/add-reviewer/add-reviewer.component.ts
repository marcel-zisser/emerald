import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'checklist-add-reviewer',
  imports: [CommonModule],
  templateUrl: './add-reviewer.component.html',
  styleUrl: './add-reviewer.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true
})
export class AddReviewerComponent {}
