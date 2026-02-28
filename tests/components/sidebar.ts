import { Page, Locator, expect } from "@playwright/test";

export class Sidebar {
  readonly page: Page;
  readonly projectsMenu: Locator;
  readonly crmLink: Locator;
  readonly billingLink: Locator;

  constructor(page: Page) {
    this.page = page;
    this.projectsMenu = page.getByRole("link", { name: "Projects" });
    this.crmLink = page.getByRole("link", { name: "CRM" });
    this.billingLink = page.getByRole("link", { name: "Billing" });
  }

  async goToProjects() {
    await this.projectsMenu.click();

    // 1. Tunggu URL berubah agar visualnya sinkron
    await this.page.waitForURL(/.*projects/);

    // 2. PERBAIKAN: Gunakan class yang benar-benar ada (bg-indigo-600)
    // Kita juga bisa pakai aria-current="page" sebagai penanda menu aktif yang lebih akurat
    await expect(this.projectsMenu).toHaveAttribute(
      "class",
      /.*bg-indigo-600.*/,
    );

    // Best Practice: Cek juga atribut aksesibilitasnya
    await expect(this.projectsMenu).toHaveAttribute("aria-current", "page");
  }

  async goToCRM() {
    await this.crmLink.click();
    // Sesuaikan warna class-nya jika aktif (misal bg-indigo-600)
    await expect(this.crmLink).toHaveClass(/bg-indigo-600/);
  }

  // Tambahkan method navigasinya
  async goToBilling() {
    await this.billingLink.click();
    await expect(this.billingLink).toHaveClass(/bg-indigo-600/);
  }
}
