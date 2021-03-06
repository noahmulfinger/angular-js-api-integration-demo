import { Component, OnInit } from "@angular/core";
import { loadModules } from "esri-loader";
import { ItemService } from "../item.service";
import { SessionService } from "../session.service";
import { filter } from "rxjs/operators";
import { IItem } from "@esri/arcgis-rest-portal";
import { UserSession } from "@esri/arcgis-rest-auth";

@Component({
  selector: "app-map-panel",
  templateUrl: "./map-panel.component.html",
  styleUrls: ["./map-panel.component.scss"]
})
export class MapPanelComponent implements OnInit {
  private map: any;
  private mapView: any;
  private session: UserSession;

  constructor(
    private sessionService: SessionService,
    private itemService: ItemService
  ) {}

  ngOnInit(): void {
    this.setupMap();

    this.sessionService.session$.subscribe(session =>
      this.handleSession(session)
    );

    this.itemService.item$
      .pipe(filter(Boolean))
      .subscribe(item => this.addFeatureLayer(item));
  }

  private setupMap() {
    loadModules(["esri/Map", "esri/views/MapView"], { css: true }).then(
      ([Map, MapView]) => {
        this.map = new Map({
          basemap: "dark-gray"
        });

        this.mapView = new MapView({
          container: "mapView",
          map: this.map,
          center: [-97.380979, 42.877742],
          zoom: 3
        });
      }
    );
  }

  private handleSession(session: UserSession) {
    loadModules(["esri/identity/IdentityManager"]).then(([IdentityManager]) => {
      if (!session && this.session) {
        IdentityManager.destroyCredentials();
        this.map.removeAll();
        this.session = null;
      }

      if (session) {
        IdentityManager.registerToken(session.toCredential());
        this.session = session;
      }
    });
  }

  private addFeatureLayer(item: IItem) {
    loadModules(["esri/layers/FeatureLayer"]).then(([FeatureLayer]) => {
      const layer = new FeatureLayer({
        portalItem: {
          id: item.id,
          layerId: 0
        }
      });
      this.map.removeAll();
      this.map.add(layer);
      this.mapView.whenLayerView(layer).then(() => {
        this.mapView.goTo(item.extent);
      });
    });
  }
}
