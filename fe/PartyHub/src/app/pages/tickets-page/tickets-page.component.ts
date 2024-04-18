import { Component } from '@angular/core';
import { Ticket } from 'src/app/types/ticket.type';

@Component({
  selector: 'app-tickets-page',
  templateUrl: './tickets-page.component.html',
  styleUrl: './tickets-page.component.css'
})
export class TicketsPageComponent {
  tickets: Ticket[] = [
    {
      ticketId: "ffbca2a4-1786-405a-a003-42ebc343f558",
      eventName: "Halloween Party",
      qrCode: null,
      eventDate: new Date("2024-04-01"),
      eventLocation: "Altfel Club Timisoara"
    }, {
      ticketId: "2d862607-ce5d-4b09-9e9d-b653d63a5b90",
      eventName: "PeTrecerea de pietoni",
      qrCode: null,
      eventDate: new Date("2024-04-14"),
      eventLocation: "Altfel Club Timisoara"
    }, {
      ticketId: "1a322716-92cf-475b-b415-4695d4148955",
      eventName: "Christmas Party",
      qrCode: null,
      eventDate: new Date("2024-04-04"),
      eventLocation: "Altfel Club Timisoara"
    }
  ]
}