import { expect, test } from "./fixtures";

test("can create transaction", async ({ page, navigation }) => {
	await navigation.createAccount();

	await page.getByRole("link", { name: "boxes" }).click();
	await page.getByText("add box").click();
	await page.locator("#name").click();
	await page.locator("#name").fill("☕️ coffee");
	await page.locator("#goal").click();
	await page.locator("#goal").fill("100");
	await page.getByRole("button", { name: "Save changes" }).click();

	await page.getByRole("link", { name: "transactions" }).click();
	await page.getByText("add transaction").click();
	await page.locator("#name").fill("starbucks");
	await page.locator("#amount").click();
	await page.locator("#amount").fill("7.99");
	await page.getByLabel("from").selectOption("☕️ coffee");
	await page.getByRole("button", { name: "Save changes" }).click();
	await page.getByRole("link", { name: "boxes" }).click();

	await expect(page.getByText("☕️ coffee -$7.99 / $100.00")).toBeVisible();
});
