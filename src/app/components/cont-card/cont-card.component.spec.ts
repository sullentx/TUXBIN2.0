import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContCardComponent } from './cont-card.component';

describe('ContCardComponent', () => {
  let component: ContCardComponent;
  let fixture: ComponentFixture<ContCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
