import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LogoutDialogContentComponent } from './logout-dialog-content.component';

describe('LogoutDialogContentComponent', () => {
  let component: LogoutDialogContentComponent;
  let fixture: ComponentFixture<LogoutDialogContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LogoutDialogContentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LogoutDialogContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
