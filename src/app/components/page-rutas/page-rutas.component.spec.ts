import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageRutasComponent } from './page-rutas.component';

describe('PageRutasComponent', () => {
  let component: PageRutasComponent;
  let fixture: ComponentFixture<PageRutasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PageRutasComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PageRutasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
