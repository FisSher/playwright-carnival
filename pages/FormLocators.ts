import { Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class FormLocators extends BasePage {
  firstNameInput: Locator = this.page.locator('input[id="firstName"]');
  lastNameInput: Locator = this.page.locator('input[id="lastName"]');
  emailInput: Locator = this.page.locator('input[id="userEmail"]');
  genderCheckbox = 'input[name="gender"][value="replaceMe"]';
  mobileInput: Locator = this.page.locator('input[id="userNumber"]');
  dateOfBirthInput: Locator = this.page.locator('input[id="dateOfBirthInput"]');
  subjectsCheckbox: Locator = this.page.locator('div[class="subjects-auto-complete__input"]');
  currentAddressInput: Locator = this.page.locator('textarea[id="currentAddress"]');
  stateDropdown: Locator = this.page.locator('div[id="state"]');
  cityDropdown: Locator = this.page.locator('div[id="city"]');
  submitButton: Locator = this.page.locator('button[id="submit"]');
  sportsSelector = 'input[id="hobbies-checkbox-1"]';
  readingSelector = 'input[id="hobbies-checkbox-2"]';
  musicSelector = 'input[id="hobbies-checkbox-3"]';
}
