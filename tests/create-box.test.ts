import { expect, test } from "./fixtures";

test("can create box", async ({ page, navigation }) => {
	await navigation.createAccount();

	await page.getByRole("link", { name: "boxes" }).click();
	await page.getByText("add box").click();
	await page.locator("#name").fill("coffee");
	await page.locator("#amount").click();
	await page.locator("#amount").fill("100");
	await page.getByRole("button", { name: "Save changes" }).click();

	await expect(page.getByText("coffee $0.00 / $100.00")).toBeVisible();
});
