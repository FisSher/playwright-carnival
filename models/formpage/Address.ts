import { faker } from '@faker-js/faker';

export class Address {
  currentAddress: string;
  state: string;
  city: string;

  constructor() {
    this.currentAddress = faker.location.streetAddress({ useFullAddress: true });
    this.fillStateAndCity();
  }

  fillStateAndCity() {
    const stateScoped = faker.helpers.arrayElement(['NCR', 'Uttar Pradesh', 'Haryana', 'Rajasthan']);
    let cityScoped = '';
    switch (stateScoped) {
      case 'NCR':
        cityScoped = faker.helpers.arrayElement(['Delhi', 'Gurgaon', 'Noida']);
        break;
      case 'Uttar Pradesh':
        cityScoped = faker.helpers.arrayElement(['Agra', 'Lucjnow', 'Merrut']);
        break;
      case 'Haryana':
        cityScoped = faker.helpers.arrayElement(['Karnal', 'Panipat']);
        break;
      case 'Rajasthan':
        cityScoped = faker.helpers.arrayElement(['Jaipur', 'Jaiselmer']);
        break;
      default:
        break;
    }
    this.city = cityScoped;
    this.state = stateScoped;
  }
}
