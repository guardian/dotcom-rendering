import { useState, useEffect } from 'react';

import { css } from '@emotion/react';

const paddingStyles = css`
	padding-bottom: 20px;
	padding-top: 10px;
	margin-right: -400px;
`;

export const TagPageAI = ({ tag }: { tag?: string }) => {
	const [localData, setLocalData] = useState('Loading data...');

	useEffect(() => {
		fetch(`http://localhost:9000/test?tag=${tag}`)
			.then((response) => response.text())
			.then((data) => {
				console.log('Response from localhost:9000:', data);
				setLocalData(data);
				console.log('here is the data', data);
			})
			.catch((error) => {
				console.error('Error fetching from localhost:9000:', error);
			});
	}, []);

	// localData will update asynchronously and trigger re-render
	console.log('localData', localData); // This logs old value on first render

	return (
		<div>
			<h1>Tag Page AI Component</h1>
			<p>This component fetches data from a local server.</p>
			<div style={paddingStyles}>
				<h2>Fetched Data:</h2>
				<pre
					css={css`
						white-space: pre-wrap;
						word-break: break-word;
						padding-bottom: 20px;
					`}
				>
					{localData}
				</pre>
			</div>
		</div>
	);
};
