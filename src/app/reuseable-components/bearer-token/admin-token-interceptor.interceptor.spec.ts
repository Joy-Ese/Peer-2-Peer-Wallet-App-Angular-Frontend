import { TestBed } from '@angular/core/testing';

import { AdminTokenInterceptorInterceptor } from './admin-token-interceptor.interceptor';

describe('AdminTokenInterceptorInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      AdminTokenInterceptorInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: AdminTokenInterceptorInterceptor = TestBed.inject(AdminTokenInterceptorInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
