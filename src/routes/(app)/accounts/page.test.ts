import { cleanup, render } from "@testing-library/svelte";
import { beforeEach, describe, expect, it } from "vitest";
import Accounts from "./+page.svelte";

describe("Accounts", () => {
	beforeEach(() => cleanup());

	it("should render", async () => {
		const { container } = render(Accounts);
		expect(container).toBeTruthy();
	});
});
