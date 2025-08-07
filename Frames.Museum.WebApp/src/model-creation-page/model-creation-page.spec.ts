import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModelCreationPage } from './model-creation-page';

describe('ModelCreationPage', () => {
  let component: ModelCreationPage;
  let fixture: ComponentFixture<ModelCreationPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModelCreationPage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModelCreationPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
