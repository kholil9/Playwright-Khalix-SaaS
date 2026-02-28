import { test, expect } from "../lib/base-test";

const plans = ['Basic', 'Pro', 'Enterprise'] as const;

for (const plan of plans) {
  test(`User berhasil melakukan pembayaran paket ${plan}`, async ({ page, billingPage }) => {
    await page.goto("/dashboard");
    await billingPage.sidebar.goToBilling();

    // Pilih paket
    await billingPage.selectPlan(plan);

    // Verifikasi status plan berubah di UI
    // Sesuaikan dengan elemen yang muncul setelah sukses, misal Badge "Current Plan"
    const currentPlanBadge = page.getByText(`Current Plan: ${plan}`, { exact: false });
    await expect(currentPlanBadge).toBeVisible();
  });
}