import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Card } from '../database';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent {
@Input() card: Card = {title: 'Title', description: 'Description', type: 'feature', columnID: 0};
@Output() eventHandler: EventEmitter<any> = new EventEmitter();
titleInput = false;
descriptionInput = false;

delete(){
  this.eventHandler.emit({type: 'delete', card: this.card});
}
}
