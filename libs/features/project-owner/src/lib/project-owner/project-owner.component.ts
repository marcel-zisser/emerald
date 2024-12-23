import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'project-project-owner',
  imports: [RouterOutlet],
  templateUrl: './project-owner.component.html',
  styleUrl: './project-owner.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
})
export class ProjectOwnerComponent {}
