import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrudNotificacionesComponent } from './crud-notificaciones.component';

describe('CrudNotificacionesComponent', () => {
  let component: CrudNotificacionesComponent;
  let fixture: ComponentFixture<CrudNotificacionesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CrudNotificacionesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CrudNotificacionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
