import {Injectable} from '@angular/core';
import {Constants} from '../../shared/constants';

@Injectable({ providedIn: 'root' })
export class DocumentExportService {

  export(objArray: object[], headerList: string[], propertyList: string[], fileFormat: string): string {
    switch (fileFormat) {
      case Constants.FileFormat.Csv:
        return this.convertToCsv(objArray, headerList, propertyList);
    }
  }

  private convertToCsv(objArray: object[], headerList: string[], propertyList: string[]): string {
    const array = typeof objArray !== 'object' ? JSON.parse(objArray) : objArray;
    let result = '';
    let row = '';

    headerList.forEach((item, index) => {
      row += headerList[index] + ',';
    });
    result += row + '\r\n';
    for (const item of array) {
      let line = '';
      headerList.forEach((listItem, index) => {
        {
          const head = propertyList[index];
          line += (item[head] || '-') + ',';
        }
      });
      result += line + '\r\n';
    }
    return result;
  }
}
