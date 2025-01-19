import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReviewerSelectionDialogComponent } from './reviewer-selection-dialog.component';

describe('ReviewerSelectionDialogComponent', () => {
  let component: ReviewerSelectionDialogComponent;
  let fixture: ComponentFixture<ReviewerSelectionDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReviewerSelectionDialogComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ReviewerSelectionDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
