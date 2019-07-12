import { TestBed, inject } from '@angular/core/testing';

import { ConjugatedVerbService } from './conjugated-verb.service';

describe('ConjugatedVerbService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ConjugatedVerbService]
    });
  });

  it('should be created', inject([ConjugatedVerbService], (service: ConjugatedVerbService) => {
    expect(service).toBeTruthy();
  }));
});
