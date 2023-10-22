export interface UserUi {
  userId: number
  username: string
  password: string
  name: {
    first: string
    last: string
  }
  ssn: string
  dob: Date
  hiredOn: Date
  terminatedOn: Date
  email: string
  officePhone: string
  homePhone: string
  mobilePhone: string
  address: {
    street: string
    city: string
    state: string
    zip: string
  },
  gender: string
  portrait: string
  thumbnail: string
  roles: string[]
}
