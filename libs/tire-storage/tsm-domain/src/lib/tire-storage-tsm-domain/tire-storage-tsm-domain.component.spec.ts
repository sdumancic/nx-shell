import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TireStorageTsmDomainComponent } from './tire-storage-tsm-domain.component';

describe('TireStorageTsmDomainComponent', () => {
  let component: TireStorageTsmDomainComponent;
  let fixture: ComponentFixture<TireStorageTsmDomainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TireStorageTsmDomainComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TireStorageTsmDomainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
