import { Component } from '@angular/core';
import { SessionService } from './session.service';
import { UserSession } from '@esri/arcgis-rest-auth';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private sessionService: SessionService) {}

  ngOnInit() {
    this.sessionService.checkForSignIn();
  }
}
