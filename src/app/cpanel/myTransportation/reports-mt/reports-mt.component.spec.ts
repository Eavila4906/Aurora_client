import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportsMtComponent } from './reports-mt.component';

describe('ReportsMtComponent', () => {
  let component: ReportsMtComponent;
  let fixture: ComponentFixture<ReportsMtComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReportsMtComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReportsMtComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
