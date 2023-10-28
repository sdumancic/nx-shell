export interface UserUi {
  userId: number | null
  username: string
  password?: string
  name: {
    first: string
    last: string
  }
  ssn: string | null
  dob: Date | null
  hiredOn: Date | null
  terminatedOn: Date | null
  email: string | null
  officePhone: string | null
  homePhone: string | null
  mobilePhone: string | null
  address: AddressUi[],
  gender: string | null
  portrait: string | null
  thumbnail: string | null
  roles: string[]
}

export interface AddressUi {
  type: string
  street: string | null
  city: string | null
  state: string | null
  zip: string | null
}
