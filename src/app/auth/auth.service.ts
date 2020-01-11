import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { throwError, BehaviorSubject, Subject } from 'rxjs';
import { User } from '../shared/user.model';
import { Router } from '@angular/router';

interface AuthUser {
  kind: string;
  localId: string;
  email: string;
  displayName: string;
  idToken: string;
  registered: boolean;
  refreshToken: string;
  expiresIn: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user = new BehaviorSubject<User>(null);
  private key = 'AIzaSyAiMCHP-b0yxNb9iO12LX3PEhx67C9khtM';
  private tokenExpirationTime: any;
  constructor(private http: HttpClient, private router: Router) { }

  signUp(email: string, password: string) {
    const body = {
      email,
      password,
      returnSecureToken: true
    };

    return this.http.post<AuthUser>(`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${this.key}`, body)
      .pipe(catchError(err => this.handleError(err)), tap(user => {
        this.handleAuthentication(user);
      }));
  }

  login(email: string, password: string) {
    const body = {
      email,
      password,
      returnSecureToken: true
    };

    return this.http.post<AuthUser>(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${this.key}`, body)
      .pipe(catchError(err => this.handleError(err)), tap(user => {
        this.handleAuthentication(user);
      }));
  }

  autoLogin() {
    const userData = JSON.parse(localStorage.getItem('userData'));
    if (userData) {
      const authenticatedUser = new User(userData.email, userData.id, userData.token, new Date(userData.expirationDate));
      this.user.next(authenticatedUser);
      const expiresIn = +authenticatedUser.expirationDate.getTime() - new Date().getTime();
      this.autoLogout(expiresIn);
    }
  }

  logout() {
    localStorage.removeItem('userData');
    localStorage.removeItem('offers');
    localStorage.removeItem('items');
    this.user.next(null);
    clearTimeout(this.tokenExpirationTime);
  }

  autoLogout(expiresIn: number) {
    if (!this.user) {
      return;
    }

    this.tokenExpirationTime = setTimeout(() => {
      localStorage.removeItem('userData');
      localStorage.removeItem('offers');
      localStorage.removeItem('items');
      this.user.next(null);
      this.router.navigate(['/']);
    }, expiresIn);
  }

  private handleAuthentication(user: AuthUser) {
    const expirationDate = new Date(new Date().getTime() + +user.expiresIn * 1000);
    console.log(expirationDate);
    const authenticatedUser = new User(user.email, user.localId, user.idToken, expirationDate);
    localStorage.setItem('userData', JSON.stringify(authenticatedUser));
    this.user.next(authenticatedUser);
    const expiresIn = expirationDate.getTime() - new Date().getTime();
    this.autoLogout(expiresIn);
  }

  private handleError(err: any) {
    return throwError(err.error.error.message);
  }
}
