import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlertAccionComponent } from './alert-accion.component';

describe('AlertAccionComponent', () => {
  let component: AlertAccionComponent;
  let fixture: ComponentFixture<AlertAccionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AlertAccionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AlertAccionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
