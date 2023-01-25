import { TestBed } from '@angular/core/testing';

import { RegisterPageService } from './register-page.service';

describe('RegisterPageService', () => {
  let service: RegisterPageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RegisterPageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
