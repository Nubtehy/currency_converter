import { useMemo, useState, useContext, useEffect } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/MenuItem';
import AppContext from "../../AppContext";

const fetchCurrrency = async (setCurrenciesList) => {
	const res = await fetch(`https://api.privatbank.ua/p24api/pubinfo?exchange&json&coursid=11`)
	const data = await res.json()
	const currencyList = data.reduce((acc, currency) => {
		acc.push(currency.ccy)
		return acc
	}, ["UAH"])
	setCurrenciesList(currencyList)
}

const Currency = ({ currencies }) => {
	const context = useContext(AppContext);
	const [currenciesList, setCurrenciesList] = useState(['UAH']);
	const { currency } = context.state;
	const { setCurrency } = context;


	const handleChangeCurrency = (event) => {
		setCurrency(event.target.value);
	};
	useEffect(() => {

		fetchCurrrency(setCurrenciesList)
	}, [])
	return (
		<Box
			component="form"
			sx={{
				'& .MuiTextField-root': { m: 1, width: '25ch' },
			}}
			noValidate
			autoComplete="off"
		>
			<div>

				<TextField
					id="outlined-select-currency"
					select
					value={currency}
					defaultValue="UAH"
					onChange={handleChangeCurrency}
					helperText="Ваша валюта"
				>
					{currenciesList.map((option) => (
						<MenuItem key={option} value={option}>
							{option}
						</MenuItem>
					))}
				</TextField>
			</div>
		</Box>
	);
}

export default Currency;