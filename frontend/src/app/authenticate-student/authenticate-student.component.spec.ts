import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthenticateStudentComponent } from './authenticate-student.component';

describe('AuthenticateStudentComponent', () => {
  let component: AuthenticateStudentComponent;
  let fixture: ComponentFixture<AuthenticateStudentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AuthenticateStudentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthenticateStudentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
