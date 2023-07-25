import { faker } from '@faker-js/faker';
import { Address } from './Address';

export class User {
  name: string;
  lastName: string;
  email: string;
  gender: string;
  mobile: string;
  dateOfBirth: Date;
  hobbies: string[];
  subjects: string[];
  address: Address;

  constructor() {
    this.name = faker.person.firstName();
    this.lastName = faker.person.lastName();
    this.email = faker.internet.email();
    this.gender = faker.helpers.arrayElement(['Male', 'Female', 'Other']);
    this.mobile = faker.string.numeric({ length: 10, allowLeadingZeros: false });
    this.hobbies = faker.helpers.arrayElements(['Sports', 'Reading', 'Music']);
    this.subjects = faker.helpers.arrayElements(['Maths', 'English', 'Arts', 'History'], { min: 1, max: 4 });
    this.dateOfBirth = faker.date.between({ from: '1970-01-01T00:00:00.000Z', to: '2000-01-01T00:00:00.000Z' });
    this.address = new Address();
  }
}
