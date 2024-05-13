import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthenticationService } from './services/authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  constructor(private authentication: AuthenticationService) {}
  ngOnInit(): void {
    this.authentication.setSubjects();
  }
  output!: any;

  title = 'PartyHub';
}
