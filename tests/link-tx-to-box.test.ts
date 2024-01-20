import { expect, test } from "./fixtures";

test("can create transaction", async ({ page, navigation }) => {
	await navigation.createAccount();

	await page.getByRole("link", { name: "boxes" }).click();
	await page.getByText("add box").click();
	await page.locator("#name").click();
	await page.locator("#name").fill("☕️ coffee");
	await page.locator("#amount").click();
	await page.locator("#amount").fill("100");
	await page.getByRole("button", { name: "Save changes" }).click();
	await page.getByRole("link", { name: "transactions" }).click();
	await page.getByText("add transaction").click();
	await page.locator("#name").click();
	await page.locator("#name").fill("move money");
	await page.locator("#amount").click();
	await page.locator("#amount").fill("100");
	await page.getByLabel("box").selectOption("☕️ coffee");
	await page.getByRole("button", { name: "Save changes" }).click();

	await expect(page.getByText("safe-to-spend: $900.00")).toBeVisible();

	await page.getByRole("link", { name: "boxes" }).click();

	await expect(page.getByText("☕️ coffee $100.00 / $100.00")).toBeVisible();

	await page.getByRole("link", { name: "transactions" }).click();
	await page.getByText("add transaction").click();
	await page.locator("#name").fill("starbucks");
	await page.locator("#amount").click();
	await page.locator("#amount").fill("-7.99");
	await page.getByLabel("box").selectOption("☕️ coffee");
	await page.getByRole("button", { name: "Save changes" }).click();
	await page.getByRole("link", { name: "boxes" }).click();

	await expect(page.getByText("☕️ coffee $92.01 / $100.00")).toBeVisible();
});
