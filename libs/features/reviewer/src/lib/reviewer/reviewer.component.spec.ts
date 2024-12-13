import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReviewerComponent } from './reviewer.component';

describe('ReviewerComponent', () => {
  let component: ReviewerComponent;
  let fixture: ComponentFixture<ReviewerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReviewerComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ReviewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
