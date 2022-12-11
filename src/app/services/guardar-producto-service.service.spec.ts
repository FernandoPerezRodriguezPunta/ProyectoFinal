import { TestBed } from '@angular/core/testing';

import { GuardarProductoServiceService } from './guardar-producto-service.service';

describe('GuardarProductoServiceService', () => {
  let service: GuardarProductoServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GuardarProductoServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
