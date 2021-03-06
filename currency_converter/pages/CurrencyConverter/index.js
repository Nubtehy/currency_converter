import { useState } from 'react';
import Box from '@mui/material/Box';
import Form from '../../components/Form';
import Toggle from '../../components/Toggle';

const CurrencyConverter = ({ data }) => {

	return (
		<>
			<Box sx={{ p: 2, gap: 2 }}>
				<Toggle />
			</Box>
			<Box sx={{ p: 2, gap: 2 }}>
				<Form data={data} />
			</Box>
		</>

	);
}

export async function getServerSideProps() {
	// Fetch data from external API
	const res = await fetch(`https://api.privatbank.ua/p24api/pubinfo?exchange&json&coursid=11`)
	const data = await res.json()

	// Pass data to the page via props
	return { props: { data } }
}

export default CurrencyConverter;