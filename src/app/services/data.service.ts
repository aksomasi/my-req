// src/app/my-request/data.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private formData = new BehaviorSubject<any>({});
  currentFormData = this.formData.asObservable();

  updateFormData(data: any) {
    this.formData.next(data);
  }

  deleteRow(id: number) {
    const currentData = this.formData.value;
    delete currentData[id];
    this.formData.next(currentData);
  }
}
