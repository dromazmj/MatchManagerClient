import { TestBed } from '@angular/core/testing';

import { CReposTableService } from './crepos-table.service';

describe('CReposTableService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CReposTableService = TestBed.get(CReposTableService);
    expect(service).toBeTruthy();
  });
});
