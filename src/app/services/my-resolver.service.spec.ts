import { TestBed } from '@angular/core/testing';

import { MyResolverService } from './my-resolver.service';

describe('MyResolverService', () => {
  let service: MyResolverService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MyResolverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
