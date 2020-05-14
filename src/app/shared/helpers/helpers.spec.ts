import {TestBed} from '@angular/core/testing';
import {Helpers} from './helpers';

describe('Helpers', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should sort strings', () => {
    expect(Helpers.sortSearchResults('Rokas', 'Ciapas', 'Kaunas', 'Vilnius')).toBe(1);
    expect(Helpers.sortSearchResults('Antanas', 'Bananas', 'Kaunas', 'Vilnius')).toBe(-1);
    expect(Helpers.sortSearchResults('Zenonas', 'Zenonas', 'Kaunas', 'Vilnius')).toBe(-1);
    expect(Helpers.sortSearchResults('Zenonas', 'Zenonas', 'Vilnius', 'Kaunas')).toBe(1);
  });
});
