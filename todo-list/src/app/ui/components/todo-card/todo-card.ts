import { Component, Input, EventEmitter, Output, signal } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { Card } from '../../../types/card';
import { MatIcon } from '@angular/material/icon';
import { FormGroup, FormControl, Validators, ReactiveFormsModule, ControlEvent } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {provideNativeDateAdapter} from '@angular/material/core';
import {MatDatepickerModule} from '@angular/material/datepicker';

@Component({
  selector: 'app-todo-card',
  imports: [MatCardModule, MatIcon, ReactiveFormsModule, MatInputModule, 
    MatFormFieldModule, MatButtonModule, MatIconModule, MatDatepickerModule  ],
  templateUrl: './todo-card.html',
  styleUrl: './todo-card.scss',
  providers: [provideNativeDateAdapter()]
})
export class TodoCard {
  @Input() card!: Card;
  @Output() delete = new EventEmitter<string>;
  @Output() save = new EventEmitter<Card>;
  isEditing = signal(false);

  form: FormGroup;

  constructor() {
    this.form = new FormGroup({
      'title': new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(20)]),
      'content': new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(40)]),
      'endDate': new FormControl('', [Validators.required])
    })
  }

  onDelete() {
    this.delete.emit(this.card.id);
  }

  onClose() {
    this.isEditing.set(false);
  }

  onSave() {
    if(this.form.valid) {
      const updatedCard: Card = {
        ...this.card,
        title: this.form.value.title.trim(),
        content: this.form.value.content.trim(),
        endDate: this.form.value.endDate
      }
      this.save.emit(updatedCard);
      this.onClose();
    }
  }

  startEditing() {
    this.form.reset({
      title: this.card.title,
      content: this.card.content,
      endDate: this.card.endDate
    })
    this.isEditing.set(true);
  }

  cancelEditing() {
    this.form.reset();
    this.onClose();
  }
}
