import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetallesPersonalesComponent } from './detalles-personales.component';

describe('DetallesPersonalesComponent', () => {
  let component: DetallesPersonalesComponent;
  let fixture: ComponentFixture<DetallesPersonalesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetallesPersonalesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetallesPersonalesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
