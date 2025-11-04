import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecipeCardNewComponent } from './recipe-card-new.component';

describe('RecipeCardNewComponent', () => {
  let component: RecipeCardNewComponent;
  let fixture: ComponentFixture<RecipeCardNewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RecipeCardNewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecipeCardNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
