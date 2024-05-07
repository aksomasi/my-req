import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-my-request',
  templateUrl: './my-request.component.html',
  styleUrls: ['./my-request.component.scss']
})
export class MyRequestComponent {

 activeTab = 1;
  validForms = [false, false, false, false];
  data = {
    provideNumbers: [],
    customerDetails: [],
    portinDetils: [],
    requestSummary: []
  }
  isNextEnabled() {
    return this.validForms[this.activeTab - 1];
  }

  next() {
    console.log('provideNumbers', this.data.provideNumbers)
    // code to move next tabs with next button
    // if (this.activeTab < 4 && this.isNextEnabled()) {
    //   this.activeTab++;
    // }
  }

  previous() {
    if (this.activeTab > 1) {
      this.activeTab--;
    }
  }

  setValid(tabIndex: number, event: any) {
    this.validForms[tabIndex] = event.status;
    if(tabIndex === 0){
      this.data.provideNumbers = event.data;
    }
  }
}
