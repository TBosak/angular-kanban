import { Component } from '@angular/core';
import { moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import { Column, db } from './database';
import { Observable, liveQuery } from 'dexie';
import { of } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'app';
  columns: Observable<Column[]> = liveQuery(() => db.columns.toArray()) ?? of([]);

  addCard(column: any){
    column.cards.push({title: null ?? 'Title', description: 'Description', type: 'feature', columnID: column.id});
    db.columns.update(column.id, {cards: column.cards});
  }

  addColumn(){
    let input = prompt('Enter column title');
    db.columns.add({title: input ?? '', cards: [], titleInput: false});
  }

  async removeColumn(column: any){
    await db.columns.delete(column.id);
  }

  handleCard(event: any){
    if(event.type === 'delete'){
      this.removeCard(event);
    }
    if(event.type === 'update'){
      this.updateCard(event);
    }
  }

  removeCard(event: any){
    db.columns.get(event.card.columnID).then(column => {
      let cards = [...column?.cards ?? []];
        cards.splice(cards.indexOf(event.card), 1);
        db.columns.update(event.card.columnID, {cards: cards});
      })
  }

  updateCard(event: any){
    db.columns.get(event.card.columnID).then(column => {
      let cards = [...column?.cards ?? []];
      cards[cards.indexOf(event.card)] = event.card;
      db.columns.update(event.card.columnID, {cards: cards});
    })
  }

  drop(event: any) {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex);
        db.columns.update(event.container.id, {cards: event.container.data});
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);
        let cards = [...event.container.data];
        cards.forEach((card) => {
          card.columnID = event.container.id;
        })
        db.columns.update(event.container.id, {cards: cards});
        db.columns.update(event.previousContainer.id, {cards: event.previousContainer.data});
    }
  }
}
