import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatTrnDialogContentComponent } from './chat-trn-dialog-content.component';

describe('ChatTrnDialogContentComponent', () => {
  let component: ChatTrnDialogContentComponent;
  let fixture: ComponentFixture<ChatTrnDialogContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChatTrnDialogContentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChatTrnDialogContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
