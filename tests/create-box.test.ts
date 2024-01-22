import { expect, test } from "./fixtures";

test("can create box", async ({ page, navigation }) => {
	await navigation.createAccount();

	await page.getByRole("link", { name: "boxes" }).click();
	await page.getByText("add box").click();
	await page.locator("#name").fill("coffee");
	await page.locator("#goal").click();
	await page.locator("#goal").fill("100");
	await page.getByRole("button", { name: "save" }).click();

	await expect(page.getByText("$100.00 / $100.00")).toBeVisible();
});
