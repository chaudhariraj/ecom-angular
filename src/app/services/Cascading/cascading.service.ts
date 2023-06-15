import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CascadingService {
  baseApiUrl: string = environment.baseApiUrl;
  constructor(private httpClinet: HttpClient) { }

  getCountries(): Observable<any>{
    return this.httpClinet.get<any>(this.baseApiUrl + '/Address/Country')
  }

  getStates(): Observable<any>{
    return this.httpClinet.get(this.baseApiUrl +
      `/Address/State`,
    );  
  }

  getCities(): Observable<any>{
    return this.httpClinet.get(this.baseApiUrl +
      `/Address/City`,
    );  
  }


  getZipCodes(): Observable<any>{
    return this.httpClinet.get(this.baseApiUrl +
      `/Address/Zip`,
    );  
  }
}
