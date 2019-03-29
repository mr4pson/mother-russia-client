import { TestBed } from '@angular/core/testing';

import { AboutSectionService } from './about-section.service';

describe('AboutSectionService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AboutSectionService = TestBed.get(AboutSectionService);
    expect(service).toBeTruthy();
  });
});
