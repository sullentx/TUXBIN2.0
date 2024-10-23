import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogEditTruckComponent } from './dialog-edit-truck.component';

describe('DialogEditTruckComponent', () => {
  let component: DialogEditTruckComponent;
  let fixture: ComponentFixture<DialogEditTruckComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DialogEditTruckComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogEditTruckComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
