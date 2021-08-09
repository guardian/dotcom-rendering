import { css } from '@emotion/react';

import { brand, brandText, brandAlt } from '@guardian/src-foundations/palette';
import { headline, textSans } from '@guardian/src-foundations/typography';
import { from } from '@guardian/src-foundations/mq';

import { Column } from './Column';
import { ReaderRevenueLinks } from './ReaderRevenueLinks';
import { MoreColumn } from './MoreColumn';

const columnsStyle = css`
	box-sizing: border-box;
	max-width: none;
	${from.desktop} {
		max-width: 980px;
		padding: 0 20px;
		position: relative;
		margin: 0 auto;
		display: flex;
		border-left: 1px solid ${brand[600]};
		border-right: 1px solid ${brand[600]};
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

export const Columns: React.FC<{
	nav: NavType;
}> = ({ nav }) => (
	<ul css={columnsStyle} role="menubar" data-cy="nav-menu-columns">
		{nav.pillars.map((column, i) => (
			<Column
				column={column}
				key={column.title.toLowerCase()}
				index={i}
			/>
		))}
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
