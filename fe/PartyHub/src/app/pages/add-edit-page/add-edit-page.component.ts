import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { EventDetails } from 'src/app/types/event.type';
import { EventService } from 'src/app/services/event.service';
import { Router } from '@angular/router';
import { PATHS } from 'src/app/constants/paths';

@Component({
  selector: 'app-add-event',
  templateUrl: './add-edit-page.component.html',
  styleUrls: ['./add-edit-page.component.css'],
})
export class AddEditPageComponent {
  mainBanner!: File;
  secondaryBanner!: File;
  submited = false;

  addEventForm = new FormGroup({
    name: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(100),
    ]),
    mainBanner: new FormControl(null, [Validators.required]),
    secondaryBanner: new FormControl(null, [Validators.required]),
    location: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(100),
    ]),
    city: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(100),
    ]),
    lng: new FormControl(null, [Validators.required]),
    lat: new FormControl(null, [Validators.required]),
    date: new FormControl(null, [
      Validators.required,
      this.dateAfterTodayValidator(),
    ]),
    details: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(500),
    ]),
    price: new FormControl(null, [
      Validators.required,
      Validators.min(5),
      Validators.max(200),
    ]),
    discount: new FormControl(null, [
      Validators.required,
      Validators.min(5),
      Validators.max(100),
    ]),
    ticketsNumber: new FormControl(null, [
      Validators.required,
      Validators.min(50),
      Validators.max(1000),
    ]),
  });
  constructor(private eventService: EventService, private router: Router) { }

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

  onSubmit() {
    const data: EventDetails = {
      id: '',
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

    this.eventService.postEvent(formData).subscribe();
    this.submited = true;
    setTimeout(() => this.router.navigate([PATHS.EVENTS]), 3000);
  }
}
