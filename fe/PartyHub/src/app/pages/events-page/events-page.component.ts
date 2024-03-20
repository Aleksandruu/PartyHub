import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PATHS } from 'src/app/constants/paths';
import { EventService } from 'src/app/services/event.service';
import { EventPhoto } from 'src/app/types/eventPhoto.type';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-events-page',
  templateUrl: './events-page.component.html',
  styleUrls: ['./events-page.component.css'],
})
export class EventsPageComponent implements OnInit {
  event!: EventPhoto;
  noEvent = false;
  photoUrl!: SafeResourceUrl;

  constructor(
    private eventService: EventService,
    private router: Router,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    this.eventService.getEventPhoto().subscribe(
      (event: EventPhoto) => {
        this.event = event;
        this.photoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
          'data:image/jpg;base64,' + event.mainBanner
        );
      },
      (error: any) => {
        this.noEvent = true;
      }
    );
  }

  goToEvent(): void {
    this.router.navigate([PATHS.EVENT + '/' + this.event.id]);
  }
}
