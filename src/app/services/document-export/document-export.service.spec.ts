import {TestBed} from '@angular/core/testing';
import {DocumentExportService} from './document-export.service';
import {User} from '../../models/user';
import {Constants} from '../../shared/constants';


describe('DocumentExportService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DocumentExportService = TestBed.get(DocumentExportService);
    expect(service).toBeTruthy();
  });

  it('should export table', () => {
    const expectation = 'Test1,Test2,Test 3,TEST 4,\r\nPrivateUser,Zeph Estes,16120911-6274,-,\r\n';
    const service: DocumentExportService = TestBed.get(DocumentExportService);
    const headerList = ['Test1', 'Test2', 'Test 3', 'TEST 4'];
    const propertyList = ['type', 'name', 'personId', 'vat'];
    const user = new User();
    user.type = Constants.UserType.PrivateUser;
    user.name = 'Zeph Estes';
    user.personId = '16120911-6274';
    const searchResults = [user];

    const result = service.export(searchResults, headerList, propertyList, Constants.FileFormat.Csv);
    expect(result).toBe(expectation);

  });

  it('should export nothing', () => {
    const service: DocumentExportService = TestBed.get(DocumentExportService);
    const result = service.export(null, null, null, 'none');
    expect(result).toBe(undefined);
  });
});
