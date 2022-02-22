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
    },[])
    return currencyList;
}, [data]);

  const handleChangeCurrencyFrom = (event) => {
    setCurrencyFrom(event.target.value);
  };

  const handleChangeCurrencyTo = (event) => {
    setCurrencyTo(event.target.value);
  };

  const handleChangeAmount = (event) => {
    if (parseInt(event.target.value) < 0){
        setError({ message: 'Введіть валідне значення', error: true });
    } else {
        setError({ message: '', error: false });
    }  
    setAmount(event.target.value)
  }

  const handleCalculate = () => {
      if (currencyFrom === currencyTo){
          setCurrencyValue(amount)
      } else {
        if (operation === 'buy'){
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
          type="number"
          onChange={handleChangeAmount}
          InputLabelProps={{
            shrink: true,
          }}
          error = {error.error}
          helperText= {error.message}
          variant="standard"
        />
        <TextField
          id="outlined-select-currency"
          select
          value={currencyFrom}
          onChange={handleChangeCurrencyFrom}
          helperText="Оберіть валюту"
        >
          {currencies.map((option) => (
            <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          id="outlined-select-currency"
          select
          value={currencyTo}
          onChange={handleChangeCurrencyTo}
          helperText="Оберіть валюту"
        >
          {currencies.map((option) => (
            <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
          ))}
        </TextField>
        { currencyValue && currencyValue}
        <Button variant="contained" onClick={ handleCalculate }>Розрахувати</Button>
      </div>
    </Box>
  );
}

export default Form;