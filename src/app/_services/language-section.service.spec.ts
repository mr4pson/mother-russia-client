import { TestBed } from '@angular/core/testing';

import { LanguageSectionService } from './language-section.service';

describe('LanguageSectionService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LanguageSectionService = TestBed.get(LanguageSectionService);
    expect(service).toBeTruthy();
  });
});
