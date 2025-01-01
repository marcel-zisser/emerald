import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CreateChecklistComponent } from './create-checklist.component';

describe('CreateChecklistComponent', () => {
  let component: CreateChecklistComponent;
  let fixture: ComponentFixture<CreateChecklistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateChecklistComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CreateChecklistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
