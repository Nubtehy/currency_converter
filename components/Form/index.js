import { useMemo, useState, useContext } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import AppContext from "../../AppContext";

const Form = ({ data }) => {
	const context = useContext(AppContext);
	const { operation } = context.state;

	const [currencyFrom, setCurrencyFrom] = useState('');
	const [currencyTo, setCurrencyTo] = useState('');
	const [amount, setAmount] = useState('');
	const [error, setError] = useState({ message: '', error: false });
	const [result, setResult] = useState(0);
	const [inputValue, setInputValue] = useState("");

	const currencies = useMemo(() => {
		const currencyList = data.reduce((acc, currency) => {
			acc[currency.ccy] = { buy: currency.buy, sale: currency.sale }
			return acc
		}, { ["UAH"]: { buy: 1, sale: 1 } })
		return currencyList;
	}, [data]);

	const handleChangeCurrencyFrom = (event) => {
		setCurrencyFrom(event.target.value);
	};

	const handleChangeCurrencyTo = (event) => {
		setCurrencyTo(event.target.value);
	};

	const handleChangeAmount = (event) => {
		const regexp = /(\d+) (\w{3}) in (\w{3})/;
		setInputValue(event.target.value)
		if (event.target.value.length > 0) {
			const amountParset = event.target.value.toLowerCase().match(regexp);

			if (amountParset && amountParset.length > 0) {
				setAmount(amountParset[1])
				setCurrencyFrom(amountParset[2].toLocaleUpperCase())
				setCurrencyTo(amountParset[3].toLocaleUpperCase())
				setError({ message: '', error: false });
			} else {
				setError({ message: 'Введіть валідне значення', error: true });
			}

		} else {
			setError({ message: 'Введіть валідне значення', error: true });
		}

	}

	const handleCalculate = () => {
		if (currencyFrom === currencyTo) {
			setResult(amount)
		} else {
			const result = currencies[currencyFrom][operation] / currencies[currencyTo][operation] * amount

			setResult(result)
		}

	}

	return (
		<Box
			component="form"
			noValidate
			autoComplete="off"
		>
			<Grid container spacing={2}>
				<Grid item xs={6}>
					<TextField
						required
						id="outlined-required"
						label="Введіть значення"
						type="text"
						onChange={handleChangeAmount}
						InputLabelProps={{
							shrink: true,
						}}
						value={inputValue}
						error={error.error}
						helperText={error.message}
					/>
				</Grid>
				<Grid item xs={6} >
					<TextField
						id="outlined-read-only-input"
						label="="
						value={result}
						InputProps={{
							readOnly: true,
						}}
					/>
				</Grid>
				<Grid item xs={12} >
					<Button variant="contained" onClick={handleCalculate} >Розрахувати</Button>
				</Grid>
			</Grid>
		</Box>
	);
}

export default Form;