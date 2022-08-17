import { css } from '@emotion/react';
import type { ArticleFormat } from '@guardian/libs';
import { ArticleDisplay } from '@guardian/libs';
import {
	brand,
	brandAlt,
	brandText,
	from,
	headline,
	textSans,
} from '@guardian/source-foundations';
import { EditionDropdown } from '../../EditionDropdown.importable';
import { Column } from './Column';
import { MoreColumn } from './MoreColumn';
import { ReaderRevenueLinks } from './ReaderRevenueLinks';

const columnsStyle = (display: ArticleDisplay) => css`
	box-sizing: border-box;
	max-width: none;
	${from.desktop} {
		max-width: 980px;
		padding: 0 20px;
		position: relative;
		margin: 0 auto;
		display: flex;
		border-left: ${display === ArticleDisplay.Immersive
			? 'none'
			: `1px solid ${brand[600]}`};
		border-right: ${display === ArticleDisplay.Immersive
			? 'none'
			: `1px solid ${brand[600]}`};
		border-top: 1px solid ${brand[600]};
	}
	${from.leftCol} {
		max-width: 1140px;
	}
	${from.wide} {
		max-width: 1300px;
	}
`;

const desktopBrandExtensionColumn = css`
	${from.desktop} {
		display: block;
	}
	display: none;
	position: absolute;
	right: 20px;
	top: 4px;
	bottom: 0;
`;

const brandExtensionList = css`
	width: 131px;
	box-sizing: border-box;
	${textSans.medium()};
	flex-wrap: wrap;
	list-style: none;
	/* https://developer.mozilla.org/en-US/docs/Web/CSS/list-style#accessibility_concerns */
	/* Needs double escape char: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals#es2018_revision_of_illegal_escape_sequences */
	li::before {
		content: '\\200B'; /* Zero width space */
		display: block;
		height: 0;
		width: 0;
	}
	margin: 0;
	padding: 0 0 12px;
	display: flex;
	flex-direction: column;
	padding-bottom: 0;
	${from.leftCol} {
		width: 140px;
	}
	${from.wide} {
		width: 300px;
	}
`;

const brandExtensionListItem = css`
	margin-right: 0;
	margin-top: -6px;
	padding-bottom: 0;
`;

const brandExtensionLink = css`
	${headline.xxsmall()};
	font-weight: 700;
	background-color: transparent;
	border: 0;
	box-sizing: border-box;
	color: ${brandText.primary};
	cursor: pointer;
	display: inline-block;
	outline: none;
	padding: 8px 34px 8px 50px;
	position: relative;
	text-align: left;
	width: 100%;
	text-decoration: none;
	${from.tablet} {
		padding-left: 60px;
	}
	${from.desktop} {
		padding: 6px 0;
	}
	${from.wide} {
		font-size: 24px;
	}
	:hover,
	:focus {
		color: ${brandAlt[400]};
	}
	> * {
		pointer-events: none;
	}
`;

const searchBar = css`
	box-sizing: border-box;
	display: block;
	margin-left: 13px;
	max-width: 80%;
	position: relative;
	width: 100%;
	margin-bottom: 12px * 2;
	margin-right: 42px / 2 + 20px;
`;

const searchInput = css`
	background-color: #213f72;
	border: 0;
	border-radius: 1000px;
	box-sizing: border-box;
	color: #ffffff;
	font-size: 20px;
	height: 36px;
	padding-left: 38px;
	vertical-align: middle;
	width: 100%;

	&::placeholder {
		color: #ffffff;
	}

	&:focus {
		outline: none;
		padding-right: 20px * 2;

		&::placeholder {
			opacity: 0;
		}
	}

	:focus ~ &,
	&:focus,
	&:active {
		opacity: 1;
		outline: none;
		pointer-events: all;
	}
`;

const searchGlass = css`
	position: absolute;
	left: 10px;
	top: 7px;
	fill: #ffffff;
	height: 22px;
	width: 22px;
`;

const rightArrow = css`
	fill: #ffffff;
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

	&:before,
	&:after {
		border: 2px solid #ffffff;
		border-left: 0;
		border-top: 0;
		content: '';
		display: block;
		position: absolute;
		right: 14px;
	}

	&:before {
		height: 12px;
		top: 11px;
		transform: rotate(-45deg);
		width: 12px;
	}

	&:after {
		border-right: 0;
		top: 17px;
		width: 20px;
	}
`;

