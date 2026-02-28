import { test as setup, expect } from '@playwright/test';

setup('authenticate', async ({ page }) => {
  // 1. Buka halaman login dulu, Bre!
  await page.goto('http://127.0.0.1:3000/login'); 

  // 2. Isi form login (sesuaikan kredensialnya)
  await page.getByLabel('Email address').fill('kholil@gmail.com');
  await page.getByLabel('Password').fill('kholil');

  // 3. Baru klik tombol Sign In
  await page.getByRole('button', { name: 'Sign In' }).click();

  // 4. Tunggu sampai beneran masuk dashboard
  await page.waitForURL('**/dashboard'); 
  await expect(page.getByText('Welcome back, kholil')).toBeVisible(); 

  // 5. Simpan session agar project.spec.ts bisa pakai
  await page.context().storageState({ path: './tests/data/user.json' });
});