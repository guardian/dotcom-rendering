import { css } from '@emotion/react';
import {
	brand,
	brandAlt,
	from,
	neutral,
	textSans,
} from '@guardian/source-foundations';
import { useEffect, useRef, useState } from 'react';
import SearchIcon from '../../static/icons/search.svg';
import { getZIndex } from '../lib/getZIndex';
import { useApi } from '../lib/useApi';

const searchLinkStyles = css`
	${textSans.medium({ fontWeight: 'bold' })};
	color: ${neutral[100]};
	transition: color 80ms ease-out;
	text-decoration: none;
	padding: 7px 0;
	background: none;
	border: none;

	${from.tablet} {
		padding: 7px 10px 7px 5px;
	}

	:hover,
	:focus {
		text-decoration: underline;
	}

	svg {
		fill: currentColor;
		float: left;
		height: 18px;
		width: 18px;
		margin: 3px 4px 0 0;
	}
	${getZIndex('searchHeaderLink')}
`;

const linkTablet = css`
	display: none;
	position: relative;

	:before {
		content: '';
		border-left: 1px solid ${brand[600]};
		height: 24px;
	}

	${from.desktop} {
		display: flex;
	}
`;

export const HeaderTopBarSearchCapi = () => {
	const [isSearchVisible, setIsSearchVisible] = useState(false);
	const [q, setQ] = useState<string>();
	const qRef = useRef<HTMLInputElement>(null);
	const { data } = useApi<{
		response: { results: { webTitle: string; webUrl: string }[] };
	}>(
		q
			? `https://content.guardianapis.com/search?api-key=d1280925-708c-4940-9162-0952ac6e728f&q=${q}`
			: undefined,
	);

	const formRef = useRef<HTMLFormElement>(null);

	// Hide search if you click anywhere outside of search when it's shown
	useEffect(() => {
		function handleClickOutside(event: MouseEvent) {
			if (
				!formRef.current?.contains(event.target as Node) &&
				isSearchVisible
			) {
				setQ(undefined);
				setIsSearchVisible(false);
			}
		}

		document.addEventListener('mousedown', handleClickOutside);
		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, [formRef, isSearchVisible]);

	// Hide search if you press escape and it's show
	useEffect(() => {
		const hideSearch = (event: KeyboardEvent) => {
			if (event.key === 'Escape') {
				setQ(undefined);
				setIsSearchVisible(false);
			}
		};
		document.addEventListener('keydown', hideSearch, false);
		return () => {
			document.removeEventListener('keydown', hideSearch, false);
		};
	}, []);

	// Focus the input element when we show search
	useEffect(() => {
		if (isSearchVisible) {
			qRef.current?.focus();
		}
	}, [isSearchVisible]);

	return (
		<>
			<div css={linkTablet}>
				<a
					href="https://www.google.co.uk/advanced_search?q=site:www.theguardian.com"
					type="button"
					css={searchLinkStyles}
					data-link-name="nav3 : search"
					onClick={(event) => {
						event.preventDefault();

						// toggle search
						if (isSearchVisible) {
							setQ(undefined);
							setIsSearchVisible(false);
						} else {
							setIsSearchVisible(true);
						}

						return false;
					}}
				>
					<SearchIcon />
					<>Search</>
				</a>
			</div>
			{isSearchVisible && (
				<form
					css={css`
						position: absolute;
						background: ${brand[400]};
						z-index: 1000;
						right: 0;
						width: 50%;
						top: 40px;
					`}
					onSubmit={(event) => {
						event.preventDefault();
						setQ(qRef.current?.value);
					}}
					ref={formRef}
				>
					<input
						name="q"
						type="text"
						css={css`
							border: 2px solid ${neutral[46]};
							font-size: 1.0625rem;
							padding: 0px 8px;
							width: 100%;
							line-height: 1.35;
							height: 44px;
						`}
						ref={qRef}
						autoComplete="off"
					/>
					{data && data.response.results.length == 0 && (
						<p
							css={css`
								${textSans.medium()};
								padding: 1rem 25px;
								color: ${neutral[100]};

								:hover {
									color: ${brandAlt[400]};
								}
							`}
						>
							There are no results
						</p>
					)}

					{data && data.response.results.length > 0 && (
						<ul>
							{data.response.results.map((result) => {
								return (
									<li>
										<a
											href={result.webUrl}
											css={css`
												${textSans.medium()};
												color: ${neutral[100]};
												display: block;
												padding: 1rem 25px;

												:hover {
													color: ${brandAlt[400]};
												}
											`}
										>
											{result.webTitle}
										</a>
									</li>
								);
							})}
						</ul>
					)}
				</form>
			)}
		</>
	);
};
