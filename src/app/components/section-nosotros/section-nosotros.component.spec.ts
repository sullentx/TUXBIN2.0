import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SectionNosotrosComponent } from './section-nosotros.component';

describe('SectionNosotrosComponent', () => {
  let component: SectionNosotrosComponent;
  let fixture: ComponentFixture<SectionNosotrosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SectionNosotrosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SectionNosotrosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
