import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreOutChatDialogContentComponent } from './pre-out-chat-dialog-content.component';

describe('PreOutChatDialogContentComponent', () => {
  let component: PreOutChatDialogContentComponent;
  let fixture: ComponentFixture<PreOutChatDialogContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PreOutChatDialogContentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PreOutChatDialogContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
