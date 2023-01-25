import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SendmoneyPageComponent } from './sendmoney-page.component';

describe('SendmoneyPageComponent', () => {
  let component: SendmoneyPageComponent;
  let fixture: ComponentFixture<SendmoneyPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SendmoneyPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SendmoneyPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
