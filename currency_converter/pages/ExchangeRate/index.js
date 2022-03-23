import { useMemo, useContext } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import AppContext from "../../AppContext";
import { currenciesListFormatter, currencyFormatter } from "../../utils/helper"



const ExchangeRate = ({ data }) => {
	const context = useContext(AppContext);
	const { userCurrency } = context.state;

	const currencyList = useMemo(() => {
		return currenciesListFormatter(data)
	},[data])

	return true ? (
		<TableContainer component={Paper}>
			<Table aria-label="simple table">
				<TableHead>
					<TableRow>
						<TableCell align="right">Код валюти </TableCell>
						<TableCell align="right">Курс купівлі</TableCell>
						<TableCell align="right">Курс продажу</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{
						Object.keys(currencyList).map(function (key, index) {

							return <TableRow
								key={key}
								sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
							>
								<TableCell component="th" scope="row">
									{key}
								</TableCell>
								<TableCell align="right">{currencyFormatter(currencyList[key].buy / currencyList[userCurrency].buy, userCurrency)}</TableCell>
								<TableCell align="right">{currencyFormatter(currencyList[key].sale / currencyList[userCurrency].sale, userCurrency)}</TableCell>
							</TableRow>
						})
					}
				</TableBody>
			</Table>
		</TableContainer>) : (<div>Щось пішло не так :(</div>)
}

export async function getServerSideProps() {
	// Fetch data from external API
	const res = await fetch(`https://api.privatbank.ua/p24api/pubinfo?exchange&json&coursid=11`)
	const data = await res.json()
	// Pass data to the page via props
	return { props: { data } }
}

export default ExchangeRate;