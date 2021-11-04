import { TestBed } from '@angular/core/testing';

import { AccountsInterceptor } from './accounts.interceptor';

describe('AccountsInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      AccountsInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: AccountsInterceptor = TestBed.inject(AccountsInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
