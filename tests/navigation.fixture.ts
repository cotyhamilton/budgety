import type { Page } from '@playwright/test';

export class Navigation {
    constructor(public readonly page: Page) { }

    async createAccount() {
        await this.page.goto("/");
        await this.page.getByRole("button", { name: "log in" }).click();
        await this.page.getByPlaceholder("capital one").click();
        await this.page.getByPlaceholder("capital one").fill("capital one");
        await this.page.getByRole("combobox").click();
        await this.page.getByRole("option", { name: "USD" }).click();
        await this.page.getByLabel("current balance").click();
        await this.page.getByLabel("current balance").fill("1000");
        await this.page.getByRole("button", { name: "save" }).click();
    }
}