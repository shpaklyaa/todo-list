import { Component, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';

@Component({
  selector: 'app-modal',
  imports: [MatFormFieldModule, MatButtonModule, MatIconModule, ReactiveFormsModule],
  templateUrl: './modal.html',
  styleUrl: './modal.scss',
})
export class Modal {
  @Output() open = new EventEmitter<void>();
  form: FormGroup;

  constructor() {
    this.form = new FormGroup({
      'title': new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(20)]),
      'content': new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(40)])
    })
  }

  onOpen() {
    this.open.emit();
  }
}
