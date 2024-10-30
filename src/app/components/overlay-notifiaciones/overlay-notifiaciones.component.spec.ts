import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OverlayNotifiacionesComponent } from './overlay-notifiaciones.component';

describe('OverlayNotifiacionesComponent', () => {
  let component: OverlayNotifiacionesComponent;
  let fixture: ComponentFixture<OverlayNotifiacionesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OverlayNotifiacionesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OverlayNotifiacionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
