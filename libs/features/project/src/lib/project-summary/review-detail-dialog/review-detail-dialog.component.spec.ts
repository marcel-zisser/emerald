import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReviewDetailDialogComponent } from './review-detail-dialog.component';

describe('ReviewDetailDialogComponent', () => {
  let component: ReviewDetailDialogComponent;
  let fixture: ComponentFixture<ReviewDetailDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReviewDetailDialogComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ReviewDetailDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
