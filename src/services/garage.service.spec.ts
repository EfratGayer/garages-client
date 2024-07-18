import { TestBed } from '@angular/core/testing';

import { GarageService } from '../services/garage.service';

describe('GarageService', () => {
  let service: GarageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GarageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
