import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'project-reviewer',
  imports: [CommonModule],
  templateUrl: './reviewer.component.html',
  styleUrl: './reviewer.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ReviewerComponent {}
