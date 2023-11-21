import { css } from '@emotion/react';
import {
	brand,
	brandAlt,
	brandText,
	from,
	headline,
	neutral,
	space,
	textSans,
} from '@guardian/source-foundations';
import {
	Button,
	Label,
	SvgArrowRightStraight,
	SvgMagnifyingGlass,
	TextInput,
} from '@guardian/source-react-components';
import type { EditionId } from '../../../lib/edition';
import { getEditionFromId, getRemainingEditions } from '../../../lib/edition';
import { nestedOphanComponents } from '../../../lib/ophan-helpers';
import type { NavType } from '../../../model/extract-nav';
import { Column, lineStyle } from './Column';
import { MoreColumn } from './MoreColumn';
import { ReaderRevenueLinks } from './ReaderRevenueLinks';

const columnsStyle = (isImmersive: boolean) => css`
	box-sizing: border-box;
	max-width: none;
	${from.desktop} {
		max-width: 980px;
		padding: 0 20px;
		position: relative;
		margin: 0 auto;
		display: flex;
		border-left: ${isImmersive ? 'none' : `1px solid ${brand[600]}`};
		border-right: ${isImmersive ? 'none' : `1px solid ${brand[600]}`};
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
	:hover,
	:focus {
		color: ${brandAlt[400]};
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

const searchBar = css`
	${from.desktop} {
		display: none;
	}
	box-sizing: border-box;
	display: block;
	margin-left: 13px;
	max-width: 380px;
	position: relative;
	margin-bottom: 24px;
	margin-right: 41px;
	padding-bottom: 15px;
`;

const searchInput = css`
	${textSans.large()}
	background-color: rgba(255,255,255, .1);
	border: 0;
	border-radius: 1000px;
	box-sizing: border-box;
	color: ${neutral[100]};
	height: 36px;
	padding-left: 38px;
	vertical-align: middle;
	width: 100%;
	&::placeholder {
		color: ${neutral[100]};
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
	fill: ${neutral[100]};
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
	fill: ${neutral[100]};
	&:focus,
	&:active {
		opacity: 0;
		pointer-events: all;
	}
	&:before {
		height: 12px;
		top: ${space[3]}px;
		width: 12px;
	}
	&:after {
		border-right: 0;
		top: 17px;
		width: 20px;
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
	headerTopBarSwitch: boolean;
	hasPageSkin?: boolean;
};

export const Columns = ({
	isImmersive = false,
	nav,
	editionId,
	headerTopBarSwitch,
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
						<Column
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
				<form css={searchBar} action="https://www.google.co.uk/search">
					<TextInput
						hideLabel={true}
						label="Search input"
						cssOverrides={searchInput}
						name="q" // query param sent to google
						placeholder="Search"
						data-link-name={nestedOphanComponents('nav2', 'search')}
						className="selectableMenuItem"
						tabIndex={-1}
					/>

					<Label hideLabel={true} text="google-search">
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
							'nav2',
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
				</form>
				<div css={lineStyle}></div>
			</li>

			<ReaderRevenueLinks
				readerRevenueLinks={nav.readerRevenueLinks}
				editionId={editionId}
				headerTopBarSwitch={headerTopBarSwitch}
			/>

			{/* This is where the edition dropdown is inserted					 */}
			<section css={editionsSwitch}>
				<Column
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

			<MoreColumn
				otherLinks={nav.otherLinks}
				brandExtensions={nav.brandExtensions}
				key="more"
				hasPageSkin={hasPageSkin}
			/>
			<li css={desktopBrandExtensionColumn} role="none">
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
									'nav2',
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
