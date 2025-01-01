import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BasicChecklistDataComponent } from './basic-checklist-data.component';

describe('BasicChecklistDataComponent', () => {
  let component: BasicChecklistDataComponent;
  let fixture: ComponentFixture<BasicChecklistDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BasicChecklistDataComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(BasicChecklistDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
