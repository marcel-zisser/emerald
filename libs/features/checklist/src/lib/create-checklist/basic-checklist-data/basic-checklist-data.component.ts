import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatError, MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';

@Component({
  selector: 'checklist-basic-data',
  imports: [CommonModule, ReactiveFormsModule, MatError, MatFormField, MatInput, MatLabel],
  templateUrl: './basic-checklist-data.component.html',
  styleUrl: './basic-checklist-data.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true
})
export class BasicChecklistDataComponent {
  private readonly formBuilder = inject(FormBuilder);

  basicData: FormGroup;

  constructor() {
    this.basicData = this.formBuilder.group({
      title: ['', [Validators.required]],
      description: ['', [Validators.required]],
    })
  }

}
