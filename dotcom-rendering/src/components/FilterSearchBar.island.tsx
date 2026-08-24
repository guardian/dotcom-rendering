import { css } from '@emotion/react';
import { space, textSans14, textSans17 } from '@guardian/source/foundations';
import { useEffect, useRef, useState } from 'react';

interface GuardianImageAsset {
	type: string;
	file: string;
	typeData?: {
		altText?: string;
	};
}

interface GuardianElement {
	id: string;
	relation: string;
	type: string;
	assets: GuardianImageAsset[];
}

interface GuardianSearchResult {
	id: string;
	type: string;
	sectionId: string;
	sectionName: string;
	webPublicationDate: string;
	webTitle: string;
	webUrl: string;
	apiUrl: string;
	isHosted: boolean;
	pillarId: string;
	pillarName: string;
	elements?: GuardianElement[];
}

interface GuardianSearchResponse {
	response: {
		status: string;
		total: number;
		results: GuardianSearchResult[];
	};
}

const getMainImage = (
	result: GuardianSearchResult,
): GuardianImageAsset | undefined => {
	const mainElement = result.elements?.find(
		(element) => element.relation === 'main',
	);
	return mainElement?.assets[0];
};

const wrapperStyles = css`
	position: relative;
	width: 100%;
	max-width: 480px;
	justify-self: center;
	padding: 10px;
`;

const inputContainerStyles = css`
	display: flex;
	align-items: center;
	gap: ${space[2]}px;
	background: rgba(255, 255, 255, 0.92);
	border-radius: 24px;
	padding: ${space[1]}px ${space[4]}px;
	box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
	transition: box-shadow 0.15s ease;

	&:focus-within {
		box-shadow: 0 2px 12px rgba(0, 0, 0, 0.3);
	}

	svg {
		flex-shrink: 0;
		fill: #767676;
	}
`;

const inputStyles = css`
	${textSans17};
	flex-grow: 1;
	border: none;
	outline: none;
	background: transparent;
	color: #121212;
	padding: ${space[2]}px 0;

	&::placeholder {
		color: #767676;
	}
`;

const resultsStyles = css`
	position: absolute;
	top: calc(100% + ${space[2]}px);
	left: 0;
	right: 0;
	z-index: 10;
	background: #ffffff;
	border-radius: 12px;
	max-height: 420px;
	overflow-y: auto;
	list-style: none;
	margin: 0;
	padding: ${space[1]}px;
	box-shadow: 0 4px 20px rgba(0, 0, 0, 0.25);
`;

const resultItemStyles = css`
	& + & {
		border-top: 1px solid #ececec;
	}
`;

const resultLinkStyles = css`
	display: flex;
	align-items: center;
	gap: ${space[3]}px;
	padding: ${space[2]}px;
	text-decoration: none;
	color: #121212;
	border-radius: 8px;

	&:hover {
		background: #f6f6f6;
	}
`;

const thumbnailStyles = css`
	width: 64px;
	height: 64px;
	object-fit: cover;
	border-radius: 6px;
	flex-shrink: 0;
	background: #ececec;
`;

const resultTitleStyles = css`
	${textSans14};
	display: block;
	font-weight: 700;
`;

const resultDateStyles = css`
	display: block;
	font-size: 12px;
	color: #767676;
	margin-top: 2px;
`;

const noResultsStyles = css`
	${textSans14};
	display: block;
	padding: ${space[3]}px;
	color: #767676;
	text-align: center;
`;

const DEBOUNCE_MS = 300;

export const FilterSearchBar = () => {
	const [query, setQuery] = useState('');
	const [results, setResults] = useState<GuardianSearchResult[]>([]);
	const [loading, setLoading] = useState(false);
	const [showResults, setShowResults] = useState(false);
	const wrapperRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (
				wrapperRef.current &&
				!wrapperRef.current.contains(event.target as Node)
			) {
				setShowResults(false);
			}
		};
		document.addEventListener('mousedown', handleClickOutside);
		return () =>
			document.removeEventListener('mousedown', handleClickOutside);
	}, []);

	useEffect(() => {
		const trimmed = query.trim();

		if (!trimmed) {
			setResults([]);
			setShowResults(false);
			return;
		}

		let cancelled = false;
		const timeoutId = setTimeout(async () => {
			setLoading(true);
			try {
				const response = await fetch(
					`https://content.guardianapis.com/search?section=thefilter&show-elements=image&q=${encodeURIComponent(
						trimmed,
					)}&api-key=`,
				);
				const data: GuardianSearchResponse = await response.json();
				if (!cancelled) {
					setResults(data.response.results);
					setShowResults(true);
				}
			} catch (error) {
				if (!cancelled) {
					console.error('Guardian search failed', error);
				}
			} finally {
				if (!cancelled) {
					setLoading(false);
				}
			}
		}, DEBOUNCE_MS);

		return () => {
			cancelled = true;
			clearTimeout(timeoutId);
		};
	}, [query]);

	return (
		<div css={wrapperStyles} ref={wrapperRef}>
			<div css={inputContainerStyles}>
				<input
					css={inputStyles}
					type="text"
					value={query}
					onChange={(e) => setQuery(e.target.value)}
					onFocus={() => {
						if (results.length > 0) setShowResults(true);
					}}
					placeholder="Search The Filter..."
					aria-label="Search The Filter"
				/>
			</div>
			{showResults && results.length > 0 && (
				<ul css={resultsStyles}>
					{results.map((result) => {
						const image = getMainImage(result);
						return (
							<li key={result.id} css={resultItemStyles}>
								<a css={resultLinkStyles} href={result.webUrl}>
									{image && (
										<img
											css={thumbnailStyles}
											src={image.file}
											alt={image.typeData?.altText ?? ''}
										/>
									)}
									<span>
										<span css={resultTitleStyles}>
											{result.webTitle}
										</span>
										<span css={resultDateStyles}>
											{new Date(
												result.webPublicationDate,
											).toLocaleDateString('en-GB')}
										</span>
									</span>
								</a>
							</li>
						);
					})}
				</ul>
			)}
			{showResults && !loading && results.length === 0 && (
				<ul css={resultsStyles}>
					<li>
						<span css={noResultsStyles}>No results found</span>
					</li>
				</ul>
			)}
		</div>
	);
};
