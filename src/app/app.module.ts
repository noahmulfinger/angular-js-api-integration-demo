import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { Routes, RouterModule } from '@angular/router';
import { MatButtonModule } from "@angular/material/button";
import { MatListModule } from "@angular/material/list";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

import { AppComponent } from "./app.component";
import { ItemListComponent } from "./item-list/item-list.component";
import { MapPanelComponent } from "./map-panel/map-panel.component";
import { ViewComponent } from './view/view.component';
import { AuthenticateComponent } from './authenticate/authenticate.component';

const routes: Routes = [
  {
    path: '',
    component: ViewComponent
  },
  {
    path: 'authenticate',
    component: AuthenticateComponent
  }
];

@NgModule({
  declarations: [AppComponent, ItemListComponent, MapPanelComponent, ViewComponent, AuthenticateComponent],
  imports: [RouterModule.forRoot(routes), BrowserModule, BrowserAnimationsModule, MatButtonModule, MatListModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
