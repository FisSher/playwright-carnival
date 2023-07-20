import { Page } from '@playwright/test';

export class ConfirmationPage {
  page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async getValues(page: Page) {
    let splitValues: string[]; // Define a helper
    const myObject = {};
    const values = await page.locator('tbody >> tr').allInnerTexts(); // See in debug mode what does this return us so you understand the following code
    values.forEach(element => {
      splitValues = element.split('\t'); // This will split the values in that tab and create an array of 2 elements
      myObject[splitValues[0]] = splitValues[1];
    });
    return myObject;
  }
}
