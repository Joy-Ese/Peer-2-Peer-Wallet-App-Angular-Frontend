import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditProfileDialogContentComponent } from './edit-profile-dialog-content.component';

describe('EditProfileDialogContentComponent', () => {
  let component: EditProfileDialogContentComponent;
  let fixture: ComponentFixture<EditProfileDialogContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditProfileDialogContentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditProfileDialogContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
