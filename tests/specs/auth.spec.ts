import { test, expect } from '@playwright/test';

test.describe('Login Flow', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('http://127.0.0.1:3000/login');
    });

    test('should login successfully with valid credentials', async ({ page }) => {
        await page.getByLabel('Email address').fill('kholil@gmail.com');
        await page.getByLabel('Password').fill('kholil');
        await page.getByRole('button', { name: 'Sign In' }).click();

        await expect(page).toHaveURL(/.*dashboard/);


    });
});