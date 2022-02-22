import * as React from 'react';
import Box from '@mui/material/Box';
import CalculateIcon from '@mui/icons-material/Calculate';
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';
import { NavigationLink } from '../../elements/NavigationLink';


export const Navigation = () => {

	return (
		<Box sx={{ '& button': { m: 1 } }}>
			<NavigationLink
				component={NavigationLink}
				href="/ExchangeRate"
				icon={<CurrencyExchangeIcon />}
				name="Exchange Rate"
			/>
			<NavigationLink
				component={NavigationLink}
				href="/CurrencyConverter"
				icon={<CalculateIcon />}
				name="Currency Converter"
			/>
		</Box>
	);
}