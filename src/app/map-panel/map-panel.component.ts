import { Component, OnInit } from "@angular/core";
import { loadModules } from "esri-loader";
import { ItemService } from "../item.service";
import { SessionService } from "../session.service";
import { filter } from "rxjs/operators";

@Component({
  selector: "app-map-panel",
  templateUrl: "./map-panel.component.html",
  styleUrls: ["./map-panel.component.scss"]
})
export class MapPanelComponent implements OnInit {
  private map: any;
  private mapView: any;
  private signedIn: boolean;

  constructor(
    private sessionService: SessionService,
    private itemService: ItemService
  ) {}

  ngOnInit(): void {
    loadModules(
      ["esri/Map", "esri/views/MapView", "esri/layers/FeatureLayer"],
      { css: true }
    ).then(([Map, MapView, FeatureLayer]) => {
      this.map = new Map({
        basemap: "dark-gray"
      });

      this.mapView = new MapView({
        container: "mapView",
        map: this.map,
        center: [-97.380979, 42.877742],
        zoom: 3
      });
    });

    this.sessionService.session$.subscribe(session => {
      loadModules(["esri/identity/IdentityManager"]).then(([esriId]) => {
        if (!session && this.signedIn) {
          esriId.destroyCredentials();
          this.map.removeAll();
          this.signedIn = false;
        }

        if (session) {
          esriId.registerToken(session.toCredential());
          this.signedIn = true;
        }
      });
    });

    this.itemService.item$.pipe(filter(Boolean)).subscribe(item => {
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
    });
  }
}
