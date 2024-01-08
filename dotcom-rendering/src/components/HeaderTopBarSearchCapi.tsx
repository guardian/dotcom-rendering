import { css } from '@emotion/react';
import {
	from,
	headline,
	palette,
	textSans,
} from '@guardian/source-foundations';
import { useEffect, useRef, useState } from 'react';
import { getZIndex } from '../lib/getZIndex';
import { nestedOphanComponents } from '../lib/ophan-helpers';
import { useApi } from '../lib/useApi';
import ArrowRightIcon from '../static/icons/arrow-right.svg';
import SearchIcon from '../static/icons/search.svg';
import XIcon from '../static/icons/x.svg';

const searchLinkStyles = css`
	display: flex;
	align-items: center;
	${textSans.medium({ fontWeight: 'bold' })};
	line-height: 1;
	font-size: 1rem;
	height: fit-content;
	color: ${palette.neutral[100]};
	transition: color 80ms ease-out;
	text-decoration: none;
	padding: 7px 0;

	${from.tablet} {
		padding: 7px 10px 7px 6px;
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
		margin: 0 4px 0 0;
	}
	${getZIndex('searchHeaderLink')}
`;

const linkTablet = css`
	display: none;
	position: relative;

	:before {
		content: '';
		border-left: 1px solid ${palette.brand[600]};
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
	const searchContainerRef = useRef<HTMLDivElement>(null);

	// Hide search if you click anywhere outside of search when it's shown
	useEffect(() => {
		function handleClickOutside(event: MouseEvent) {
			if (
				!searchContainerRef.current?.contains(event.target as Node) &&
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
			<div css={linkTablet} ref={searchContainerRef}>
				<a
					href="https://www.google.co.uk/advanced_search?q=site:www.theguardian.com"
					type="button"
					css={searchLinkStyles}
					data-link-name={nestedOphanComponents('nav3', 'search')}
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
					{!isSearchVisible ? <SearchIcon /> : <XIcon />}
					<>Search</>
				</a>
			</div>
			{isSearchVisible && (
				<form
					css={css`
						position: absolute;
						background: ${palette.brand[400]};
						z-index: 1000;
						right: 0;
						width: 50%;
						top: 35px;
					`}
					onSubmit={(event) => {
						event.preventDefault();
						setQ(qRef.current?.value);
					}}
					ref={formRef}
				>
					<div
						css={css`
							background: ${palette.neutral[100]};
							display: flex;
							justify-content: space-between;
						`}
					>
						<input
							name="q"
							type="text"
							css={css`
								border: none;
								${textSans.small()}
								font-size: 16px;
								padding: 0px 8px 0px 20px;
								width: 100%;
								height: 44px;
							`}
							ref={qRef}
							autoComplete="off"
						/>
						<button
							css={css`
								background: none;
								border: 0;

								&:hover {
									transform: scale(1.2);
									transition: all 0.3s ease;
								}
							`}
							type="submit"
						>
							<ArrowRightIcon />
						</button>
					</div>
					{data && data.response.results.length == 0 && (
						<p
							css={css`
								${textSans.medium()};
								padding: 1rem 25px;
								color: ${palette.neutral[100]};

								:hover {
									color: ${palette.brandAlt[400]};
								}
							`}
						>
							There are no results
						</p>
					)}

					{data && data.response.results.length > 0 && (
						<ul
							css={css`
								border: 1px solid ${palette.neutral[46]};
								border-top: none;
								padding-top: 8px;
							`}
						>
							{data.response.results.map((result) => {
								return (
									<li key={result.webUrl}>
										<a
											href={result.webUrl}
											css={css`
												${headline.xxxsmall()};
												text-decoration: none;
												color: ${palette.neutral[100]};
												display: block;
												padding-left: 20px;

												:hover {
													color: ${palette
														.brandAlt[400]};
												}
											`}
										>
											<div
												css={css`
													border-top: 1px solid
														${palette.neutral[46]};
													padding: 4px 50px 16px 0;
												`}
											>
												{result.webTitle}
											</div>
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
