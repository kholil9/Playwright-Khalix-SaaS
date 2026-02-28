import { test, expect } from "../lib/base-test";

test("User berhasil menambah project baru dengan validasi API & UI", async ({ page, projectPage, utils }) => { 
  
  await page.goto("/dashboard");

  // Navigasi & Expect Visual
  await projectPage.sidebar.goToProjects();
  await expect(page).toHaveURL(/.*projects/);

  // Aksi Modal
  await projectPage.openModal();

  // 1. GENERATE NAMA RANDOM DI SINI
  // Kita simpan ke variabel 'dynamicProjectName' agar bisa dipakai di step submit dan assert
  const dynamicProjectName = utils.randomName("Project"); 

  // 2. Submit dengan nama yang sudah random
  await projectPage.fillAndSubmit({
    name: dynamicProjectName, // Pakai variabel random tadi
    desc: "Project manajemen untuk tim Kholil",
    start: utils.getFutureDate(0),
    end: utils.getFutureDate(7),
  });

  // 3. FINAL EXPECT: Cari kartu berdasarkan nama random tersebut
  // Ini bukti sah kalau project yang barusan dibuat beneran muncul di UI
  const projectCard = page.getByText(dynamicProjectName);
  await expect(projectCard).toBeVisible();
});