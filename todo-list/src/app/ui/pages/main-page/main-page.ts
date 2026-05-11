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
  cards = signal<Card[]>([
    { id: '0', title: 'Написать to do', content: 'Learn the fundamentals of Angular.', endDate: '10.05.2026' },
    { id: '1', title: 'Покормить бэллу', content: 'Накормить и поменять воду', endDate: '09.05.2026' },
  ]);

  isModalOpen = signal(false);

  public openModalForm(): void {
    this.isModalOpen.set(true);
  }

  public closeModalForm(): void {
    this.isModalOpen.set(false);
  }

  public saveEditingCard(updatedCard: Card) {
    this.cards.set(this.cards().map(card => card.id === updatedCard.id ? updatedCard : card));
  }

  public saveCard(card: Card) {
    this.cards.set([...this.cards(), card]);
    console.log('card pushed', card);
  }

  public deleteCard(cardId: string) {
    this.cards.set(this.cards().filter(card => card.id !== cardId));
    console.log('card deleted id', cardId);
  }

}
