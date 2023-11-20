import { test as base } from "@playwright/test";
import { Navigation } from "./navigation.fixture";

type Fixtures = {
	navigation: Navigation;
};

export const test = base.extend<Fixtures>({
	navigation: async ({ page }, use) => {
		const navigation = new Navigation(page);
		await use(navigation);
	}
});

export { expect } from "@playwright/test";
