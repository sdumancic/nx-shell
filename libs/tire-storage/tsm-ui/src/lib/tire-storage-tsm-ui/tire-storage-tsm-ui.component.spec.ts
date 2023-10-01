import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TireStorageTsmUiComponent } from './tire-storage-tsm-ui.component';

describe('TireStorageTsmUiComponent', () => {
  let component: TireStorageTsmUiComponent;
  let fixture: ComponentFixture<TireStorageTsmUiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TireStorageTsmUiComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TireStorageTsmUiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
