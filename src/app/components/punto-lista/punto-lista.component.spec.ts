import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PuntoListaComponent } from './punto-lista.component';

describe('PuntoListaComponent', () => {
  let component: PuntoListaComponent;
  let fixture: ComponentFixture<PuntoListaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PuntoListaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PuntoListaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
