import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SetSecquestDialogContentComponent } from './set-secquest-dialog-content.component';

describe('SetSecquestDialogContentComponent', () => {
  let component: SetSecquestDialogContentComponent;
  let fixture: ComponentFixture<SetSecquestDialogContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SetSecquestDialogContentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SetSecquestDialogContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
