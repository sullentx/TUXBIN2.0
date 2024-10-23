import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogDeleteTruckComponent } from './dialog-delete-truck.component';

describe('DialogDeleteTruckComponent', () => {
  let component: DialogDeleteTruckComponent;
  let fixture: ComponentFixture<DialogDeleteTruckComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DialogDeleteTruckComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogDeleteTruckComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
