import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TireStorageTsmUtilComponent } from './tire-storage-tsm-util.component';

describe('TireStorageTsmUtilComponent', () => {
  let component: TireStorageTsmUtilComponent;
  let fixture: ComponentFixture<TireStorageTsmUtilComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TireStorageTsmUtilComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TireStorageTsmUtilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
