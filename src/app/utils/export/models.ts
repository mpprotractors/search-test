export interface IBook {
  setFileName(name: string);

  setColumns(columns: string[]);

  setData(data: unknown[]);

  exportToFile(): void;
}

export interface IBookConfig {
  delimiter: string;
}

// All of this models should be ok for future xls implementation
