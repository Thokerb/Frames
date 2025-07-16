import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MetricsTable } from './metrics-table';

describe('MetricsTable', () => {
  let component: MetricsTable;
  let fixture: ComponentFixture<MetricsTable>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MetricsTable]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MetricsTable);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
