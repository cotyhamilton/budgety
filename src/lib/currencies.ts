type Currency = {
	[key: string]: {
		decimals: number;
		symbol: string;
	};
};

export const currencies: Currency = {
	USD: {
		decimals: 2,
		symbol: "$"
	},
	EUR: {
		decimals: 2,
		symbol: "€"
	}
} as const;

export const convertToSubunits = (amount: number, decimals: number) => {
	return amount * Math.pow(10, decimals);
};

export const convertFromSubunits = (amount: number, decimals: number) => {
	return amount / Math.pow(10, decimals);
};

export const formatter = (currencyCode: string) => {
	return new Intl.NumberFormat("en-US", {
		style: "currency",
		currency: currencyCode
	});
};
