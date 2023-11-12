import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TsmDurationCalculationInfoUiComponent } from './tsm-duration-calculation-info-ui.component';

describe('TsmDurationCalculationInfoUiComponent', () => {
  let component: TsmDurationCalculationInfoUiComponent;
  let fixture: ComponentFixture<TsmDurationCalculationInfoUiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TsmDurationCalculationInfoUiComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TsmDurationCalculationInfoUiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
