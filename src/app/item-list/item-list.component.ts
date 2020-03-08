import { Component, OnInit } from "@angular/core";
import { UserSession } from "@esri/arcgis-rest-auth";
import {
  searchItems,
  SearchQueryBuilder,
  IItem
} from "@esri/arcgis-rest-portal";
import { SessionService } from "../session.service";
import { ItemService } from "../item.service";
import { filter } from "rxjs/operators";

@Component({
  selector: "app-item-list",
  templateUrl: "./item-list.component.html",
  styleUrls: ["./item-list.component.scss"]
})
export class ItemListComponent implements OnInit {
  session: UserSession;
  items: IItem[];
  currentItemId: IItem;

  constructor(
    private sessionService: SessionService,
    private itemService: ItemService
  ) {}

  ngOnInit(): void {
    this.sessionService.session$.subscribe(session => {
      this.session = session;
      if (session) {
        const q = new SearchQueryBuilder()
          .match(session.username)
          .in("owner")
          .and()
          .match("Feature Service")
          .in("type");
        searchItems({ q, authentication: session }).then(response => {
          this.items = response.results;
        });
      }
    });

    this.itemService.item$.pipe(filter(Boolean)).subscribe(item => {
      this.currentItemId = item.id;
    });
  }

  signIn() {
    this.sessionService.signIn();
  }

  signOut() {
    this.sessionService.signOut();
  }

  addItemToMap(item: IItem) {
    this.itemService.item = item;
  }
}
