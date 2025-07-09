import { useState, useEffect } from 'react';

import { css } from '@emotion/react';

const paddingStyles = css`
	padding-bottom: 20px;
	padding-top: 10px;
	margin-right: -400px;
`;

type Result = {
	name: string;
	whyImportant: string;
	quote: string;
	link: string;
	image: {
		url: string;
		altText: string;
		credit: string;
	};
};

type NewsHighlightsProps = {
	earliestArticle?: string;
	latestArticle?: string;
	otherNotes?: string;
	results: Result[];
};

const grid = css`
	display: grid;
	grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
	gap: 2rem;
	padding: 2rem;
`;

const card = css`
	background: #fff;
	border-radius: 16px;
	box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
	overflow: hidden;
	display: flex;
	flex-direction: column;
`;

const image = css`
	width: 100%;
	height: 200px;
	object-fit: cover;
`;

const content = css`
	padding: 1.5rem;
	display: flex;
	flex-direction: column;
	gap: 0.75rem;
`;

const name = css`
	font-size: 1.25rem;
	font-weight: 600;
`;

const quote = css`
	font-style: italic;
	color: #444;
`;

const link = css`
	margin-top: auto;
	font-weight: 500;
	color: #0077cc;
	text-decoration: none;

	&:hover {
		text-decoration: underline;
	}
`;

const credit = css`
	font-size: 0.75rem;
	color: #888;
`;

const NewsHighlights = ({ data }: { data: NewsHighlightsProps }) => {
	console.log('NewsHighlights results:', data);
	console.log('NewsHighlights data:', data.results);
	return (
		<div css={grid}>
			{data.results.map((result, index) => (
				<div key={index} css={card}>
					{result.image && (
						<img
							src={result.image.url}
							alt={result.image.altText}
							css={image}
						/>
					)}
					<div css={content}>
						<div css={name}>{result.name}</div>
						<div>{result.whyImportant}</div>
						<div css={quote}>"{result.quote}"</div>
						<a
							href={result.link}
							target="_blank"
							rel="noopener noreferrer"
							css={link}
						>
							Read more →
						</a>
						{result.image && (
							<div css={credit}>{result.image.credit}</div>
						)}
					</div>
				</div>
			))}
		</div>
	);
};

export const TagPageAI = ({ tag }: { tag?: string }) => {
	const emptyData = {
		earliestArticle: 'Loading...',
		latestArticle: 'Loading...',
		otherNotes: 'Loading...',
		results: [
			{
				name: 'Loading...',
				whyImportant: 'Loading...',
				quote: 'Loading...',
				link: 'Loading...',
				image: {
					url: 'Loading...',
					altText: 'Loading...',
					credit: 'Loading...',
				},
			},
		],
	};

	const [localData, setLocalData] = useState<any>(emptyData);

	useEffect(() => {
		fetch(`https://localhost:9000/json/keyorgs?tag=${tag}`)
			.then((response) => response.json())
			.then((data) => {
				setLocalData(data);
				console.log('here is the data', data);
				console.log('data.results');
				console.log('local', localData);
			})
			.catch((error) => {
				console.error('Error fetching from localhost:9000:', error);
			});
	}, []);

	return (
		<div>
			<h1>Who are the key players?</h1>
			<div style={paddingStyles}>
				<pre
					css={css`
						white-space: pre-wrap;
						word-break: break-word;
						padding-bottom: 20px;
					`}
				>
					{/* {localData} */}

					<NewsHighlights data={localData} />
				</pre>
			</div>
		</div>
	);
};
