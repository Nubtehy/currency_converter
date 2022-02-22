import { useState } from 'react';
import { Navigation } from '../../components/Navigation'
import { createContext, useContext } from 'react';
import AppContext from "../../AppContext";

export const Layout = (props) => {
    const [operation, setОperation] = useState("buy");
    return (
        <AppContext.Provider value={{
            state: {
              operation: operation,
            },
            setОperation: setОperation,
          }}>
            <Navigation />
            <main >{props.children}</main>
        </AppContext.Provider>
    );
  }
  

export default Layout;