import { ChangeDetectionStrategy, Component, inject, Signal } from '@angular/core';
import { ChecklistTableComponent } from '@emerald/components';
import { BackendService } from '@emerald/services';
import { ApiEndpoint, ApiRoutes, Checklist } from '@emerald/models';
import { first } from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'checklist-checklist',
  imports: [
    ChecklistTableComponent
  ],
  templateUrl: './checklist.component.html',
  styleUrl: './checklist.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true
})
export class ChecklistComponent {
  private readonly backendService = inject(BackendService);

  protected checklists: Signal<Checklist[]>;

  constructor() {
    this.checklists = toSignal(
      this.backendService.doGet<Checklist[]>(ApiRoutes.get(ApiEndpoint.Checklist)).pipe(
        first()
      ),
      { initialValue: [] }
    );
  }
}
