import { Page, expect } from "@playwright/test";
import { Sidebar } from "../components/sidebar";

export class BillingPage {
  readonly page: Page;
  readonly sidebar: Sidebar;

  constructor(page: Page) {
    this.page = page;
    this.sidebar = new Sidebar(page);
  }

  async selectPlan(planName: 'Basic' | 'Pro' | 'Enterprise') {
    const billingPromise = this.page.waitForResponse(
      (resp) => resp.url().includes('/api/billing/upgrade') && [200, 201].includes(resp.status())
    );

    // 2. Cari kartu berdasarkan Judul di dalam kartu tersebut
    const planCard = this.page.locator('div').filter({ 
      has: this.page.getByRole('heading', { name: planName }) 
    }).first();

    // 3. Klik tombol "Upgrade to [PlanName]" sesuai Snapshot [ref=e112, e179]
    // Kita pakai regex agar fleksibel menangani "Upgrade to Basic" atau "Upgrade to Enterprise"
    await planCard.getByRole('button', { name: new RegExp(`Upgrade to ${planName}`, 'i') }).click();

    return billingPromise;
  }
}