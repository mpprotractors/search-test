import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { UserListComponent } from './user-list.component';
import {Component, ViewChild} from '@angular/core';
import {UserListModule} from './user-list.module';
import {User} from '../../../models/user';
import {Merchant} from '../../../models/merchant';

@Component({
  selector: 'app-testing',
  template: `
    <div>
        <app-user-list #component [userList]="[]"></app-user-list>
    </div>`,
})
export class TestingUserListComponent {
  @ViewChild('component', { static : false }) component;
}

describe('UserListComponent', () => {
  let component: UserListComponent;
  let fixture: ComponentFixture<TestingUserListComponent>;
  let fixture2: ComponentFixture<UserListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [UserListModule],
      declarations: [ TestingUserListComponent ]
    })
    .compileComponents().then(() => {
      fixture = TestBed.createComponent(TestingUserListComponent);
      fixture.detectChanges();
      component = fixture.componentInstance.component;
    });
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have user list changed', () => {
    fixture2 = TestBed.createComponent(UserListComponent);
    fixture2.detectChanges();
    fixture2.whenRenderingDone().then(() => {
      fixture2.componentInstance.userList = [new User(), new User()];
      expect(fixture2.componentInstance.userList).toEqual([new User(), new User()]);
    });
  });

  it('should accept user list as input', () => {
    fixture.whenRenderingDone().then(() => {
      expect(component.userList).toBe([]);
    });
  });

  it('should emit', () => {
    const spy = spyOn(component.saveClicked, 'emit');
    component.saveClicked.emit();
    expect(spy).toHaveBeenCalled();
  });

  it('should track ids', () => {
    const mer = new Merchant();
    mer.id = 'asd';
    component.trackById(mer);
    expect(component.trackById).toBe('asd');
    const u = new User();
    u.id = 'asdf';
    component.trackById(u);
    expect(component.trackById).toBe('asdf');
  });
});
