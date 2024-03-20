import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Profile } from '../types/profile.type';
import { Observable } from 'rxjs';
import { enviroment } from '../environments/environment.dev';
import { ApiResponse } from '../types/apiResponse.type';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  constructor(private http: HttpClient) { }

  getProfile(): Observable<Profile> {
    return this.http.get<Profile>(enviroment.apiURL + '/user/profile');
  }

  deleteProfile(): Observable<string> {
    return this.http.delete<string>(enviroment.apiURL + '/user/profile');
  }

  editProfile(profile: Profile): Observable<string> {
    return this.http.put<string>(enviroment.apiURL + '/user/profile', profile);
  }

  getPromoCode(): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(enviroment.apiURL + '/user/promo-code');
  }

  generatePromoCode(): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(enviroment.apiURL + '/user/generate-promo-code');
  }

  editPromoCode(promoCode: string): Observable<ApiResponse> {
    return this.http.put<ApiResponse>(enviroment.apiURL + '/user/promo-code', promoCode);
  }
}
