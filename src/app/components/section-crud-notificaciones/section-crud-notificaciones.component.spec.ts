import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SectionCrudNotificacionesComponent } from './section-crud-notificaciones.component';

describe('SectionCrudNotificacionesComponent', () => {
  let component: SectionCrudNotificacionesComponent;
  let fixture: ComponentFixture<SectionCrudNotificacionesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SectionCrudNotificacionesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SectionCrudNotificacionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
