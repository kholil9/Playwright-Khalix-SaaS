import { test, expect } from "../lib/base-test";

test("User berhasil membuat New Lead dengan data random", async ({ page, crmPage, utils }) => {
  await page.goto("/dashboard");

  // Navigasi ke CRM via Sidebar
  await crmPage.sidebar.goToCRM(); // Pastikan fungsi ini ada di sidebar.ts
  await expect(page).toHaveURL(/.*crm/);

  await crmPage.openNewLeadModal();

  // GENERATE DATA OTOMATIS
  const randomLead = {
    name: utils.randomName("Lead"),
    email: `test_${Math.floor(Math.random() * 1000)}@khalix.com`,
    phone: "0812" + Math.floor(10000000 + Math.random() * 90000000),
    company: utils.randomName("PT Bintang"),
  };

  // Submit Lead
  await crmPage.fillAndSubmitLead(randomLead);

  // Verifikasi Lead baru muncul di tabel
  const leadRow = page.getByText(randomLead.name);
  await expect(leadRow).toBeVisible();
});