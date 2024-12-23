import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  inject,
} from '@angular/core';
import {
  MatCard,
  MatCardContent,
  MatCardHeader,
  MatCardTitle,
} from '@angular/material/card';
import { AuthenticationService } from '@emerald/authentication';
import { Checklist } from '@emerald/models';
import { ChecklistService } from '@emerald/services';

@Component({
  selector: 'em-checklist-overview',
  imports: [MatCard, MatCardHeader, MatCardTitle, MatCardContent],
  templateUrl: './checklist-overview.component.html',
  styleUrl: './checklist-overview.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
})
export class ChecklistOverviewComponent {
  private readonly authenticationService = inject(AuthenticationService);
  private readonly checklistService = inject(ChecklistService);

  private readonly token = this.authenticationService.getDecodedToken();

  protected checklists = computed<Checklist[]>(() =>
    this.checklistService
      .checklists()
      .filter((checklist) => checklist.ownerId === this.token?.sub)
  );
}
