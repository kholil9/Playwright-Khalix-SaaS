  import { type Locator, type Page } from '@playwright/test';

  export class LoginPage {
    readonly page: Page;
    readonly emailInput: Locator;
    readonly passwordInput: Locator;
    readonly loginButton: Locator;

    constructor(page: Page) {
      this.page = page;
      this.emailInput = page.getByLabel('Email address');
      this.passwordInput = page.getByLabel('Password');
      this.loginButton = page.getByRole('button', { name: 'Sign In' });
    }

    async goto() {
      await this.page.goto('http://127.0.0.1:3000'); // Menggunakan baseURL dari config
    }

    async login(email: string, pass: string) {
      await this.emailInput.fill(email);
      await this.passwordInput.fill(pass);
      await this.loginButton.click();
    }
  }