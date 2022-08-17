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
import {
	SvgArrowRightStraight,
	SvgMagnifyingGlass,
} from '@guardian/source-react-components';
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
	${textSans.large()}
	background-color: rgba(255,255,255, .1);
	border: 0;
	border-radius: 1000px;
	box-sizing: border-box;
	color: #ffffff;
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

	&:focus ~ button {
		opacity: 1;
		outline: none;
		pointer-events: all;
	}
`;

const searchGlass = css`
	position: absolute;
	left: 7px;
	top: 3px;
	fill: #ffffff;
	/* height: 22px;
	width: 22px; */
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
	padding-top: 3px;
	width: 50px;
	fill: #ffffff;

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
}> = ({ format, nav }) => (
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
				showLine={i !== nav.pillars.length - 1}
			/>
		))}

		<form css={searchBar} action="https://www.google.co.uk/search">
			<input
				css={searchInput}
				type="text"
				name="q"
				placeholder="Search"
				data-link-name="nav2 : search"
			/>

			<label htmlFor="google-search">
				<div css={searchGlass}>
					<SvgMagnifyingGlass
						isAnnouncedByScreenReader={true}
						size="medium"
					/>
				</div>
			</label>

			<button
				aria-label="Search with google"
				css={searchSubmit}
				data-link-name="nav2 : search : submit"
				type="submit"
			>
				<SvgArrowRightStraight
					isAnnouncedByScreenReader={true}
					size="medium"
				/>
			</button>

			<input
				type="hidden"
				name="as_sitesearch"
				value="www.theguardian.com"
			/>
		</form>

		<ReaderRevenueLinks readerRevenueLinks={nav.readerRevenueLinks} />
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
