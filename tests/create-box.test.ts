import { expect, test } from "@playwright/test";

test("can create box", async ({ page }) => {
	await page.goto("/");
	await page.getByRole("button", { name: "log in" }).click();
	await page.getByPlaceholder("capital one").click();
	await page.getByPlaceholder("capital one").fill("capital one");
	await page.getByRole("combobox").click();
	await page.getByRole("option", { name: "USD" }).click();
	await page.getByLabel("current balance").click();
	await page.getByLabel("current balance").fill("1000");
	await page.getByRole("button", { name: "save" }).click();
	await page.getByRole("link", { name: "boxes" }).click();
	await page.getByText("add box").click();
	await page.locator("#name").fill("coffee");
	await page.locator("#amount").click();
	await page.locator("#amount").fill("900000");
	await page.getByRole("button", { name: "Save changes" }).click();

	await expect(page.getByText("coffee 0 / 900000")).toBeVisible();
});
