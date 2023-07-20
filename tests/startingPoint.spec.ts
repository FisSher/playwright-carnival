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
  await page.goto('/automation-practice-form');
});

test('Fill in the form', async ({ page }) => {
  const formPage = new FormPage(page);
  const user = new User();
  await formPage.fillAndSubmitForm(user);

  const confirmationPage = new ConfirmationPage(page);
  const resultJson = await confirmationPage.getValues(page);
  // https://www.freecodecamp.org/news/how-to-format-dates-in-javascript/
  expect(user.dateOfBirth.toLocaleDateString('en-gb', { day: '2-digit', month: 'long', year: 'numeric' })).toEqual(
    resultJson['Date of Birth'].replace(',', ' '),
  );
});
