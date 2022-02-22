import { useState } from 'react';
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
            <Navigation />
			<Currency />
            <main >{props.children}</main>
        </AppContext.Provider>
    );
  }
  

export default Layout;