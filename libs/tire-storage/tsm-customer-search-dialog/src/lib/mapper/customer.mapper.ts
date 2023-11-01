import { Customer } from '@nx-shell/tire-storage/tsm-services'

export class CustomerMapper {
  public static fromCustomerFormToCustomer (customerForm: any): Customer {
    const { id, firstName, lastName, gender, address, phoneNumber, email } = customerForm
    console.log(id, firstName, lastName, gender, address, phoneNumber, email)
    return {
      id: id ? id : null,
      firstName,
      lastName,
      gender,
      address,
      phoneNumber,
      email,
    } as Customer
  }
}
