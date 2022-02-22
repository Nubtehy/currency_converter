import { useMemo, useState, useContext } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import AppContext from "../../AppContext";
import { currenciesListFormatter, currencyFormatter } from "../../utils/helper"


const Form = ({ data }) => {
	const context = useContext(AppContext);
	const { operation } = context.state;

	const [currencyFrom, setCurrencyFrom] = useState('');
	const [currencyTo, setCurrencyTo] = useState('');
	const [amount, setAmount] = useState('');
	const [error, setError] = useState('');
	const [result, setResult] = useState(0);
	const [inputValue, setInputValue] = useState("");

	const currencies = useMemo(() => {
		return currenciesListFormatter(data)
	}, [data]);

	const handleChangeAmount = (event) => {
		const regexp = /^(\d+(\.\d+)?) (\w{3}) in (\w{3})$/;
		setInputValue(event.target.value);

		if (event.target.value.length > 0) {

			const amountParsed = event.target.value.toLowerCase().trim().match(regexp);

			if (amountParsed && amountParsed.length > 0) {
				const currencyFrom = amountParsed[3].toLocaleUpperCase();
				const currencyTo = amountParsed[4].toLocaleUpperCase();
				if (currencies[currencyFrom] && currencies[currencyTo]) {
					setAmount(amountParsed[1])
					setCurrencyFrom(currencyFrom)
					setCurrencyTo(currencyTo)
					setError("")
				}
			} else {
				handleError("Введіть валідне значення");
			}

		} else {
			handleError("Введіть валідне значення");
		}
	}

	const handleCalculate = () => {
		if (currencyFrom && currencyTo) {
			const result = currencies[currencyFrom][operation] / currencies[currencyTo][operation] * amount;
			setResult(result);
		} else {
			handleError("Введіть значення");
		}
	}

	const handleError = (error) => {
		setError(error);
		setAmount(0);
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
						placeholder='15 usd in uah'
						error={!!error}
						helperText={error}
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