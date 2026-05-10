import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, of } from 'rxjs';
import { IDevice } from '../models/idevices';

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
