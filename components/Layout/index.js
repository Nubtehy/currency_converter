import { useState } from 'react';

import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Grid';

import { Navigation } from '../../components/Navigation'
import Currency from '../../components/Currency';
import AppContext from "../../AppContext";


export const Layout = (props) => {
	const [operation, setОperation] = useState("buy");
	const [currency, setCurrency] = useState("UAH");
	return (
		<AppContext.Provider value={{
			state: {
				operation: operation,
				currency: currency
			},
			setОperation: setОperation,
			setCurrency: setCurrency,
		}}>
			<Container maxWidth="sm">
				<header>
					<Navigation />
					<Currency />
				</header>
				<main >{props.children}</main>
			</Container>
		</AppContext.Provider >
	);
}


export default Layout;