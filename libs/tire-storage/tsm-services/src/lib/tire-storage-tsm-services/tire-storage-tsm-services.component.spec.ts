import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TireStorageTsmServicesComponent } from './tire-storage-tsm-services.component';

describe('TireStorageTsmServicesComponent', () => {
  let component: TireStorageTsmServicesComponent;
  let fixture: ComponentFixture<TireStorageTsmServicesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TireStorageTsmServicesComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TireStorageTsmServicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
