import { Component, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {provideNativeDateAdapter} from '@angular/material/core';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { Card } from '../../../types/card';

@Component({
  selector: 'app-modal',
  imports: [MatFormFieldModule, MatButtonModule, MatIconModule, ReactiveFormsModule, MatInputModule, MatDatepickerModule],
  templateUrl: './modal.html',
  styleUrl: './modal.scss',
  providers: [provideNativeDateAdapter()],
})
export class Modal {
  @Output() close = new EventEmitter<void>();
  @Output() save = new EventEmitter <Card>();
  form: FormGroup;

  constructor() {
    this.form = new FormGroup({
      'title': new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(20)]),
      'content': new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(40)]),
      'endDate': new FormControl('', [Validators.required])
    })
  }

  closeOnBackdropClick(event: MouseEvent) {
    if ((event.target as HTMLElement).classList.contains('backdrop')) {
      this.onClose();
    }
  }

  onClose() {
    this.close.emit();
  }

  onSave() {
    if(this.form.valid) {
      const newId = crypto.randomUUID();
      const formattedDate = this.form.value.endDate.toLocaleDateString('ru-RU');
      const newCard: Card = {
        id: newId,
        title: this.form.value.title!,
        content: this.form.value.content!,
        endDate: this.form.value.endDate!
      }
      this.save.emit(newCard);
      this.close.emit();
    }
  }
}
