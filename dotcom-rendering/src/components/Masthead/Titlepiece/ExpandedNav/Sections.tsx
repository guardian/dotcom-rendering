/**
 * @file
 * This file was largely copied from src/components/Nav/ExpandedMenu/Columns.tsx
 */
import { css } from '@emotion/react';
import {
	from,
	headlineBold20,
	headlineBold24,
	space,
	textSans17,
} from '@guardian/source/foundations';
import { Hide } from '@guardian/source/react-components';
import type { EditionId } from '../../../../lib/edition';
import { nestedOphanComponents } from '../../../../lib/ophan-helpers';
import type { LinkType, NavType } from '../../../../model/extract-nav';
import { palette as themePalette } from '../../../../palette';
import { expandedNavLinkStyles, listAccessibility } from '../commonStyles';
import { MoreSection } from './MoreSection';
import { lineStyle, Pillar } from './Pillar';
import { ReaderRevenueLinks } from './ReaderRevenueLinks';
import { SearchBar } from './SearchBar';

const columnsStyle = css`
	box-sizing: border-box;
	max-width: none;
	${from.desktop} {
		max-width: 980px;
		padding: 0 ${space[5]}px;
		position: relative;
		margin: 0 auto;
		display: flex;
		border-right: 1px solid ${themePalette('--masthead-nav-lines')};
		border-top: 1px solid ${themePalette('--masthead-nav-lines')};

		&:first-of-type {
			border-left: 1px solid ${themePalette('--masthead-nav-lines')};
		}
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
	display: none;
	${from.desktop} {
		display: block;
	}
	padding: ${space[2]}px;
`;

const brandExtensionList = css`
	${textSans17};
	${listAccessibility}
	box-sizing: border-box;
	display: flex;
	flex-direction: column;
	flex-wrap: wrap;
	margin: 0;
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
	${expandedNavLinkStyles}
	${headlineBold20};
	text-decoration: none;

	${from.tablet} {
		padding-left: 60px;
	}
	${from.desktop} {
		padding: 6px 0;
	}
`;

const brandExtensionLinkFromWide = css`
	${from.wide} {
		${headlineBold24};
	}
`;

type Props = {
	editionId: EditionId;
	isImmersive?: boolean;
	nav: NavType;
	hasPageSkin?: boolean;
};

export const Sections = ({
	// eslint-disable-next-line @typescript-eslint/no-unused-vars -- TODO: add slim nav version for immersives
	isImmersive = false,
	nav,
	editionId,
	hasPageSkin,
}: Props) => {
	return (
		<ul
			css={[columnsStyle, !hasPageSkin && columnsStyleFromLeftCol]}
			role="menubar"
			data-testid="nav-menu-columns"
		>
			{nav.pillars.map((column, i) => {
				const viewAllLink = {
					title: column.title,
					longTitle: `View all ${column.title}`,
					url: column.url,
					children: [],
					mobileOnly: true,
				} satisfies LinkType;

				const children = column.children && [
					viewAllLink,
					...column.children,
				];

				return (
					<Pillar
						column={{
							...column,
							children,
						}}
						key={column.title.toLowerCase()}
						index={i}
						showLineBelow={i !== nav.pillars.length - 1}
						hasPageSkin={hasPageSkin}
					/>
				);
			})}

			<Hide from="desktop">
				<li role="none">
					<SearchBar />
				</li>
			</Hide>
			<div css={lineStyle}></div>

			<ReaderRevenueLinks
				readerRevenueLinks={nav.readerRevenueLinks}
				editionId={editionId}
			/>

			{/* Mobile only Brand Extensions list */}
			<MoreSection
				otherLinks={nav.otherLinks}
				brandExtensions={nav.brandExtensions}
				key="more"
				hasPageSkin={hasPageSkin}
			/>

			{/* Desktop only Brand Extensions list*/}
			<li css={desktopBrandExtensionColumn} role="none">
				<SearchBar />

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
									!hasPageSkin && brandExtensionLinkFromWide,
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
