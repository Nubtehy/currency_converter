import { useMemo, useState, useContext } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/MenuItem';
import AppContext from "../../AppContext";

const Form = ({ data }) => {
	const context = useContext(AppContext);
	const { operation } = context.state;

	const [currencyFrom, setCurrencyFrom] = useState('');
	const [currencyTo, setCurrencyTo] = useState('');
	const [amount, setAmount] = useState('');
	const [error, setError] = useState({ message: '', error: false });
	const [currencyValue, setCurrencyValue] = useState(0);

	const currencies = useMemo(() => {
		const currencyList = data.reduce((acc, currency) => {
			acc.push(currency.ccy)
			return acc
		}, ["UAH"])
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
		if (event.target.value.length > 0) {
			const amountParset = event.target.value.toLowerCase().match(regexp);

			if (amountParset.length > 0) {
				setAmount(amountParset[1])
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
			setCurrencyValue(amount)
		} else {
			if (operation === 'buy') {
				console.log(data)
			}
		}

	}

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
					id="standard-number"
					label="Введіть значення"
					type="text"
					onChange={handleChangeAmount}
					InputLabelProps={{
						shrink: true,
					}}
					error={error.error}
					helperText={error.message}
					variant="standard"
				/>

				{currencyValue && currencyValue}
				<Button variant="contained" onClick={handleCalculate}>Розрахувати</Button>
			</div>
		</Box>
	);
}

export default Form;