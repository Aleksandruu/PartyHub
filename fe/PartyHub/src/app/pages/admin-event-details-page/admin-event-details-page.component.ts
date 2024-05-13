import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PATHS } from 'src/app/constants/paths';
import { EventService } from 'src/app/services/event.service';
import { EventStatistics } from 'src/app/types/eventStatistics.type';

@Component({
  selector: 'app-admin-event-details-page',
  templateUrl: './admin-event-details-page.component.html',
  styleUrl: './admin-event-details-page.component.css',
})
export class AdminEventDetailsPageComponent {
  eventStatistics!: EventStatistics;
  eventId!: string;

  constructor(
    private eventService: EventService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.eventId = params['id'];
      console.log(this.eventId);
      this.eventService
        .getEventStatistics(this.eventId)
        .subscribe((eventStatistics) => {
          this.eventStatistics = eventStatistics;
        });
    });
  }
  navigateToEditEvent() {
    this.router.navigate([PATHS.EDITEVENT + '/' + this.eventId]);
  }
}
