import { css } from '@emotion/react';
import {
	from,
	headlineBold20,
	space,
	textSans17,
} from '@guardian/source/foundations';
import { Hide } from '@guardian/source/react-components';
import type { EditionId } from '../../../../lib/edition';
import {
	getEditionFromId,
	getRemainingEditions,
} from '../../../../lib/edition';
import { nestedOphanComponents } from '../../../../lib/ophan-helpers';
import type { NavType } from '../../../../model/extract-nav';
import { palette as themePalette } from '../../../../palette';
import { MoreSection } from './MoreSection';
import { lineStyle, Pillar } from './Pillar';
import { ReaderRevenueLinks } from './ReaderRevenueLinks';
import { SearchBar } from './SearchBar';

const columnsStyle = (isImmersive: boolean) => css`
	box-sizing: border-box;
	max-width: none;
	${from.desktop} {
		max-width: 980px;
		padding: 0 ${space[4] + 3}px;
		position: relative;
		margin: 0 auto;
		display: flex;
		border-right: ${isImmersive
			? 'none'
			: `1px solid ${themePalette('--masthead-nav-lines')}`};
		border-top: 1px solid ${themePalette('--masthead-nav-lines')};
	}
`;

const columnsStyleFromLeftCol = css`
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
	padding: ${space[2]}px;
`;

const brandExtensionList = css`
	box-sizing: border-box;
	${textSans17};
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
`;

const brandExtensionListFromLeftCol = css`
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
	${headlineBold20};
	background-color: transparent;
	border: 0;
	box-sizing: border-box;
	color: ${themePalette('--masthead-nav-link-text')};
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
	:hover,
	:focus {
		color: ${themePalette('--masthead-nav-link-text-hover')};
	}
	> * {
		pointer-events: none;
	}
`;

const brandExtensionLinkFromLeftCol = css`
	${from.wide} {
		font-size: 24px;
	}
`;

const editionsSwitch = css`
	${from.desktop} {
		display: none;
	}
`;

type Props = {
	editionId: EditionId;
	isImmersive?: boolean;
	nav: NavType;
	hasPageSkin?: boolean;
};

export const Sections = ({
	isImmersive = false,
	nav,
	editionId,
	hasPageSkin,
}: Props) => {
	const activeEdition = getEditionFromId(editionId);
	const remainingEditions = getRemainingEditions(activeEdition.editionId);
	return (
		<ul
			css={[
				columnsStyle(isImmersive),
				!hasPageSkin && columnsStyleFromLeftCol,
			]}
			role="menubar"
			data-testid="nav-menu-columns"
		>
			{nav.pillars.map(
				(column, i) => (
					column.children?.unshift({
						title: column.title,
						longTitle: `View all ${column.title}`,
						url: column.url,
						children: [],
						mobileOnly: true,
					}),
					(
						<Pillar
							column={column}
							key={column.title.toLowerCase()}
							index={i}
							showLineBelow={i !== nav.pillars.length - 1}
							hasPageSkin={hasPageSkin}
						/>
					)
				),
			)}

			<li role="none">
				<Hide from="desktop">
					<SearchBar />
				</Hide>
				<div css={lineStyle}></div>
			</li>

			<ReaderRevenueLinks
				readerRevenueLinks={nav.readerRevenueLinks}
				editionId={editionId}
			/>

			{/* This is where the edition dropdown is inserted					 */}
			<section css={editionsSwitch}>
				<Pillar
					column={{
						...activeEdition,
						children: remainingEditions,
					}}
					index={10}
					showLineBelow={false}
					hasPageSkin={hasPageSkin}
				/>
				<div css={lineStyle}></div>
			</section>

			<MoreSection
				otherLinks={nav.otherLinks}
				brandExtensions={nav.brandExtensions}
				key="more"
				hasPageSkin={hasPageSkin}
			/>
			<li css={desktopBrandExtensionColumn} role="none">
				<Hide until="desktop">
					<SearchBar />
				</Hide>
				<ul
					css={[
						brandExtensionList,
						!hasPageSkin && brandExtensionListFromLeftCol,
					]}
					role="menu"
				>
					{nav.brandExtensions.map((brandExtension) => (
						<li
							css={brandExtensionListItem}
							key={brandExtension.title}
						>
							<a
								className="selectableMenuItem"
								css={[
									brandExtensionLink,
									!hasPageSkin &&
										brandExtensionLinkFromLeftCol,
								]}
								href={brandExtension.url}
								key={brandExtension.title}
								role="menuitem"
								data-link-name={nestedOphanComponents(
									'header',
									'brand extension',
									brandExtension.longTitle,
								)}
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
};
