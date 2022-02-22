import { useState } from 'react';

import Container from '@mui/material/Container';
import Navigation from '../../components/Navigation'
import Currency from '../../components/Currency';
import AppContext from "../../AppContext";

const Layout = (props) => {
	const [operation, setОperation] = useState("buy");
	const [userCurrency, setUserCurrency] = useState("UAH");
	return (
		<AppContext.Provider value={{
			state: {
				operation: operation,
				userCurrency: userCurrency
			},
			setОperation: setОperation,
			setUserCurrency: setUserCurrency,
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