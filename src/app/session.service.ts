import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { UserSession } from "@esri/arcgis-rest-auth";

const SESSION_KEY = "ARCGIS_REST_USER_SESSION";
const CLIENT_ID = "Dbtn71QaBs736dRr"

@Injectable({
  providedIn: "root"
})
export class SessionService {
  private _session = new BehaviorSubject<UserSession>(null);

  readonly session$ = this._session.asObservable();

  get session() {
    return this._session.getValue();
  }

  set session(s: UserSession) {
    this._session.next(s);
  }

  signIn() {
    UserSession.beginOAuth2({
      clientId: CLIENT_ID,
      redirectUri: `${window.location.origin}/authenticate`
    }).then(session => {
      localStorage.setItem(SESSION_KEY, session.serialize());
      this.session = session;
    });
  }

  completeSignIn() {
    try {
      UserSession.completeOAuth2({
        clientId: CLIENT_ID,
        redirectUri: `${window.location.origin}/authenticate`
      });
    } catch (e) {
      console.error(e);
    }
  }

  checkForSignIn() {
    const serializedSession = localStorage.getItem(SESSION_KEY);
    if (serializedSession) {
      this.session = UserSession.deserialize(serializedSession);
    }
  }

  signOut() {
    localStorage.removeItem(SESSION_KEY);
    this.session = null;
  }
}
