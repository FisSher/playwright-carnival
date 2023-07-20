import { Page } from '@playwright/test';
import { User } from '../Models/User';
import { BasePage } from './BasePage';
import { FormLocators } from './FormLocators';

export class FormPage extends BasePage {
  formLocators: FormLocators;

  constructor(page: Page) {
    super(page);
    this.formLocators = new FormLocators(page);
  }

  async goToFormPage() {
    await this.page.goto('https://demoqa.com/automation-practice-form');
  }

  async fillAndSubmitForm(user: User) {
    await this.fillBasicData(user);
    await this.fillBirthDay(user.dateOfBirth);
    await this.selectGender(user.gender);
    await this.fillSubjects(user.subjects);
    await this.selectHobby(user.hobbies);
    await this.selectStateAndCity(user.address.state, user.address.city);
    await this.formLocators.submitButton.click();
  }

  private async fillBasicData(user: User) {
    await this.formLocators.firstNameInput.fill(user.name);
    await this.formLocators.lastNameInput.fill(user.lastName);
    await this.formLocators.emailInput.fill(user.email);
    await this.formLocators.mobileInput.fill(user.mobile);
    await this.formLocators.currentAddressInput.fill(user.address.currentAddress);
  }

  private async selectGender(gender: string) {
    const selector = this.formLocators.genderCheckbox.replace('replaceMe', gender);
    await this.page.locator(selector).setChecked(true, { force: true });
  }

  private async fillBirthDay(birthday: Date) {
    // https://www.freecodecamp.org/news/how-to-format-dates-in-javascript/
    const parsedDate = birthday.toLocaleDateString('en-gb', { day: '2-digit', month: 'short', year: 'numeric' });
    await this.formLocators.dateOfBirthInput.fill(parsedDate);
    await this.page.locator('label[id="dateOfBirth-label"]').click();
  }

  private async fillSubjects(subjects: string[]) {
    for (const subject of subjects) {
      await this.formLocators.subjectsCheckbox.click();
      await this.page.keyboard.type(subject.trim());
      const subjectsDropdown = this.page.locator('div[id="react-select-2-option-0"]');
      await subjectsDropdown.click();
    }
  }

  private getHobbySelector(hobby: string): string {
    switch (hobby) {
      case 'Sports':
        return this.formLocators.sportsSelector;
      case 'Reading':
        return this.formLocators.readingSelector;
      case 'Music':
        return this.formLocators.musicSelector;
      default:
        return '';
    }
  }

  private async selectHobby(hobbies: string[]) {
    let mySelector = '';
    for (const hobby of hobbies) {
      mySelector = this.getHobbySelector(hobby);
      await this.page.locator(mySelector).check({ force: true });
    }
  }

  private async selectStateAndCity(state: string, city: string) {
    await this.formLocators.stateDropdown.click();
    await this.page.locator(`text="${state}"`).click();
    await this.formLocators.cityDropdown.click();
    await this.page.locator(`text="${city}"`).click();
  }
}
