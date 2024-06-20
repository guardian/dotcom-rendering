import { LinksFunction, MetaFunction } from '@fastly/remix-server-runtime';
import styles from '~/styles/_index.css';

export const meta: MetaFunction = () => {
	return [
		{ title: 'New Remix App' },
		{ name: 'description', content: 'Welcome to Remix!' },
	];
};

export const links: LinksFunction = () => {
	return [{ rel: 'stylesheet', href: styles }];
};

export default function DcrTest() {
	return (
		<div style={{ fontFamily: 'system-ui, sans-serif', lineHeight: '1.4' }}>
			<h1>DCR test!</h1>
		</div>
	);
}
