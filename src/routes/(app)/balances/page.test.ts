import { describe, expect, it, beforeEach } from "vitest";
import { cleanup, render } from "@testing-library/svelte";
import Balances from "./+page.svelte";

const data = {
	balances: [
		{
			financial_account: 1,
			sum: {
				amount: "1201"
			}
		}
	]
};

describe("Balances", () => {
	beforeEach(() => cleanup());

	it("should render", async () => {
		const { container } = render(Balances, {
			data
		});
		expect(container).toBeTruthy();
	});
});
