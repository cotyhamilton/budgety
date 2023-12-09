import { expect, test } from "./fixtures";

test("can create transaction", async ({ page, navigation }) => {
	await navigation.createAccount();

	await page.getByRole("link", { name: "transactions" }).click();
	await page.getByText("add transaction").click();
	await page.locator("#name").click();
	await page.locator("#name").fill("starbucks");
	await page.locator("#amount").click();
	await page.locator("#amount").fill("8.23");
	await page.getByRole("button", { name: "Save changes" }).click();

	await expect(page.getByText("starbucks$8.23")).toBeVisible();
});
