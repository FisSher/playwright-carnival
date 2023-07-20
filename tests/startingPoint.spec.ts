import { expect, test } from '@playwright/test';
import { FormPage } from '../pages/FormPage';
import { User } from '../Models/User';
import { PlaywrightBlocker } from '@cliqz/adblocker-playwright';
import fetch from 'cross-fetch'; // required 'fetch' -> adblocker
import { ConfirmationPage } from '../pages/ConfirmationPage';

test.beforeEach(async ({ page }) => {
  PlaywrightBlocker.fromPrebuiltAdsAndTracking(fetch).then(blocker => {
    blocker.enableBlockingInPage(page);
  });
  await page.goto('https://demoqa.com/automation-practice-form');
});

test('Fill in the form', async ({ page }) => {
  const confirmationPage = new ConfirmationPage(page);
  const user = new User();

  const formPage = new FormPage(page);
  await formPage.goToFormPage();
  await formPage.fillForm(user);
  await formPage.fillBirthDay(user.dateOfBirth);
  await formPage.selectStateAndCity(user.address.state, user.address.city);
  await formPage.submitButton();

  const resultJson = await confirmationPage.getValues(page);
  // https://www.freecodecamp.org/news/how-to-format-dates-in-javascript/
  // Form has a comma (,) that needs to be replaces with a space.
  expect(user.dateOfBirth.toLocaleDateString('en-gb', { day: '2-digit', month: 'long', year: 'numeric' })).toEqual(
    resultJson['Date of Birth'].replace(',', ' '),
  );
});