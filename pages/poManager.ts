import { chromium, Browser, BrowserContext, Page } from '@playwright/test';

export class PageObjectManager {
  private browser: Browser | undefined;
  private context: BrowserContext | undefined;
  private page: Page | undefined;

  // Launch browser, create context & page
  async init() {
    this.browser = await chromium.launch({ headless: false });
    this.context = await this.browser.newContext();
    this.page = await this.context.newPage();
  }

  getBrowser(): Browser {
    if (!this.browser) throw new Error('Browser not initialized. Call init() first.');
    return this.browser;
  }

  getContext(): BrowserContext {
    if (!this.context) throw new Error('Context not initialized. Call init() first.');
    return this.context;
  }

  getPage(): Page {
    if (!this.page) throw new Error('Page not initialized. Call init() first.');
    return this.page;
  }

  async close() {
    await this.browser?.close();
  }
}
