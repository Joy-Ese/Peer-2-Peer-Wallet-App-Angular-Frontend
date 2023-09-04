import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersChatDialogContentComponent } from './users-chat-dialog-content.component';

describe('UsersChatDialogContentComponent', () => {
  let component: UsersChatDialogContentComponent;
  let fixture: ComponentFixture<UsersChatDialogContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UsersChatDialogContentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UsersChatDialogContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
