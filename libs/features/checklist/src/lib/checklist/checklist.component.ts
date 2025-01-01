import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'checklist-checklist',
  imports: [],
  templateUrl: './checklist.component.html',
  styleUrl: './checklist.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true
})
export class ChecklistComponent {}
