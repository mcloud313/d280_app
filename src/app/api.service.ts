import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

interface CountryData {
  name: string;
  capitalCity: string;
  region: { value: string }; 
  adminregion: { value: string }; 
  incomeLevel: { value: string };
  capitalLongitude: string;
  capitalLatitude: string;
}

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseUrl = 'http://api.worldbank.org/v2/country';

  constructor(private http: HttpClient) { }

  getCountryInfo(countryCode: string): Observable<CountryData> {
    const url = `${this.baseUrl}/${countryCode}?format=json`;
    return this.http.get<any[]>(url).pipe( 
      map(data => data[1]), // Assuming country data is at the correct index
      map(country => {
         return {
          ...country,
          capitalLongitude: country.longitude, 
          capitalLatitude: country.latitude
        };
      })
    );
  }
}