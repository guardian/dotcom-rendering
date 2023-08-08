import { useState } from 'react';
import { createRoot } from 'react-dom/client';
import { Comments } from './Comments';
import type { CAPIPillar } from './discussionTypes';
import { pillarToEnum } from './lib/pillarToEnum';

const getQueryParam = (queryParam: string, defaultValue: string): string =>
	new URLSearchParams(window.location.search).get(queryParam) ?? defaultValue;

const pillars: CAPIPillar[] = [
	'news',
	'sport',
	'opinion',
	'culture',
	'lifestyle',
	'labs',
];
const isPillar = (s: string): s is CAPIPillar =>
	//@ts-expect-error -- we’re creating a type predicate
	pillars.includes(s);

const paramPillar = getQueryParam('pillar', 'news');

const IndexPageWrapper = () => {
	// const [page, setPage] = useState(1);
	const [closed, setClosed] = useState<boolean>(
		getQueryParam('closedForComments', 'false') === 'true',
	);
	const [expanded, setExpanded] = useState<boolean>(
		getQueryParam('expanded', 'true') === 'true',
	);
	const [id, setId] = useState(getQueryParam('id', '39f5z'));
	const [pillar, setPillar] = useState<CAPIPillar>(
		isPillar(paramPillar) ? paramPillar : 'news',
	);

	// Only render when we have checked the query params
	if (id === '') {
		return null;
	}

	return (
		<>
			<h1>Discussion-rendering Test Page</h1>
			<p>
				Set a specific discussion using the id in a query param like{' '}
				<a href="?id=32255&closedForComments=true&pillar=opinion">
					?id=32255&closedForComments=true&pillar=opinion
				</a>
				.
			</p>

			<div className="options">
				<button
					name="expanded"
					onClick={() => setExpanded(!expanded)}
					type="button"
				>
					{expanded ? 'collapse' : 'expand'}
				</button>

				<div>
					<label htmlFor="closed">
						{closed ? 'Closed' : 'Open'} for comment
					</label>
					<button
						name="closed"
						onClick={() => setClosed(!closed)}
						type="button"
					>
						click to {closed ? 'open' : 'close'}
					</button>
				</div>

				<input
					name="id"
					type="text"
					value={id}
					onChange={(e) => setId(e.target.value)}
				/>
				<select
					name="pillar"
					value={pillar}
					onChange={(e) => {
						const selectedPillar = e.target.value;
						const validPillar = isPillar(selectedPillar)
							? selectedPillar
							: 'news';
						setPillar(validPillar);
					}}
				>
					{pillars.map((aPillar) => (
						<option key={aPillar} value={aPillar}>
							{aPillar}
						</option>
					))}
				</select>
			</div>

			<hr />
			<main>
				<Comments
					baseUrl="https://discussion.theguardian.com/discussion-api"
					pillar={pillarToEnum(pillar)}
					isClosedForComments={closed}
					shortUrl={`/p/${id}`}
					additionalHeaders={{
						'D2-X-UID': 'testD2Header',
						'GU-Client': 'testClientHeader',
					}}
					expanded={expanded}
					onPermalinkClick={() => {}}
					apiKey="discussion-rendering"
					initialPage={1}
					idApiUrl="https://idapi.theguardian.com"
					// page={page}
					// onPageChange={setPage}
				/>
			</main>
			<hr />
		</>
	);
};

const container = document.createElement('div');
document.body.appendChild(container);

const root = createRoot(container);
root.render(<IndexPageWrapper />);
