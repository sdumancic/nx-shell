import { ComponentFixture, TestBed } from '@angular/core/testing'
import { TsmCustomerCrudComponent } from './tsm-customer-crud.component'

describe('TireStorageTsmCustomerCrudComponent', () => {
  let component: TsmCustomerCrudComponent
  let fixture: ComponentFixture<TsmCustomerCrudComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TsmCustomerCrudComponent],
    }).compileComponents()

    fixture = TestBed.createComponent(TsmCustomerCrudComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
