import { TestBed } from '@angular/core/testing';

import { RussianLanguageService } from './russian-language-service.service';

describe('RussianLanguageServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RussianLanguageService = TestBed.get(RussianLanguageService);
    expect(service).toBeTruthy();
  });
});
