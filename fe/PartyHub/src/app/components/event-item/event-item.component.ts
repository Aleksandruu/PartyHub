import { Component, Input } from '@angular/core';
import { EventItem } from 'src/app/types/eventItem.type';

@Component({
  selector: 'app-event-item',
  templateUrl: './event-item.component.html',
  styleUrl: './event-item.component.css',
})
export class EventItemComponent {
  @Input() eventItem!: EventItem;
}
