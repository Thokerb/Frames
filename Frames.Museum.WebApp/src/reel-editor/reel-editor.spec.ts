import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReelEditor } from './reel-editor';

describe('ReelEditor', () => {
  let component: ReelEditor;
  let fixture: ComponentFixture<ReelEditor>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReelEditor]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReelEditor);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
