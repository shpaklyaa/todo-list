import { Component, signal } from '@angular/core';
import { Card } from '../../../types/card';
import { TodoCard } from '../../components/todo-card/todo-card';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import { Modal } from '../../components/modal/modal';

@Component({
  selector: 'app-main-page',
  imports: [TodoCard, MatButtonModule, MatIconModule, Modal],
  templateUrl: './main-page.html',
  styleUrl: './main-page.scss',
})
export class MainPage {
  cards: Card[] = [
    { id: '0', title: 'Написать to do', content: 'Learn the fundamentals of Angular.', endDate: '10.05.2026' },
    { id: '1', title: 'Покормить бэллу', content: 'Накормить и поменять воду', endDate: '09.05.2026' },
  ];

  isModalOpen = signal(false);

  protected openModalForm(): void {
    this.isModalOpen.set(true);
  }

  protected closeModalForm(): void {
    this.isModalOpen.set(false);
  }

  protected saveEditingCard(updatedCard: Card) {
    this.cards = this.cards.map(card => card.id === updatedCard.id ? updatedCard : card);
  }

  protected saveCard(card: Card) {
    this.cards.push(card);
    console.log('card pushed', card);
  }

  protected deleteCard(cardId: string) {
    this.cards = this.cards.filter(card => card.id !== cardId);
    console.log('card deleted id', cardId);
  }

}
