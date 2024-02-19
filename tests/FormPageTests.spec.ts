import { expect, test } from '@playwright/test';

import { User } from '../models/formpage/User';
import { PlaywrightBlocker } from '@cliqz/adblocker-playwright';
import fetch from 'cross-fetch'; // required 'fetch' -> adblocker
import { ConfirmationPage } from '../pages/demoqa/ConfirmationPage';
import { FormPage } from '../pages/demoqa/FormPage';

test.beforeEach(async ({ page }) => {
  PlaywrightBlocker.fromPrebuiltAdsAndTracking(fetch).then(blocker => {
    blocker.enableBlockingInPage(page);
  });
  await page.goto('https://demoqa.com/automation-practice-form');
});

test('Fill in the form @ui-testing', async ({ page }) => {
  const confirmationPage = new ConfirmationPage(page);
  const formPage = new FormPage(page);
  const user = new User();

  await formPage.goToFormPage();
  await formPage.fillForm(user);
  await formPage.fillBirthDay(user.dateOfBirth);
  await formPage.selectStateAndCity(user.address.state, user.address.city);
  await formPage.submitButton();

  const resultJson = await confirmationPage.getValues(page);
  expect.soft(`${user.name} ${user.lastName}`).toEqual(resultJson['Student Name']);
  expect.soft(user.email).toEqual(resultJson['Student Email']);
  expect.soft(user.gender).toEqual(resultJson['Gender']);
  expect.soft(user.mobile).toEqual(resultJson['Mobile']);
  const parsedUser = user.dateOfBirth.toLocaleDateString('en-gb', { day: '2-digit', month: 'long', year: 'numeric' });
  expect.soft(parsedUser).toEqual(resultJson['Date of Birth'].replace(',', ' '));
  expect.soft(user.subjects.join(', ')).toEqual(resultJson['Subjects']);
  expect.soft(user.hobbies.join(', ')).toEqual(resultJson['Hobbies']);
  expect.soft(user.address.currentAddress).toEqual(resultJson['Address']);
  expect.soft(`${user.address.state} ${user.address.city}`).toEqual(resultJson['State and City']);
});
