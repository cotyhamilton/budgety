import { cleanup, render } from "@testing-library/svelte";
import { beforeEach, describe, expect, it } from "vitest";
import Transactions from "./+page.svelte";

describe("Transactions", () => {
	beforeEach(() => cleanup());

	it("should render", async () => {
		const { container } = render(Transactions);
		expect(container).toBeTruthy();
	});
});
