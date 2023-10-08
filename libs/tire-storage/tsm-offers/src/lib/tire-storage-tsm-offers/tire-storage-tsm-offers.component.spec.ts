import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TireStorageTsmOffersComponent } from './tire-storage-tsm-offers.component';

describe('TireStorageTsmOffersComponent', () => {
  let component: TireStorageTsmOffersComponent;
  let fixture: ComponentFixture<TireStorageTsmOffersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TireStorageTsmOffersComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TireStorageTsmOffersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
