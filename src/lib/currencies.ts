type Currency = {
	[key: string]: {
		decimals: number;
	};
};

export const currencies: Currency = {
	USD: {
		decimals: 2
	},
	EUR: {
		decimals: 2
	}
} as const;
