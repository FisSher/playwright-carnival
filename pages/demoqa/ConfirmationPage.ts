import { Page } from '@playwright/test';
import { BasePage } from '../BasePage';

export class ConfirmationPage extends BasePage {
  async getValues(page: Page) {
    let splitValues: string[];
    const myObject = {};
    const values = await page.locator('tbody >> tr').allInnerTexts();
    values.forEach(element => {
      splitValues = element.split('\t');
      myObject[splitValues[0]] = splitValues[1];
    });
    return myObject;
  }
}
