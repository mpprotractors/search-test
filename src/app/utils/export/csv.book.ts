import { IBook, IBookConfig } from './models';

// Simple implementation of csv generator
export class CsvBook implements IBook {
  private configuration: IBookConfig = {
    delimiter: ','
  };

  private fileName: string;
  private columns: string[];
  private data: unknown[];

  constructor(config?: IBookConfig) {
    this.configuration = { ...this.configuration, ...config };
  }

  get config() {
    return this.configuration;
  }

  get name() {
    return this.fileName;
  }

  setFileName(name: string) {
    this.fileName = name;
  }

  setColumns(columns: string[]) {
    this.columns = columns;
  }

  setData(data: unknown[]) {
    this.data = data;
  }

  // TODO: move to abstract Book
  exportToFile() {
    const wb = this.prepareWorkBook();
    const fileBlob = new Blob([wb], { type: 'octet/stream' });

    // Here I prefer saveAs function
    const link = document.createElement('a');
    link.download = `${this.fileName}.csv`;
    link.href = window.URL.createObjectURL(fileBlob);
    link.click();
  }

  prepareWorkBook() {
    const items = this.data;
    const header = this.columns || Object.keys(items[0]);
    const preparedBook = items
      .map(row => Object.values(row).join(this.config.delimiter));

    preparedBook.unshift(header.join(this.config.delimiter));
    return preparedBook.join('\r\n');
  }
}
