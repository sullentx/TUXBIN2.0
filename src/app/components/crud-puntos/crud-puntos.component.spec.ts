import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrudPuntosComponent } from './crud-puntos.component';

describe('CrudPuntosComponent', () => {
  let component: CrudPuntosComponent;
  let fixture: ComponentFixture<CrudPuntosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CrudPuntosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CrudPuntosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
