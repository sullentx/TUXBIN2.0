import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainSectionCrudComponent } from './main-section-crud.component';

describe('MainSectionCrudComponent', () => {
  let component: MainSectionCrudComponent;
  let fixture: ComponentFixture<MainSectionCrudComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MainSectionCrudComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MainSectionCrudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
