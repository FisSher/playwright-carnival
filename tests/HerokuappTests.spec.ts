import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/herokuapp/LoginPage';
import { FramePage } from '../pages/herokuapp/IframePage';

test('login on the login page', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const pageURLlogin = 'https://the-internet.herokuapp.com/login';

  await loginPage.goToLoginPage();
  expect(page.url()).toEqual(pageURLlogin);
  await loginPage.fillLoginDetails(process.env.TESTING_USERNAME!, process.env.USER_PASSWORD!);
  await loginPage.logOut();
});

test('Interact with frames', async ({ page }) => {
  const framePage = new FramePage(page);
  const text = 'Hello World';
  const pageURL = 'https://the-internet.herokuapp.com/iframe';

  await framePage.goToFramePage();
  expect(page.url()).toEqual(pageURL);

  await framePage.insertText(text);
  const iframeText = await framePage.getTextFromIframe();
  expect(iframeText).toEqual(text);
});
