import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchItemComponent } from './search-item.component';
import { Merchant, User } from '../../models';

describe('SearchItemComponent', () => {
  let component: SearchItemComponent;
  let fixture: ComponentFixture<SearchItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SearchItemComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render correct icon for merchant', () => {
    component.data = new Merchant({
      id: 1,
      name: 'test',
      vat: 1234
    });
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('aside').textContent).toContain('🏭');

  });

  it('should render correct icon for user', () => {
    component.data = new User({
      id: 1,
      name: 'test',
      personId: 1234
    });
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('aside').textContent).toContain('😎');

  });

  it('should get correct additional info for merchant', () => {
    component.data = new Merchant({
      id: 1,
      name: 'test',
      vat: 1234
    });

    expect(component.data.additionalInfo).toEqual((<Merchant> component.data).vat);

  });

  it('should render correct name for user', () => {
    component.data = new User({
      id: 1,
      name: 'test',
      personId: 1234
    });
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('.search-item__name').textContent).toContain('test');

  });
});
