import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'checklist-finish-checklist',
  imports: [CommonModule],
  templateUrl: './finish-checklist.component.html',
  styleUrl: './finish-checklist.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true
})
export class FinishChecklistComponent {}
