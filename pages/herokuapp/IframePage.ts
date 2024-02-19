import { FrameLocator, Locator, Page } from '@playwright/test';
import { BasePage } from '../BasePage';

export class FramePage extends BasePage {
  framelink: Locator;
  framepage: string;
  iframelink: Locator;
  iframepage: string;
  frameblock: FrameLocator;
  textblock: Locator;

  constructor(page: Page) {
    super(page);
    this.frameblock = page.frameLocator('iframe[id="mce_0_ifr"]');
    this.textblock = this.frameblock.locator('body[id="tinymce"]');
  }

  async goToFramePage(): Promise<void> {
    await this.page.goto('https://the-internet.herokuapp.com/iframe');
  }

  async insertText(text: string): Promise<void> {
    await this.textblock.click();
    await this.textblock.fill('');
    await this.textblock.fill(text);
  }

  async getTextFromIframe(): Promise<string | null> {
    return this.textblock.textContent();
  }
}
