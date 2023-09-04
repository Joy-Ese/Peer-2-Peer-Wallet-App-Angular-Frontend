import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FindContactPageComponent } from './find-contact-page.component';

describe('FindContactPageComponent', () => {
  let component: FindContactPageComponent;
  let fixture: ComponentFixture<FindContactPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FindContactPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FindContactPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
