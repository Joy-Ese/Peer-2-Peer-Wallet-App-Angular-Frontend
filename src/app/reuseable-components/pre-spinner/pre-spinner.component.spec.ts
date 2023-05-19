import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreSpinnerComponent } from './pre-spinner.component';

describe('PreSpinnerComponent', () => {
  let component: PreSpinnerComponent;
  let fixture: ComponentFixture<PreSpinnerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PreSpinnerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PreSpinnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
