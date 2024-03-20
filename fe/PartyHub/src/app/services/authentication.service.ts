import { Injectable } from '@angular/core';
import { Register } from '../types/register.type';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { enviroment } from '../environments/environment.dev';
import { BehaviorSubject, Observable, map, tap } from 'rxjs';
import { Login } from '../types/login.type';
import { LOCALSTORAGEKEYS } from '../constants/localStorage';
import { Token } from '../types/token.type';
import { jwtDecode } from 'jwt-decode';
import { DecodedToken } from '../types/decodedToken.type';
import { ROLES } from '../constants/roles';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  isLoggedIn = new BehaviorSubject<boolean>(false);
  isAdmin = new BehaviorSubject<boolean>(false);
  isUser = new BehaviorSubject<boolean>(false);
  isScanner = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient) {}

  register(user: Register): Observable<any> {
    return this.http.post(enviroment.apiURL + '/auth/register', user, {
      observe: 'response',
    });
  }

  login(user: Login): Observable<Token> {
    return this.http.post<Token>(enviroment.apiURL + '/auth/login', user).pipe(
      tap((token: Token) => {
        localStorage.setItem(LOCALSTORAGEKEYS.TOKEN, JSON.stringify(token));
        localStorage.setItem(
          LOCALSTORAGEKEYS.EMAIL,
          this.getDecodedToken(token).sub
        );
        this.isLoggedIn.next(true);
        this.setSubjects();
      })
    );
  }

  sendResetPasswordEmail(email: string) {
    return this.http.get(enviroment.apiURL + '/auth/reset-password/' + email);
  }

  resetPassword(token: string, password: string) {
    return this.http.post(
      enviroment.apiURL + '/auth/reset-password/' + token,
      password
    );
  }

  verifyAccount(token: string): Observable<string> {
    return this.http.get<string>(enviroment.apiURL + '/auth/verify/' + token);
  }

  getDecodedToken(token: Token): DecodedToken {
    let decodedToken: DecodedToken = jwtDecode(token.accessToken);
    return decodedToken;
  }

  setSubjects(): void {
    let token: Token = JSON.parse(
      localStorage.getItem(LOCALSTORAGEKEYS.TOKEN)!
    );

    if (token) {
      let decodedToken: DecodedToken = this.getDecodedToken(token);

      const expirationDate = new Date(decodedToken.exp * 1000);
      const currentDate = new Date();

      if (expirationDate < currentDate) {
        this.logout();
      } else {
        this.isLoggedIn.next(true);
        this.setRolesFalse();
        if (decodedToken.roles[0] == ROLES.ADMIN) {
          this.isAdmin.next(true);
        }
        if (decodedToken.roles[0] == ROLES.USER) {
          this.isUser.next(true);
        }
        if (decodedToken.roles[0] == ROLES.SCANNER) {
          this.isScanner.next(true);
        }
      }
    }
  }

  setRolesFalse(): void {
    this.isAdmin.next(false);
    this.isScanner.next(false);
    this.isUser.next(false);
  }

  logout(): void {
    this.isLoggedIn.next(false);
    this.setRolesFalse();
    localStorage.removeItem(LOCALSTORAGEKEYS.TOKEN);
    localStorage.removeItem(LOCALSTORAGEKEYS.EMAIL);
  }
}
