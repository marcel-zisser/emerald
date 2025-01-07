import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FinishProjectComponent } from './finish-project.component';

describe('FinishChecklistComponent', () => {
  let component: FinishProjectComponent;
  let fixture: ComponentFixture<FinishProjectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FinishProjectComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FinishProjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
