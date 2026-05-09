import { Component, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { Card } from '../../../types/card';

@Component({
  selector: 'app-todo-card',
  imports: [MatCardModule],
  templateUrl: './todo-card.html',
  styleUrl: './todo-card.scss',
})
export class TodoCard {
  @Input() card!: Card;
}
