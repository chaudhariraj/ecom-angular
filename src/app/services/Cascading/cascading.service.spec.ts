import { TestBed } from '@angular/core/testing';

import { CascadingService } from './cascading.service';

describe('CascadingService', () => {
  let service: CascadingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CascadingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
