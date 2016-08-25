import {
  beforeEachProviders,
  inject,
  it
} from '@angular/core/testing';

// Load the implementations that should be tested
import { AppComponent } from './app.component';

describe('App Component', () => {
  // provide our implementations or mocks to the dependency injector
  beforeEachProviders(() => [
    AppComponent
  ]);

  it('should have a brand', inject([ AppComponent ], (app) => {
    expect(app.brand).toEqual('Sentry');
  }));

});
