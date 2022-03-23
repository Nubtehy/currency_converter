export const currenciesListFormatter = (data) => {
	const currencyList = {};
	currencyList["UAH"] = { sale: 1, buy: 1 };
	for (const i in data) {
		if (data[i].base_ccy === "UAH") {
			currencyList[data[i].ccy] = { sale: +data[i].sale, buy: +data[i].buy }
		}
	}

	for (const i in data) {
		if (data[i].base_ccy !== "UAH") {
			const sale = currencyList[data[i].base_ccy].sale;
			const buy = currencyList[data[i].base_ccy].buy;
			currencyList[data[i].ccy] = { sale: data[i].sale * sale, buy: data[i].buy * buy }
		}
	}

	return currencyList
}

export const currencyFormatter = (value, currency) => {
	if (currency === 'BTC') {
		return value.toFixed(10)
	}
	return value.toFixed(4)
}