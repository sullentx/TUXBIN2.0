import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SectionCrudInformacionComponent } from './section-crud-informacion.component';

describe('SectionCrudInformacionComponent', () => {
  let component: SectionCrudInformacionComponent;
  let fixture: ComponentFixture<SectionCrudInformacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SectionCrudInformacionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SectionCrudInformacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
