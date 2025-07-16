import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClusterHealth } from './cluster-health';

describe('ClusterHealth', () => {
  let component: ClusterHealth;
  let fixture: ComponentFixture<ClusterHealth>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClusterHealth]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClusterHealth);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
