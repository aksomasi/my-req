import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestSummaryComponent } from './request-summary.component';

describe('RequestSummaryComponent', () => {
  let component: RequestSummaryComponent;
  let fixture: ComponentFixture<RequestSummaryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RequestSummaryComponent]
    });
    fixture = TestBed.createComponent(RequestSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
