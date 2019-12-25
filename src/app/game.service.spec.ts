import { TestBed } from '@angular/core/testing';

import { CollaborateurService } from './collaborateur.service';
import { HttpClientModule } from '@angular/common/http';

describe('collaborateurService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [HttpClientModule],
  }));

  it('should be created', () => {
    const service: CollaborateurService = TestBed.get(CollaborateurService);
    expect(service).toBeTruthy();
  });
});
