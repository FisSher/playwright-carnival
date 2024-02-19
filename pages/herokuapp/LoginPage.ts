import { Locator, Page } from '@playwright/test';
import { BasePage } from '../BasePage';

export class LoginPage extends BasePage {
  loginlink: Locator;
  loginfield: Locator;
  password: Locator;
  submit: Locator;
  logout: Locator;

  constructor(page: Page) {
    super(page);
    this.loginlink = page.locator('a[href="/login"]');
    this.loginfield = page.locator('input[id="username"]');
    this.password = page.locator('input[id="password"]');
    this.submit = page.locator('button[type="submit"]');
    this.logout = page.locator('a[href="/logout"]');
  }

  async goToLoginPage(): Promise<void> {
    await this.page.goto('https://the-internet.herokuapp.com/login');
  }

  async fillLoginDetails(username: string, password: string): Promise<void> {
    await this.loginfield.fill(username);
    await this.password.fill(password);
    await this.submit.click();
  }

  async logOut(): Promise<void> {
    await this.logout.click();
  }
}
