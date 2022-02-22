import Link from 'next/link'
import Button from '@mui/material/Button';

const NavigationLink = ({ href, icon, name }) => {

	return <Link href={href}>
		<Button variant="outlined">{icon} {name}</Button>
	</Link>
}
export default NavigationLink