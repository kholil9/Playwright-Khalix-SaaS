import { test as base } from '@playwright/test';
import { LoginPage } from '../pages/LoginPageTemp'; 
import { ProjectPage } from '../pages/ProjectPage';
import { CRMPage } from "../pages/CRMPage";
import { BillingPage } from "../pages/BillingPage";

// Kita definisikan fungsi bantuan di sini
export const generateData = {
  randomName: (prefix: string) => `${prefix} ${Math.random().toString(36).substring(2, 7).toUpperCase()}`,
  getFutureDate: (daysFromNow: number) => {
    const date = new Date();
    date.setDate(date.getDate() + daysFromNow);
    return date.toISOString().split('T')[0];
  }
};

export const test = base.extend<{ 
  loginPage: LoginPage; 
  projectPage: ProjectPage;
  crmPage: CRMPage;
  billingPage: BillingPage;
  utils: typeof generateData; // Tambahkan utils ke dalam fixture
}>({
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },
  projectPage: async ({ page }, use) => {
    await use(new ProjectPage(page));
  },

  crmPage: async ({ page }, use) => {
    await use(new CRMPage(page));
  },

  utils: async ({}, use) => {
    await use(generateData);
  },

  billingPage: async ({ page }, use) => {
    await use(new BillingPage(page));
  },
  
});

export { expect } from '@playwright/test';