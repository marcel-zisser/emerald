import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BasicProjectDataComponent } from './basic-project-data.component';

describe('BasicProjectDataComponent', () => {
  let component: BasicProjectDataComponent;
  let fixture: ComponentFixture<BasicProjectDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BasicProjectDataComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(BasicProjectDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
