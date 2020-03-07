import { Injectable } from "@angular/core";
import { IItem } from '@esri/arcgis-rest-portal';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: "root"
})
export class ItemService {
  private _item = new BehaviorSubject<IItem>(null);

  readonly item$ = this._item.asObservable();

  get item() {
    return this._item.getValue();
  }

  set item(item: IItem) {
    this._item.next(item);
  }
}
