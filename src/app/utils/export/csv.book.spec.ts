import { CsvBook } from './csv.book';

describe('CsvBook', () => {

  it('should be created', () => {
    const book = new CsvBook();
    expect(book).toBeTruthy();
  });

  it('config should be changed', () => {
    const book = new CsvBook({
      delimiter: ';'
    });

    expect(book.config.delimiter).toEqual(';');
  });

  it('name should be setted', () => {
    const book = new CsvBook();
    const testName = 'test';
    book.setFileName(testName);
    expect(book.name).toEqual(testName);
  });
});
