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
  const parsedUser = user.dateOfBirth.toLocaleDateString('en-gb', { day: '2-digit', month: 'long', year: 'numeric' });
  expect.soft(`${user.name} ${user.lastName}`).toEqual(resultJson['Student Name']);
  expect.soft(user.email).toEqual(resultJson['Student Email']);
  expect.soft(user.gender).toEqual(resultJson['Gender']);
  expect.soft(user.mobile).toEqual(resultJson['Mobile']);
  expect.soft(parsedUser).toEqual(resultJson['Date of Birth'].replace(',', ' '));
  expect.soft(user.subjects.join(', ')).toEqual(resultJson['Subjects']);
  expect.soft(user.hobbies.join(', ')).toEqual(resultJson['Hobbies']);
  expect.soft(user.address.currentAddress).toEqual(resultJson['Address']);
  expect.soft(`${user.address.state} ${user.address.city}`).toEqual(resultJson['State and City']);
});