export const Columns: React.FC<{
	format: ArticleFormat;
	nav: NavType;
	editionId: EditionId;
}> = ({ format, nav, editionId }) => (
	<ul
		css={columnsStyle(format.display)}
		role="menubar"
		data-cy="nav-menu-columns"
	>
		{nav.pillars.map((column, i) => (
			<Column
				column={column}
				key={column.title.toLowerCase()}
				index={i}
			/>
		))}

		<form
			css={searchBar}
			className="menu-search js-menu-search"
			action="https://www.google.co.uk/search"
		>
			<input
				css={searchInput}
				type="text"
				name="q"
				className="menu-search__search-box js-menu-search-term"
				id="google-search"
				placeholder="Search"
				data-link-name="nav2 : search"
			/>

			<label className="menu-search__glass" htmlFor="google-search">
				<span
					css={searchGlass}
					className="inline-search-36 inline-icon main-menu__icon main-menu__icon--search"
				>
					<svg
						width="18"
						height="18"
						viewBox="0 0 18 18"
						className="main-menu__icon__svg main-menu__icon--search__svg inline-search-36__svg inline-icon__svg"
					>
						<path d="M6.5 1.6c2.7 0 4.9 2.2 4.9 4.9s-2.2 4.9-4.9 4.9-4.9-2.2-4.9-4.9 2.2-4.9 4.9-4.9m0-1.6C2.9 0 0 2.9 0 6.5S2.9 13 6.5 13 13 10.1 13 6.5 10.1 0 6.5 0zm6.6 11.5 4.9 4.9-1.6 1.6-4.9-4.9v-.8l.8-.8h.8z"></path>
					</svg>
				</span>

				<span className="u-h">What term do you want to search?</span>
			</label>

			<button
				css={searchSubmit}
				className="menu-search__submit"
				data-link-name="nav2 : search : submit"
				type="submit"
			>
				<div css={rightArrow} className="right-arrow__icon">
					<svg
						width="23"
						height="23"
						viewBox="0 0 23 23"
						xmlns="http://www.w3.org/2000/svg"
					>
						<title />
						<desc />
						<g fill="none">
							<path
								d="M23 11.501l-10.296 10.099-.959-.959 8.055-8.64h-19.8v-2h19.8l-8.055-9.04.959-.96 10.296 10.5v1"
								fill="#fff"
							/>
							<path
								d="M11.001 32.313c-11.752 0-21.313-9.561-21.313-21.313 0-11.751 9.561-21.312 21.313-21.312 11.751 0 21.312 9.561 21.312 21.312 0 11.752-9.561 21.313-21.312 21.313m0-43.313c-12.151 0-22.001 9.849-22.001 22s9.85 22.001 22.001 22.001c12.15 0 21.999-9.85 21.999-22.001 0-12.151-9.849-22-21.999-22"
								fill="#707070"
							/>
						</g>
					</svg>
				</div>
				<span className="u-h">Search with google</span>
			</button>

			<input
				type="hidden"
				name="as_sitesearch"
				value="www.theguardian.com"
			/>
		</form>

		<ReaderRevenueLinks readerRevenueLinks={nav.readerRevenueLinks} />
		<EditionDropdown
			editionId={editionId}
			dataLinkName="nav2 : topbar : edition-picker: toggle"
		/>
		<MoreColumn
			column={nav.otherLinks}
			brandExtensions={nav.brandExtensions}
			key="more"
		/>
		<li css={desktopBrandExtensionColumn} role="none">
			<ul css={brandExtensionList} role="menu">
				{nav.brandExtensions.map((brandExtension) => (
					<li css={brandExtensionListItem} key={brandExtension.title}>
						<a
							className="selectableMenuItem"
							css={brandExtensionLink}
							href={brandExtension.url}
							key={brandExtension.title}
							role="menuitem"
							data-link-name={`nav2 : brand extension : ${brandExtension.longTitle}`}
							tabIndex={-1}
						>
							{brandExtension.longTitle}
						</a>
					</li>
				))}
			</ul>
		</li>
	</ul>
);
