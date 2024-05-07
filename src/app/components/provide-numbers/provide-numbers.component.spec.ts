import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProvideNumbersComponent } from './provide-numbers.component';

describe('ProvideNumbersComponent', () => {
  let component: ProvideNumbersComponent;
  let fixture: ComponentFixture<ProvideNumbersComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProvideNumbersComponent]
    });
    fixture = TestBed.createComponent(ProvideNumbersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
