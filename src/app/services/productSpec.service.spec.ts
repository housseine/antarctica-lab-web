import { TestBed } from '@angular/core/testing';

import { ProductSpecService } from './product.spec.service';

describe('ProductSpecService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ProductSpecService = TestBed.get(ProductSpecService);
    expect(service).toBeTruthy();
  });
});
