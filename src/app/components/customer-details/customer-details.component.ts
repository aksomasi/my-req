import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-customer-details',
  templateUrl: './customer-details.component.html',
  styleUrls: ['./customer-details.component.scss']
})
export class CustomerDetailsComponent {

  @Input() data: any;
  @Output() deleteRow = new EventEmitter<number>();
  @Output() navigateBack = new EventEmitter<void>();
  @Output() navigateNext = new EventEmitter<void>();

  removeRow(id: number) {
    this.deleteRow.emit(id);
  }
}
