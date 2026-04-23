import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IDevice } from '../components/devices/devices.component';
import { catchError, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DevicesService {
  private api = 'http://localhost:3001';

  constructor(private http: HttpClient) {}

  getData() {
    return this.http
      .get<IDevice[]>(`${this.api}/api/devices`)
      .pipe(catchError(() => of([])));
  }
}
