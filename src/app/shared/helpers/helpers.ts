export class Helpers {
  static sortSearchResults(a: string, b: string, aAlternative: string, bAlternative: string): number {
    let comparison = a.localeCompare(b, 'en', { sensitivity: 'base' });
    if (comparison === 0) {
      comparison = aAlternative.localeCompare(bAlternative);
    }
    return comparison;
  }
}
