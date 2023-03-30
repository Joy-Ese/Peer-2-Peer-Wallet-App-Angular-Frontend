import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MiniDashboardPageComponent } from './mini-dashboard-page.component';

describe('MiniDashboardPageComponent', () => {
  let component: MiniDashboardPageComponent;
  let fixture: ComponentFixture<MiniDashboardPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MiniDashboardPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MiniDashboardPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
