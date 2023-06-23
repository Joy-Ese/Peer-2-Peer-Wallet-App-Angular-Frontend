import { TestBed } from '@angular/core/testing';

import { AdminAuthorizeInterceptorInterceptor } from './admin-authorize-interceptor.interceptor';

describe('AdminAuthorizeInterceptorInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      AdminAuthorizeInterceptorInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: AdminAuthorizeInterceptorInterceptor = TestBed.inject(AdminAuthorizeInterceptorInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
