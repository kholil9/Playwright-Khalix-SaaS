import { Page, Locator, expect } from '@playwright/test';
import { Sidebar } from '../components/sidebar';

export class ProjectPage {

  readonly page: Page;
  readonly sidebar: Sidebar;
  readonly newProjectBtn: Locator;

  constructor(page: Page) {
    this.page = page;
    this.sidebar = new Sidebar(page);
    this.newProjectBtn = page.getByRole('button', { name: 'New Project' });
  }

  async openModal() {
    await this.newProjectBtn.click();
  }

  async fillAndSubmit(data: { name: string, desc: string, start: string, end: string }) {
    // 1. INTERCEPT tetap di atas
    const responsePromise = this.page.waitForResponse(response => 
      response.url().includes('/api/projects') && response.request().method() === 'POST'
    );

    // 2. Isi Form - Sesuaikan dengan Label di UI
    await this.page.getByLabel('Project Name *').fill(data.name);
    await this.page.getByLabel('Description').fill(data.desc);
    
    // PERBAIKAN: Pakai Label sesuai Snapshot [ref=e14, e15]
    await this.page.getByLabel('Start Date').fill(data.start);
    await this.page.getByLabel('End Date').fill(data.end);

    // 3. Klik Create
    await this.page.getByRole('button', { name: 'Create Project' }).click();

    // 4. ASSERT API
  const response = await responsePromise;
  
  // OPSI 1: Terima 200 atau 201 (Paling Aman)
  expect([200, 201]).toContain(response.status());

  // OPSI 2: Pakai helper bawaan Playwright (Status antara 200-299)
  // expect(response.ok()).toBeTruthy();
  }
}