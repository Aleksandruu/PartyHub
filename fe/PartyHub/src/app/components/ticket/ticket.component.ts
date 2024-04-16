import { Component, Input } from '@angular/core';
import { Ticket } from 'src/app/types/ticket.type';
@Component({
  selector: 'app-ticket',
  templateUrl: './ticket.component.html',
  styleUrl: './ticket.component.css'
})
export class TicketComponent {
  @Input() ticket!: Ticket;
  @Input() index!: number;

}
