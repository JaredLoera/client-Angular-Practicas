import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { rolsGuard } from './rols.guard';

describe('rolsGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => rolsGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
