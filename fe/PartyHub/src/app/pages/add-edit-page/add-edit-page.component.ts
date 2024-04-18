import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { EventDetails } from 'src/app/types/event.type';
import { EventService } from 'src/app/services/event.service';
import { ActivatedRoute, Router } from '@angular/router';
import { PATHS } from 'src/app/constants/paths';

@Component({
  selector: 'app-add-event',
  templateUrl: './add-edit-page.component.html',
  styleUrls: ['./add-edit-page.component.css'],
})
export class AddEditPageComponent {
  event!: EventDetails;
  mainBanner!: File;
  secondaryBanner!: File;
  submited = false;
  addEventForm!: FormGroup;
  eventId!: string;

  constructor(
    private eventService: EventService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.eventId = params['id'];
      if (this.eventId) {
        this.eventService.getEvent(this.eventId).subscribe((x) => {
          this.event = x;
          this.initForm();
        });
      } else {
        this.event = {
          id: '',
          name: '',
          mainBanner: null,
          secondaryBanner: null,
          location: '',
          city: '',
          lng: 0,
          lat: 0,
          date: new Date(),
          details: '',
          price: 0,
          discount: 0,
          ticketsNumber: 0,
          ticketsLeft: 0,
        };
        this.initForm();
      }
    });
  }

  initForm(): void {
    this.addEventForm = new FormGroup({
      name: new FormControl(this.event.name, [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(100),
      ]),
      mainBanner: new FormControl(null, [Validators.required]),
      secondaryBanner: new FormControl(null, [Validators.required]),
      location: new FormControl(this.event.location, [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(100),
      ]),
      city: new FormControl(this.event.city, [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(100),
      ]),
      lng: new FormControl(this.event.lng, [Validators.required]),
      lat: new FormControl(this.event.lat, [Validators.required]),
      date: new FormControl(this.event.date, [
        Validators.required,
        this.dateAfterTodayValidator(),
      ]),
      details: new FormControl(this.event.details, [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(500),
      ]),
      price: new FormControl(this.event.price, [
        Validators.required,
        Validators.min(5),
        Validators.max(200),
      ]),
      discount: new FormControl(this.event.discount, [
        Validators.required,
        Validators.min(5),
        Validators.max(100),
      ]),
      ticketsNumber: new FormControl(this.event.ticketsNumber, [
        Validators.required,
        Validators.min(50),
        Validators.max(1000),
      ]),
    });
  }

  dateAfterTodayValidator() {
    return (control: { value: string | number | Date }) => {
      const selectedDate = new Date(control.value);
      const today = new Date();

      if (selectedDate <= today) {
        return { dateAfterToday: true };
      }

      return null;
    };
  }

  onMainBannerChange(event: any): void {
    this.mainBanner = event.target.files[0];
  }

  onSecondaryBannerChange(event: any): void {
    this.secondaryBanner = event.target.files[0];
  }

  onSubmit(isEdit: boolean) {
    const data: EventDetails = {
      id: this.eventId || '',
      name: this.addEventForm.value.name!,
      mainBanner: null,
      secondaryBanner: null,
      location: this.addEventForm.value.location!,
      city: this.addEventForm.value.city!,
      lng: this.addEventForm.value.lng!,
      lat: this.addEventForm.value.lat!,
      date: this.addEventForm.value.date!,
      details: this.addEventForm.value.details!,
      price: this.addEventForm.value.price!,
      discount: this.addEventForm.value.discount!,
      ticketsNumber: this.addEventForm.value.ticketsNumber!,
      ticketsLeft: this.addEventForm.value.ticketsNumber!,
    };

    let formData = new FormData();
    formData.append('eventData', JSON.stringify(data));
    formData.append('mainBanner', this.mainBanner);
    formData.append('secondaryBanner', this.secondaryBanner);

    if (isEdit) {
      this.eventService.editEvent(formData, this.eventId).subscribe();
    } else {
      this.eventService.postEvent(formData).subscribe();
    }

    this.submited = true;
    setTimeout(() => this.router.navigate([PATHS.EVENTS]), 3000);
  }
}
