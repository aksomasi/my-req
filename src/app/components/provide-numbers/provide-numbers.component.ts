import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, Validators } from '@angular/forms';

@Component({
  selector: 'app-provide-numbers',
  templateUrl: './provide-numbers.component.html',
  styleUrls: ['./provide-numbers.component.scss']
})
export class ProvideNumbersComponent implements OnInit {
  form: FormGroup;

  selectedRangeCount: number = 0;

  @Output() formSubmitted = new EventEmitter<any>();
  @Output() navigate = new EventEmitter<number>();

  // Regex pattern for UK phone numbers in the 1e16 format
  ukNumberPattern = /^\+(44)\d{9,13}$/;

  constructor(private fb: FormBuilder) {
   
  }
  ngOnInit(): void {
    this.form = this.fb.group({
      ranges: this.fb.array(this.createRange())
    });

    this.form.valueChanges.subscribe(value => {
      this.selectedRangeCount = this.form.value.ranges.filter(range => range.selected).length;
    });
  }

  get ranges() {
    return this.form.get('ranges') as FormArray;
  }

  createRange(): FormGroup[] {    
    const groups = Array.from({ length: 5 }).map((_, index) => this.fb.group({
      selected: [false],
      id: [index + 1],
      rangeStart: ['', [Validators.required, Validators.pattern(this.ukNumberPattern)]],
      rangeEnd: ['', [Validators.required, Validators.pattern(this.ukNumberPattern)]],
      mainNumber: ['', [Validators.required, Validators.pattern(this.ukNumberPattern)]]
    }, { validators: this.rangeValidator }));

    groups.forEach(group => {
      group.get('rangeStart').valueChanges.subscribe(value => {
        group.get('mainNumber').setValue(value, { emitEvent: false });
      });
    });
   

    return groups;
  }

  addRange() {
    this.ranges.push(this.fb.group({
      selected: [false],
      id: [this.ranges.length + 1],
      rangeStart: ['', Validators.required, Validators.pattern(this.ukNumberPattern)],
      rangeEnd: ['', Validators.required, , Validators.pattern(this.ukNumberPattern)],
      mainNumber: ['', Validators.required, , Validators.pattern(this.ukNumberPattern)]
    }));
  }

  removeSelectedRanges() {
    this.ranges.controls = this.ranges.controls.filter(control => !control.value.selected);
  }

  reset() {
    this.form.reset();
  }

  validate() {
    if (this.form.valid) {
      this.formSubmitted.emit(this.form.value);
    }
  }

  navigateToStep2() {
    this.formSubmitted.emit(this.form.value);
    this.navigate.emit(2);
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
