import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenStmntDialogContentComponent } from './gen-stmnt-dialog-content.component';

describe('GenStmntDialogContentComponent', () => {
  let component: GenStmntDialogContentComponent;
  let fixture: ComponentFixture<GenStmntDialogContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GenStmntDialogContentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GenStmntDialogContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
