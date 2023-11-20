import { expect, test } from "@playwright/test";

test("can create transaction", async ({ page }) => {
	await page.goto("/");
	await page.getByRole("button", { name: "log in" }).click();
	await page.getByPlaceholder("capital one").click();
	await page.getByPlaceholder("capital one").fill("capital one");
	await page.getByRole("combobox").click();
	await page.getByRole("option", { name: "USD" }).click();
	await page.getByLabel("current balance").click();
	await page.getByLabel("current balance").fill("1000");
	await page.getByRole("button", { name: "save" }).click();
	await page.getByRole("link", { name: "transactions" }).click();
	await page.getByText("add transaction").click();
	await page.locator("#name").click();
	await page.locator("#name").fill("starbucks");
	await page.locator("#amount").click();
	await page.locator("#amount").fill("800");
	await page.getByRole("button", { name: "Save changes" }).click();

	await expect(page.getByText("starbucks 800")).toBeVisible();
});
