import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable( {
  providedIn: 'root',
} )
export class TwoFactorCodeService {
  constructor(
      private http: HttpClient
  ) {
  }

  submitPhoneNumber( phoneNumber: string ) {
    return this.http.post<any>( `${ environment.serverUrl }/2fa/request`, {
      phoneNumber,
    } );
  }

  verify( code: string, isInitialVerification: boolean ) {
    return this.http.post<any>( `${ environment.serverUrl }/2fa/verify`, {
      code,
      isInitialVerification,
    } );
  }

  loginVerify( code: string, preAuthToken: string ) {
    return this.http.post<any>( `${ environment.serverUrl }/2fa/loginVerify`, {
      code,
      preAuthToken,
    } );
  }
}
