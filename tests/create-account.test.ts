import { expect, test } from "@playwright/test";

test("can create account", async ({ page }) => {
	await page.goto("/");
	await page.getByRole("button", { name: "log in" }).click();
	await page.getByPlaceholder("capital one").click();
	await page.getByPlaceholder("capital one").fill("capital one");
	await page.getByRole("combobox").click();
	await page.getByRole("option", { name: "USD" }).click();
	await page.getByLabel("current balance").click();
	await page.getByLabel("current balance").fill("1000");
	await page.getByRole("button", { name: "save" }).click();

	await expect(page.getByText("capital one $")).toBeVisible();
});
