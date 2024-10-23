import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainSectionTwoComponent } from './main-section-two.component';

describe('MainSectionTwoComponent', () => {
  let component: MainSectionTwoComponent;
  let fixture: ComponentFixture<MainSectionTwoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MainSectionTwoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MainSectionTwoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
