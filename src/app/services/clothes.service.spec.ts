import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';

import { ClothesService } from './clothes.service';

describe('ClothesService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports:[
      HttpClientModule
    ]
  }));

  it('should be created', () => {
    const service: ClothesService = TestBed.get(ClothesService);
    expect(service).toBeTruthy();
  });
});
