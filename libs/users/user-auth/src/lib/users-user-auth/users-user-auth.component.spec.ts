import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UsersUserAuthComponent } from './users-user-auth.component';

describe('UsersUserAuthComponent', () => {
  let component: UsersUserAuthComponent;
  let fixture: ComponentFixture<UsersUserAuthComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UsersUserAuthComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(UsersUserAuthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
