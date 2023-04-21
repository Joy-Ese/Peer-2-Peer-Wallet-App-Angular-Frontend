import { TestBed } from '@angular/core/testing';

import { AuthorizeInterceptorInterceptor } from './authorize-interceptor.interceptor';

describe('AuthorizeInterceptorInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      AuthorizeInterceptorInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: AuthorizeInterceptorInterceptor = TestBed.inject(AuthorizeInterceptorInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
