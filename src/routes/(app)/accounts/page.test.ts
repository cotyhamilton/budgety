import { describe, expect, it, beforeEach } from "vitest";
import { cleanup, render } from "@testing-library/svelte";
import Accounts from "./+page.svelte";

const data = {
	accounts: [
		{
			id: 1,
			name: "Chase",
			currency: {
				code: "USD",
				decimals: 2
			}
		}
	]
};

describe("Accounts", () => {
	beforeEach(() => cleanup());

	it("should render", async () => {
		const { container } = render(Accounts, {
			data
		});
		expect(container).toBeTruthy();
	});
});
