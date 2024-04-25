import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { EventService } from 'src/app/services/event.service';
import { ApiResponse } from 'src/app/types/apiResponse.type';
import { EventItem } from 'src/app/types/eventItem.type';

@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.css'],
})
export class AdminPageComponent {
  events!: EventItem[];
  inviteForm!: FormGroup;
  discountForm!: FormGroup;
  discountCode!: string;

  constructor(private eventService: EventService, private router: Router) {}

  ngOnInit(): void {
    this.eventService
      .getEventsList()
      .subscribe((events) => (this.events = events));

    this.inviteForm = new FormGroup({
      event: new FormControl(),
      invites: new FormControl(),
    });

    this.discountForm = new FormGroup({
      event: new FormControl(),
      value: new FormControl(),
    });
  }

  selectedEvent!: number; // This variable will hold the selected event ID
  selectedEventId!: number;

  onEventSelected() {
    this.selectedEventId = this.selectedEvent;
  }

  generateInvites() {
    const invites = this.inviteForm.value.invites;
    const eventId = this.inviteForm.value.event;
    this.eventService.generateInvites(invites, eventId).subscribe();
  }

  generateDiscount() {
    const eventId = this.discountForm.value.event;
    const value = this.discountForm.value.value;
    this.eventService
      .generateDiscount(eventId, value)
      .subscribe((response: ApiResponse) => {
        this.discountCode = response.message;
      });
  }
}
