import { Component, OnInit } from '@angular/core';
import { UserSession } from '@esri/arcgis-rest-auth';
import { SessionService } from "../session.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-authenticate',
  templateUrl: './authenticate.component.html',
  styleUrls: ['./authenticate.component.scss']
})
export class AuthenticateComponent implements OnInit {

  constructor(private sessionService: SessionService, private router: Router) { }

  ngOnInit(): void {
    this.sessionService.completeSignIn();
    this.router.navigate([""]);
  }

}
