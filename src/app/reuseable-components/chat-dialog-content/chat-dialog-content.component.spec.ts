import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatDialogContentComponent } from './chat-dialog-content.component';

describe('ChatDialogContentComponent', () => {
  let component: ChatDialogContentComponent;
  let fixture: ComponentFixture<ChatDialogContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChatDialogContentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChatDialogContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
