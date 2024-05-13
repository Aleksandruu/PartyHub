import { Component, HostListener } from '@angular/core';
import { EventService } from 'src/app/services/event.service';

import { Ticket } from 'src/app/types/ticket.type';

@Component({
  selector: 'app-tickets-page',
  templateUrl: './tickets-page.component.html',
  styleUrl: './tickets-page.component.css',
})
export class TicketsPageComponent {
  tickets: Ticket[] = [];
  selectedTicket: Ticket | null = null;
  noTickets = false;

  constructor(private eventService: EventService) {}

  ngOnInit() {
    this.eventService.getTickets().subscribe((tickets: Ticket[]) => {
      this.tickets = tickets;
      if (!tickets) {
        this.noTickets = true;
      }
    });
  }
  showLargeQRCode(ticket: Ticket) {
    this.selectedTicket = ticket;
  }

  closeQR() {
    this.selectedTicket = null;
  }
}
