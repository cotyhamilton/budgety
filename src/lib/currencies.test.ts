import { describe, expect, it } from "vitest";
import { convertFromSubunits, convertToSubunits, formatter } from "./currencies";

describe("currencie functions", () => {
	it("should convert currency to subunits", async () => {
		expect(convertToSubunits(1000, 2)).toEqual(100000);
	});
	it("should convert currency from subunits", async () => {
		expect(convertFromSubunits(1200000, 3)).toEqual(1200);
	});
	it("should format currency", async () => {
		expect(formatter("USD").format(1000)).toEqual("$1,000.00");
	});
});
