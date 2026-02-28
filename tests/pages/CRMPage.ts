import { Page, expect } from "@playwright/test";
import { Sidebar } from "../components/sidebar";

export class CRMPage {
  readonly page: Page;
  readonly sidebar: Sidebar;

  constructor(page: Page) {
    this.page = page;
    this.sidebar = new Sidebar(page);
  }

  async openNewLeadModal() {
    await this.page.getByRole('button', { name: 'New Lead' }).click();
  }

  async fillAndSubmitLead(data: { name: string; email: string; phone: string; company: string }) {
    // 1. Intercept: Buat fleksibel (terima 200 atau 201)
    const createLeadPromise = this.page.waitForResponse(
      (resp) => resp.url().includes('/leads') && [200, 201].includes(resp.status())
    );

    // 2. Isi field sesuai Label di Snapshot [ref=e9, e11, e14, e16]
    await this.page.getByLabel('Name *').fill(data.name);
    await this.page.getByLabel('Email *').fill(data.email);
    await this.page.getByLabel('Phone').fill(data.phone);
    await this.page.getByLabel('Company').fill(data.company);

    // 3. Klik tombol sesuai nama di Snapshot [ref=e20]
    await this.page.getByRole('button', { name: 'Create Lead' }).click();

    return createLeadPromise;
  }
}