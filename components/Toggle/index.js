import { useState, useContext, createContext } from 'react';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import AppContext from "../../AppContext";

const Toggle = () => {
	const context = useContext(AppContext);

	const { operation } = context.state;
	const { setОperation } = context;


	const handleChange = (event, value) => {
		context.setОperation(value);
	};

	return (
		<ToggleButtonGroup
			color="primary"
			value={operation}
			exclusive
			onChange={handleChange}
		>
			<ToggleButton value="buy">Купити</ToggleButton>
			<ToggleButton value="sale">Продати</ToggleButton>
		</ToggleButtonGroup>
	);
}

export default Toggle