import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DevicesService {
  private api = 'http://localhost:3001';

  constructor(private http: HttpClient) {}

  getData() {
    return this.http
      .get<any[]>(`${this.api}/api/devices`)
      .pipe(catchError(() => of([])));
  }
}
