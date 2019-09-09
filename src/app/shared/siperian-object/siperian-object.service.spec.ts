import { TestBed } from '@angular/core/testing';

import { SiperianObjectService } from './siperian-object.service';

describe('SiperianObjectService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SiperianObjectService = TestBed.get(SiperianObjectService);
    expect(service).toBeTruthy();
  });
});
