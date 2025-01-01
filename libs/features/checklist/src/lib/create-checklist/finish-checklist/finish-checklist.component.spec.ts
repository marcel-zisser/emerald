import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FinishChecklistComponent } from './finish-checklist.component';

describe('FinishChecklistComponent', () => {
  let component: FinishChecklistComponent;
  let fixture: ComponentFixture<FinishChecklistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FinishChecklistComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FinishChecklistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
