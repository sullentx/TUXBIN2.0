import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogDetailsTruckComponent } from './dialog-details-truck.component';

describe('DialogDetailsTruckComponent', () => {
  let component: DialogDetailsTruckComponent;
  let fixture: ComponentFixture<DialogDetailsTruckComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DialogDetailsTruckComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogDetailsTruckComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
