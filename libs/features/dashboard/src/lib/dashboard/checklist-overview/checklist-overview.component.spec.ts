import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ChecklistOverviewComponent } from './checklist-overview.component';

describe('ProjectsOverviewComponent', () => {
  let component: ChecklistOverviewComponent;
  let fixture: ComponentFixture<ChecklistOverviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChecklistOverviewComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ChecklistOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
