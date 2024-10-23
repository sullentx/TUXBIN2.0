import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrudCamionComponent } from './crud-camion.component';

describe('CrudCamionComponent', () => {
  let component: CrudCamionComponent;
  let fixture: ComponentFixture<CrudCamionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CrudCamionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CrudCamionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
