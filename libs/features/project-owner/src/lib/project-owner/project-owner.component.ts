import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'project-project-owner',
  imports: [CommonModule],
  templateUrl: './project-owner.component.html',
  styleUrl: './project-owner.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProjectOwnerComponent {}
