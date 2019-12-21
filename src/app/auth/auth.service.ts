import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private key = 'AIzaSyAiMCHP-b0yxNb9iO12LX3PEhx67C9khtM';
  constructor(private http: HttpClient) { }

  signUp(email: string, password: string) {
    const body = {
      email,
      password,
      returnSecureToken: true
    };

    return this.http.post(`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${this.key}`, body)
      .pipe(catchError(err => this.handleError(err)));
  }

  login(email: string, password: string) {
    const body = {
      email,
      password,
      returnSecureToken: true
    };

    return this.http.post(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${this.key}`, body)
      .pipe(catchError(err => this.handleError(err)));
  }

  private handleError(err) {
    let message = 'Errore sconosciuto';
    switch (err.error.error.message) {
      case 'EMAIL_NOT_FOUND':
        message = 'Non esiste alcun utente corrispondente a queste credenziali. L\'Utente potrebbe essere stato eliminato';
        break;
      case 'INVALID_PASSWORD':
        message = 'La password non è valida';
        break;
      case 'USER_DISABLED':
        message = 'Tale utente è stato disabilitato dall\'amministratore';
        break;
      case 'EMAIL_EXISTS':
        message = 'L\'Indirizzo email è già in uso.';
        break;
      case 'OPERATION_NOT_ALLOWED':
        message = 'Password sign-in è disabilitato per questo progetto.';
        break;
      case 'TOO_MANY_ATTEMPTS_TRY_LATER':
        message = 'Tutte le richieste sono state bloccate a causa di un\'attività anomale. Riprova più tardi';
        break;
    }
    return throwError(message);
  }
}
