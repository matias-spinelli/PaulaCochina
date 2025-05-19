import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmDeleteRecipeDialogComponent } from './confirm-delete-recipe-dialog.component';

describe('ConfirmDeleteRecipeDialogComponent', () => {
  let component: ConfirmDeleteRecipeDialogComponent;
  let fixture: ComponentFixture<ConfirmDeleteRecipeDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ConfirmDeleteRecipeDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConfirmDeleteRecipeDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
