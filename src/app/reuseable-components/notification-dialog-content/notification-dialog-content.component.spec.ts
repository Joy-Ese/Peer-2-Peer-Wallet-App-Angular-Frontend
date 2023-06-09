import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotificationDialogContentComponent } from './notification-dialog-content.component';

describe('NotificationDialogContentComponent', () => {
  let component: NotificationDialogContentComponent;
  let fixture: ComponentFixture<NotificationDialogContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NotificationDialogContentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NotificationDialogContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
