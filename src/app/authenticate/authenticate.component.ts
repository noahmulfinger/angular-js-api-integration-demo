import { Component, OnInit } from '@angular/core';
import { UserSession } from '@esri/arcgis-rest-auth';
import { SessionService } from "../session.service";

@Component({
  selector: 'app-authenticate',
  templateUrl: './authenticate.component.html',
  styleUrls: ['./authenticate.component.scss']
})
export class AuthenticateComponent implements OnInit {

  constructor(private sessionService: SessionService) { }

  ngOnInit(): void {
    console.log("complete sign in")
    this.sessionService.completeSignIn();
  }

}
