import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PATHS } from 'src/app/constants/paths';
import { EventService } from 'src/app/services/event.service';
import { EventItem } from 'src/app/types/eventItem.type';

@Component({
  selector: 'app-events-list-page',
  templateUrl: './events-list-page.component.html',
  styleUrl: './events-list-page.component.css',
})
export class EventsListPageComponent implements OnInit {
  events!: EventItem[];

  constructor(private eventService: EventService, private router: Router) {}

  ngOnInit(): void {
    this.eventService
      .getEventsList()
      .subscribe((events) => (this.events = events));
  }

  navigateToEventDetailsPage(id: string): void {
    this.router.navigate([PATHS.EVENTDETAILSADMIN + '/' + id]);
  }
}
