import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PortinDetailsComponent } from './portin-details.component';

describe('PortinDetailsComponent', () => {
  let component: PortinDetailsComponent;
  let fixture: ComponentFixture<PortinDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PortinDetailsComponent]
    });
    fixture = TestBed.createComponent(PortinDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
