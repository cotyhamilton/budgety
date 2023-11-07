import { expect, test } from "@playwright/test";

// authenticate
test.beforeEach(async ({ page }) => {
	await page.goto("/");
	if (!process.env.DIRECTUS_EMAIL || !process.env.DIRECTUS_PASSWORD) {
		throw Error("Set admin email and password environment variables");
	}
	await page.getByLabel("email").fill(process.env.DIRECTUS_EMAIL);
	await page.getByLabel("password").fill(process.env.DIRECTUS_PASSWORD);
	await page.getByRole("button", { name: "log in" }).click();
	await page.waitForURL("/accounts");
});

test("accounts", async ({ page }) => {
	await page.goto("/accounts");
	await expect(page.getByRole("heading", { name: "accounts" })).toBeVisible();
});

test("boxes", async ({ page }) => {
	await page.goto("/boxes");
	await expect(page.getByRole("heading", { name: "boxes" })).toBeVisible();
});

test("transactions", async ({ page }) => {
	await page.goto("/transactions");
	await expect(page.getByRole("heading", { name: "transactions" })).toBeVisible();
});
