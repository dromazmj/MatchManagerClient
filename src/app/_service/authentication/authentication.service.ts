import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { AuthenticationUser } from 'src/app/models/authenticationuser.module';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private currentUserSubject: BehaviorSubject<AuthenticationUser>;
  public currentUser: Observable<AuthenticationUser>;
  private config = {apiUrl: "http://localhost:8088/match-manager-1/"};

  constructor(private http: HttpClient) {
      this.currentUserSubject = new BehaviorSubject<AuthenticationUser>(JSON.parse(localStorage.getItem('currentUser')));
      this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): AuthenticationUser {
      return this.currentUserSubject.value;
  }

  login(authUser) {
      console.log("HERE");
      console.log(authUser);
      console.log(localStorage.getItem('currentUser'));
      return this.http.post<AuthenticationUser>(`${this.config.apiUrl}login`, authUser)
          .pipe(map(user => {
              console.log(user);
              // login successful if there's a jwt token in the response
              if (user && user.token) {
                  // store user details and jwt token in local storage to keep user logged in between page refreshes
                  localStorage.setItem('currentUser', JSON.stringify(user));
                  this.currentUserSubject.next(user);
              }

              return user;
          }));
  }

  logout() {
      // remove user from local storage to log user out
      localStorage.removeItem('currentUser');
      this.currentUserSubject.next(null);
  }
}
