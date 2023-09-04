import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OutChatDialogContentComponent } from './out-chat-dialog-content.component';

describe('OutChatDialogContentComponent', () => {
  let component: OutChatDialogContentComponent;
  let fixture: ComponentFixture<OutChatDialogContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OutChatDialogContentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OutChatDialogContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
