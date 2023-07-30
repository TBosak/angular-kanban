import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { Card } from '../database';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit{
@Input() card: Card = {title: 'Title', description: 'Description', type: 'feature', columnID: 0};
backupCard!: Card;
@Output() eventHandler: EventEmitter<any> = new EventEmitter();
editBlock = false;
titleInput = false;
descriptionInput = false;

ngOnInit(): void {
  this.backupCard = {...this.card};
}

delete(){
  this.eventHandler.emit({type: 'delete', card: this.card});
}

update(){
  this.eventHandler.emit({type: 'update', card: this.card});
  this.backupCard = {...this.card};
  this.editBlock = false;
}

cancel(){
  this.card = {...this.backupCard};
  this.editBlock = false;
}

}
