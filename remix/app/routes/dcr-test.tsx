import {
	json,
	LinksFunction,
	MetaFunction,
} from '@fastly/remix-server-runtime';
import { useLoaderData } from '@remix-run/react';
import styles from '~/styles/_index.css';
// import { renderHtml } from '../../../dotcom-rendering/src/server/render.article.web';

export const meta: MetaFunction = () => {
	return [
		{ title: 'New Remix App' },
		{ name: 'description', content: 'Welcome to Remix!' },
	];
};

export const links: LinksFunction = () => {
	return [{ rel: 'stylesheet', href: styles }];
};

export const loader = async () => {
	const articleResponse = await fetch(
		'https://www.theguardian.com/politics/article/2024/jun/20/former-tory-minister-vows-to-vote-labour-over-tories-climate-failures.json?dcr',
		{
			backend: 'prod',
		},
	);

	console.info('articleResponse', articleResponse);
	const article = await articleResponse.json();

	return json(article);
};

export default function DcrTest() {
	const article = useLoaderData<typeof loader>();
	// return renderHtml(article);
	return (
		<div style={{ fontFamily: 'system-ui, sans-serif', lineHeight: '1.4' }}>
			<h1>DCR rendered @edge</h1>
			<pre style={{ maxWidth: '100%' }}>
				{JSON.stringify(article, null, 2)}
			</pre>
		</div>
	);
}
