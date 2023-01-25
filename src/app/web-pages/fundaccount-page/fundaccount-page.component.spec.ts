import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FundaccountPageComponent } from './fundaccount-page.component';

describe('FundaccountPageComponent', () => {
  let component: FundaccountPageComponent;
  let fixture: ComponentFixture<FundaccountPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FundaccountPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FundaccountPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
