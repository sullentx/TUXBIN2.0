import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrudRutasComponent } from './crud-rutas.component';

describe('CrudRutasComponent', () => {
  let component: CrudRutasComponent;
  let fixture: ComponentFixture<CrudRutasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CrudRutasComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CrudRutasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
