import { cleanup, render } from "@testing-library/svelte";
import { beforeEach, describe, expect, it } from "vitest";
import AccountNavigation from "./account-navigation.svelte";

describe("Account Navigation", () => {
	beforeEach(() => cleanup());

	it("should render", async () => {
		const { container } = render(AccountNavigation);
		expect(container).toBeTruthy();
	});
});
