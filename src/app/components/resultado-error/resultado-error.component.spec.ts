import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResultadoErrorComponent } from './resultado-error.component';

describe('ResultadoErrorComponent', () => {
  let component: ResultadoErrorComponent;
  let fixture: ComponentFixture<ResultadoErrorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResultadoErrorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResultadoErrorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
