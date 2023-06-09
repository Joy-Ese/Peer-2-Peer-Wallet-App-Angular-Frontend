import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SetPinDialogContentComponent } from './set-pin-dialog-content.component';

describe('SetPinDialogContentComponent', () => {
  let component: SetPinDialogContentComponent;
  let fixture: ComponentFixture<SetPinDialogContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SetPinDialogContentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SetPinDialogContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
