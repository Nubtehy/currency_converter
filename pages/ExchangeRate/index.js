import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const ExchangeRate = ({ data }) => {

	return (
		<TableContainer component={Paper}>
			<Table sx={{ maxWidth: 650 }} aria-label="simple table">
				<TableHead>
					<TableRow>
						<TableCell align="right">Код валюти </TableCell>
						<TableCell align="right">Код національної валюти</TableCell>
						<TableCell align="right">Курс купівлі</TableCell>
						<TableCell align="right">Курс продажу</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{data.map((row) => (
						<TableRow
							key={row.name}
							sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
						>
							<TableCell component="th" scope="row">
								{row.ccy}
							</TableCell>
							<TableCell align="right">{row.base_ccy}</TableCell>
							<TableCell align="right">{row.buy}</TableCell>
							<TableCell align="right">{row.sale}</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</TableContainer>
	);
}

export async function getServerSideProps() {
	// Fetch data from external API
	const res = await fetch(`https://api.privatbank.ua/p24api/pubinfo?exchange&json&coursid=11`)
	const data = await res.json()
	// Pass data to the page via props
	return { props: { data } }
}

export default ExchangeRate;