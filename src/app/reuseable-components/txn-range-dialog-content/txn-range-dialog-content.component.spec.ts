import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TxnRangeDialogContentComponent } from './txn-range-dialog-content.component';

describe('TxnRangeDialogContentComponent', () => {
  let component: TxnRangeDialogContentComponent;
  let fixture: ComponentFixture<TxnRangeDialogContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TxnRangeDialogContentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TxnRangeDialogContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
