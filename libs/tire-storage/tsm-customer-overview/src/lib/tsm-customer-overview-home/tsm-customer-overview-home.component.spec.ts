import { ComponentFixture, TestBed } from '@angular/core/testing'
import { TsmCustomerOverviewHomeComponent } from './tsm-customer-overview-home.component'

describe('TireStorageTsmCustomerOverviewComponent', () => {
  let component: TsmCustomerOverviewHomeComponent
  let fixture: ComponentFixture<TsmCustomerOverviewHomeComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TsmCustomerOverviewHomeComponent],
    }).compileComponents()

    fixture = TestBed.createComponent(TsmCustomerOverviewHomeComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
