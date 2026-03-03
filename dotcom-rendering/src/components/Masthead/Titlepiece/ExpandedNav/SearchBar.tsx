import { css } from '@emotion/react';
import {
	from,
	palette as sourcePalette,
	space,
	textSans12,
	textSans15,
	textSansBold14,
} from '@guardian/source/foundations';
import {
	Button,
	Label,
	SvgArrowRightStraight,
	SvgMagnifyingGlass,
	TextInput,
} from '@guardian/source/react-components';
import { useCallback, useEffect, useRef, useState } from 'react';
import { nestedOphanComponents } from '../../../../lib/ophan-helpers';
import { palette as themePalette } from '../../../../palette';

const searchBar = css`
	box-sizing: border-box;
	display: block;
	margin-left: ${space[4]}px;
	max-width: 380px;
	position: relative;
	margin-bottom: 24px;
	margin-right: 41px;
	padding-bottom: 15px;
	${from.desktop} {
		margin: 0;
	}
`;

const searchInput = css`
	${textSans15}
	background-color: ${themePalette('--nav-search-bar-background')};
	border: 0;
	border-radius: 1000px;
	box-sizing: border-box;
	color: ${themePalette('--nav-search-bar-text')};
	height: 36px;
	padding-left: 38px;
	vertical-align: middle;
	width: 100%;
	&::placeholder {
		color: ${themePalette('--nav-search-bar-text')};
	}
	&:focus {
		padding-right: 40px;
		&::placeholder {
			opacity: 0;
		}
	}
	&:focus ~ button {
		background-color: transparent;
		opacity: 1;
		pointer-events: all;
	}
`;

const searchGlass = css`
	position: absolute;
	left: 7px;
	top: 7px;
	fill: ${themePalette('--nav-search-bar-icon')};
`;

const searchSubmit = css`
	background: transparent;
	border: 0;
	bottom: 0;
	cursor: pointer;
	display: block;
	opacity: 0;
	pointer-events: none;
	position: absolute;
	right: 0;
	top: 0;
	width: 50px;
	fill: ${themePalette('--nav-search-bar-icon')};
	&:focus,
	&:active {
		opacity: 0;
		pointer-events: all;
	}
	&::before {
		height: 12px;
		top: ${space[3]}px;
		width: 12px;
	}
	&::after {
		border-right: 0;
		top: 17px;
		width: 20px;
	}
`;

const searchResultsDropdown = css`
	position: absolute;
	top: 42px;
	left: 0;
	right: 0;
	background: ${sourcePalette.neutral[10]};
	border-radius: 8px;
	box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
	z-index: 1000;
	max-height: 400px;
	overflow-y: auto;
`;

const searchResultItem = css`
	display: flex;
	align-items: flex-start;
	padding: ${space[2]}px ${space[3]}px;
	text-decoration: none;
	border-bottom: 1px solid ${sourcePalette.neutral[20]};
	transition: background-color 0.15s;

	&:hover {
		background-color: ${sourcePalette.neutral[20]};
	}

	&:last-child {
		border-bottom: none;
	}
`;

const resultThumbnail = css`
	width: 80px;
	height: 48px;
	object-fit: cover;
	border-radius: 4px;
	margin-right: ${space[3]}px;
	flex-shrink: 0;
`;

const resultContent = css`
	flex: 1;
	min-width: 0;
`;

const resultHeadline = css`
	${textSansBold14}
	color: ${sourcePalette.neutral[100]};
	margin: 0 0 ${space[1]}px 0;
	line-height: 1.3;
	display: -webkit-box;
	-webkit-line-clamp: 2;
	-webkit-box-orient: vertical;
	overflow: hidden;
`;

const resultMeta = css`
	${textSans12}
	color: ${sourcePalette.neutral[60]};
	display: flex;
	align-items: center;
	gap: ${space[2]}px;
`;

const resultPillar = css`
	text-transform: uppercase;
	font-weight: bold;
`;

const loadingText = css`
	${textSans15}
	color: ${sourcePalette.neutral[60]};
	padding: ${space[3]}px;
	text-align: center;
`;

const noResultsText = css`
	${textSans15}
	color: ${sourcePalette.neutral[60]};
	padding: ${space[3]}px;
	text-align: center;
`;

interface SearchResult {
	id: string;
	webTitle: string;
	webUrl: string;
	sectionName?: string;
	pillarName?: string;
	fields?: {
		thumbnail?: string;
		trailText?: string;
	};
}

const pillarColors: Record<string, string> = {
	News: sourcePalette.news[400],
	Opinion: sourcePalette.opinion[400],
	Sport: sourcePalette.sport[400],
	Culture: sourcePalette.culture[400],
	Lifestyle: sourcePalette.lifestyle[400],
};

