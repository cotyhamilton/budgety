import { expect, test } from "@playwright/test";

test("can create account", async ({ page }) => {
	await page.goto("/");
	await page.getByRole("button", { name: "log in" }).click();
	await page.getByPlaceholder("capital one").click();
	await page.getByPlaceholder("capital one").fill("capital one");
	await page.getByRole("combobox").click();
	await page.getByRole("option", { name: "USD" }).click();
	await page.getByRole("button", { name: "save" }).click();

	await expect(page.locator("div").filter({ hasText: /^capital one$/ })).toBeVisible();
});
