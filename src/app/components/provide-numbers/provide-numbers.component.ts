import { Component, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, Validators } from '@angular/forms';

@Component({
  selector: 'app-provide-numbers',
  templateUrl: './provide-numbers.component.html',
  styleUrls: ['./provide-numbers.component.scss']
})
export class ProvideNumbersComponent {
  form: FormGroup;
  @Output() valid = new EventEmitter<{
    status: boolean,
    data: any
  }>();

  // Regex pattern for UK phone numbers in the 1e16 format
  ukNumberPattern = /^\+(44)\d{9,13}$/;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      ranges: this.fb.array([this.createRange()])
    });

    this.form.statusChanges.subscribe(status => {
      this.valid.emit({status : status === 'VALID', data: this.form.value});
    });
  }

  get ranges(): FormArray {
    return this.form.get('ranges') as FormArray;
  }

  createRange(): FormGroup {
    const group = this.fb.group({
      rangeStart: ['', [Validators.required, Validators.pattern(this.ukNumberPattern)]],
      rangeEnd: ['', [Validators.required, Validators.pattern(this.ukNumberPattern)]],
      mainNumber: ['', [Validators.required, Validators.pattern(this.ukNumberPattern)]]
    }, { validators: this.rangeValidator });

    group.get('rangeStart').valueChanges.subscribe(value => {
      group.get('mainNumber').setValue(value, { emitEvent: false });
    });

    return group;
  }

  rangeValidator(group: FormGroup) {
    const rangeStart = Number(group.get('rangeStart').value);
    const rangeEnd = Number(group.get('rangeEnd').value);
    const mainNumber = Number(group.get('mainNumber').value);

    if (rangeEnd < rangeStart) {
      return { rangeEndLessThanRangeStart: true };
    }

    if (mainNumber < rangeStart || mainNumber > rangeEnd) {
      return { mainNumberOutOfRange: true };
    }

    return null;
  }

  addRange() {
    this.ranges.push(this.createRange());
  }

  removeRange(index: number) {
    if (this.ranges.length > 1) {
      this.ranges.removeAt(index);
    }
  }

  isFieldInvalid(controlName: string, index: number): boolean {
    const control = (this.ranges.at(index) as FormGroup).get(controlName);
    return control && control.invalid && (control.touched || control.dirty);
  }

  isMainNumberOutOfRange(index: number): boolean {
    const group = this.ranges.at(index) as FormGroup;
    return group.errors && group.errors.mainNumberOutOfRange && 
           (group.get('mainNumber').touched || group.get('mainNumber').dirty);
  }

  isRangeEndLessThanRangeStart(index: number): boolean {
    const group = this.ranges.at(index) as FormGroup;
    return group.errors && group.errors.rangeEndLessThanRangeStart &&
           (group.get('rangeEnd').touched || group.get('rangeEnd').dirty);
  }

  validateInput(event: any): void {
    const input = event.target.value;
    const filteredInput = input.replace(/[^0-9\+]/g, '');
    if (input !== filteredInput) {
      event.target.value = filteredInput;
      event.preventDefault();
    }
  }
}