interface CAPISearchResponse {
	response?: {
		results?: SearchResult[];
	};
}

export const SearchBar = () => {
	const searchId = 'gu-search';
	const [query, setQuery] = useState('');
	const [results, setResults] = useState<SearchResult[]>([]);
	const [isLoading, setIsLoading] = useState(false);
	const [showResults, setShowResults] = useState(false);
	const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
	const containerRef = useRef<HTMLFormElement>(null);

	const searchCAPI = useCallback(async (searchQuery: string) => {
		if (searchQuery.length < 2) {
			setResults([]);
			setShowResults(false);
			return;
		}

		setIsLoading(true);
		setShowResults(true);

		try {
			const response = await fetch(
				`https://content.guardianapis.com/search?q=${encodeURIComponent(
					searchQuery,
				)}&show-fields=thumbnail,trailText&page-size=5&api-key=test`,
			);
			const data = (await response.json()) as CAPISearchResponse;

			if (data.response?.results) {
				setResults(data.response.results);
			} else {
				setResults([]);
			}
		} catch {
			setResults([]);
		} finally {
			setIsLoading(false);
		}
	}, []);

	const handleInputChange = useCallback(
		(e: React.ChangeEvent<HTMLInputElement>) => {
			const value = e.target.value;
			setQuery(value);

			// Debounce the search
			if (debounceRef.current) {
				clearTimeout(debounceRef.current);
			}

			debounceRef.current = setTimeout(() => {
				void searchCAPI(value);
			}, 300);
		},
		[searchCAPI],
	);

	// Close dropdown when clicking outside
	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (
				containerRef.current &&
				!containerRef.current.contains(event.target as Node)
			) {
				setShowResults(false);
			}
		};

		document.addEventListener('mousedown', handleClickOutside);
		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, []);

	return (
		<form
			ref={containerRef}
			css={searchBar}
			action="https://www.google.co.uk/search"
		>
			<TextInput
				hideLabel={true}
				label="Search input"
				cssOverrides={searchInput}
				name="q"
				placeholder="Search the Guardian"
				data-link-name={nestedOphanComponents('header', 'search')}
				className="selectableMenuItem"
				tabIndex={-1}
				id={searchId}
				value={query}
				onChange={handleInputChange}
				onFocus={() => {
					if (results.length > 0) setShowResults(true);
				}}
				autoComplete="off"
			/>

			<Label hideLabel={true} text="google-search" htmlFor={searchId}>
				<div css={searchGlass}>
					<SvgMagnifyingGlass
						isAnnouncedByScreenReader={true}
						size="medium"
					/>
				</div>
			</Label>
			<Button
				icon={
					<SvgArrowRightStraight
						isAnnouncedByScreenReader={false}
						size="medium"
					/>
				}
				aria-label="Search with Google"
				cssOverrides={searchSubmit}
				data-link-name={nestedOphanComponents(
					'header',
					'search',
					'submit',
				)}
				type="submit"
				tabIndex={-1}
			></Button>
			<input
				type="hidden"
				name="as_sitesearch"
				value="www.theguardian.com"
			/>

			{/* Live Search Results Dropdown */}
			{showResults && (
				<div css={searchResultsDropdown}>
					{isLoading && <div css={loadingText}>Searching...</div>}
					{!isLoading &&
						results.length === 0 &&
						query.length >= 2 && (
							<div css={noResultsText}>
								No results found. Press Enter to search with
								Google.
							</div>
						)}
					{!isLoading &&
						results.map((result) => (
							<a
								key={result.id}
								href={result.webUrl}
								css={searchResultItem}
								onClick={() => setShowResults(false)}
								data-link-name={nestedOphanComponents(
									'header',
									'search',
									'result',
								)}
							>
								{result.fields?.thumbnail ? (
									<img
										src={result.fields.thumbnail}
										alt=""
										css={resultThumbnail}
										loading="lazy"
									/>
								) : null}
								<div css={resultContent}>
									<h4 css={resultHeadline}>
										{result.webTitle}
									</h4>
									<div css={resultMeta}>
										{result.pillarName ? (
											<span
												css={resultPillar}
												style={{
													color:
														pillarColors[
															result.pillarName
														] ??
														sourcePalette
															.neutral[60],
												}}
											>
												{result.pillarName}
											</span>
										) : null}
										{result.sectionName ? (
											<span>{result.sectionName}</span>
										) : null}
									</div>
								</div>
							</a>
						))}
				</div>
			)}
		</form>
	);
};
