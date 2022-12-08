// ----- Imports ----- //

import type { FC } from 'react';

// ----- Component ----- //

interface Props {
	title: string;
	cspString: string;
	isEditions?: boolean;
}

const Meta: FC<Props> = ({ title, cspString, isEditions = false }) => (
	<>
		<meta charSet="utf-8" />
		<title>{title}</title>
		<meta id="twitter-theme" name="twitter:widgets:theme" content="light" />
		<meta name="twitter:dnt" content="on" />
		{isEditions ? (
			<meta
				name="viewport"
				content="initial-scale=1, maximum-scale=2, user-scalable=1"
			/>
		) : (
			<meta
				name="viewport"
				content="initial-scale=1, maximum-scale=1, user-scalable=no"
			/>
		)}
		<meta name="description" content={title} />
		{/* <meta httpEquiv="Content-Security-Policy" content={cspString} /> */}
	</>
);

// ----- Exports ----- //

export default Meta;
