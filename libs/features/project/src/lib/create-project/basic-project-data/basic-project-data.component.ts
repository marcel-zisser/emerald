import {
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatError, MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';

@Component({
  selector: 'project-basic-data',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatError,
    MatFormField,
    MatInput,
    MatLabel,
  ],
  templateUrl: './basic-project-data.component.html',
  styleUrl: './basic-project-data.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
})
export class BasicProjectDataComponent {
  form = input.required<FormGroup>();

  private readonly formBuilder = inject(FormBuilder);
}
