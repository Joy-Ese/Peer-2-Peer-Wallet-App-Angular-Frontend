import { TestBed } from '@angular/core/testing';

import { PreLoadingInterceptor } from './pre-loading.interceptor';

describe('PreLoadingInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      PreLoadingInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: PreLoadingInterceptor = TestBed.inject(PreLoadingInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
