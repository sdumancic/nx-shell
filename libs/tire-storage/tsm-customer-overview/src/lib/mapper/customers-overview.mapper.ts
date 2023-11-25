import { CustomersOverviewSearchValues } from '@nx-shell/tire-storage/tsm-domain'
import { Customer } from '@nx-shell/tire-storage/tsm-services'
import { CustomersOverviewSearchResultUi } from '@nx-shell/tire-storage/tsm-ui'
import { Signal } from '@angular/core'

export class CustomersOverviewMapper {

  public static fromFormValuesToSearchValues (formValues: any): CustomersOverviewSearchValues {

    return {
      firstName: formValues.firstName,
      lastName: formValues.lastName,
      gender: formValues.gender,
      street: formValues.street,
      city: formValues.city,
      state: formValues.state,
      zip: formValues.zip,
      phoneNumber: formValues.phoneNumber,
      email: formValues.email
    } as CustomersOverviewSearchValues
  }

  public static fromResourceCollectionToSearchResultUi (resourceCollection: Signal<Customer[]>): CustomersOverviewSearchResultUi[] {

    return resourceCollection().map(resource => {
      return {
        id: resource.id,
        firstName: resource.firstName,
        lastName: resource.lastName,
        gender: resource.gender,
        street: resource.address.street,
        city: resource.address.city,
        state: resource.address.state,
        zip: resource.address.zip,
        phoneNumber: resource.phoneNumber,
        email: resource.email
      } as CustomersOverviewSearchResultUi
    })

  }
}
