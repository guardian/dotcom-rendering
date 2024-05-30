import { css } from '@emotion/react';
import {
	between,
	from,
	headlineBold14,
	headlineBold17,
	headlineBold20,
	headlineBold24,
	palette,
	space,
	textSans14,
} from '@guardian/source/foundations';
import {
	Hide,
	SvgGuardianLogo,
	SvgMenu,
} from '@guardian/source/react-components';
import type { EditionId } from '../lib/edition';
import { palette as themePalette } from '../palette';
import { TitlepieceEditionDropdown } from './TitlepieceEditionDropdown';
import { TitlepieceGrid } from './TitlepieceGrid';

interface TitlepieceProps {
	editionId: EditionId;
}

const pillars = [
	{ name: 'News', colour: palette.news[500], path: '/news' },
	{ name: 'Opinion', colour: palette.opinion[500], path: '/commentisfree' },
	{ name: 'Culture', colour: palette.culture[500], path: '/culture' },
	{
		name: 'Lifestyle',
		colour: palette.lifestyle[500],
		path: '/lifeandstyle',
	},
	{ name: 'Sport', colour: palette.sport[500], path: '/sport' },
] as const satisfies ReadonlyArray<{
	name: string;
	colour: string;
	path: string;
}>;

const sections = [
	{ name: 'UK', slug: 'uk-news' },
	{ name: 'World', slug: 'world' },
	{ name: 'Climate crisis', slug: 'environment/climate-crisis' },
	{ name: 'Ukraine', slug: 'world/ukraine' },
	{ name: 'Football', slug: 'football' },
	{ name: 'Newsletters', slug: 'email-newsletters' },
	{ name: 'Business', slug: 'business' },
	{ name: 'Environment', slug: 'environment' },
	{ name: 'UK politics', slug: 'politics' },
	{ name: 'Education', slug: 'education' },
	{ name: 'Society', slug: 'society' },
	{ name: 'Science', slug: 'science' },
	{ name: 'Tech', slug: 'technology' },
	{ name: 'Global development', slug: 'global-development' },
	{ name: 'Obituaries', slug: 'obituaries' },
] as const satisfies ReadonlyArray<{
	name: string;
	slug: string;
}>;

const veggieBurgerDiameter = 40;

const pillarLinkWidthTablet = 108;
const pillarLinkWidthLeftCol = 125;
const pillarLinkWidthWide = 136;

const editionSwitcherMenuStyles = css`
	grid-column: content-start / content-end;
	grid-row: 1;
	${from.mobileMedium} {
		justify-self: end;
	}
`;

const guardianLogoStyles = css`
	z-index: 2;
	grid-column: content-start / content-end;
	grid-row: 1;
	justify-self: end;
	align-self: end;
	margin-top: ${space[2]}px;
	margin-bottom: 6px;
	margin-right: ${veggieBurgerDiameter + space[3]}px;
	${from.mobileMedium} {
		margin-right: 0;
	}
	svg {
		height: 49px;
		${between.mobileMedium.and.tablet} {
			height: 67px;
		}
		${between.tablet.and.desktop} {
			height: 96px;
		}
		${between.desktop.and.leftCol} {
			height: 94px;
		}
		${from.leftCol} {
			height: 135px;
		}
	}
	${between.mobileLandscape.and.desktop} {
		margin-bottom: 8px;
	}
	${from.desktop} {
		margin-bottom: 10px;
	}
`;

const burgerStyles = css`
	z-index: 2;
	grid-column: content-start / content-end;
	grid-row: 1;
	justify-self: end;
	align-self: end;
	height: ${veggieBurgerDiameter}px;
	width: ${veggieBurgerDiameter}px;
	margin-bottom: 6px;
	border-radius: 50%;
	background-color: ${themePalette('--masthead-veggie-burger-background')};
	justify-content: center;
	display: flex;
	:hover {
		background-color: ${themePalette(
			'--masthead-veggie-burger-background-hover',
		)};
	}
	${from.mobileMedium} {
		grid-row: 2;
		align-self: center;
	}
	${from.desktop} {
		grid-row: 1 / 2;
		align-self: end;
		justify-self: start;
		margin-bottom: ${space[3]}px;
		margin-left: ${pillarLinkWidthTablet * pillars.length + space[2]}px;
	}
	${from.leftCol} {
		margin-left: ${pillarLinkWidthLeftCol * pillars.length + space[2]}px;
	}
	${from.wide} {
		margin-left: ${pillarLinkWidthWide * pillars.length + space[2]}px;
	}
`;

const navLinkStyles = css`
	a {
		color: ${themePalette('--masthead-nav-link-text')};
		text-decoration: none;
	}
`;

const pillarsNavStyles = css`
	grid-column: content-start / viewport-end;
	grid-row: 2;
	align-self: end;

	${headlineBold14}
	margin-top: ${space[2]}px;
	border-bottom: 1px solid ${themePalette('--masthead-nav-lines')};
	${from.desktop} {
		grid-row: 1 / 2;
	}
	ul {
		display: flex;
	}
	li {
		background-color: inherit;
		height: 28px;
		padding-right: ${space[1]}px;
		${between.mobileMedium.and.mobileLandscape} {
			height: 34px;
		}
		${between.mobileLandscape.and.tablet} {
			${headlineBold17}
			height: 37px;
		}
		${from.tablet} {
			${headlineBold20}
			height: ${space[10]}px;
			width: ${pillarLinkWidthTablet}px;
		}
		${from.leftCol} {
			${headlineBold24}
			height: 52px;
			width: ${pillarLinkWidthLeftCol}px;
		}
		${from.wide} {
			width: ${pillarLinkWidthWide}px;
		}
	}
`;
const pillarChildStyle = css`
	li {
		:not(:first-child) {
			padding-left: ${space[1]}px;
		}
	}
`;
const pillarColorStyles = css`
	position: relative;
	bottom: 0;
	left: 0;
	right: 0;
	height: 4px;
	transform-origin: bottom;
	transform: scaleY(0);
	transition: transform 0.3s;

	*:hover > & {
		transform: scaleY(1);
	}
`;

// const verticalDivider = css`
// 	/* :after {
// 		content: '';
// 		position: absolute;
// 		top: 0;
// 		right: 0;
// 		bottom: 0;

// 		margin-top: ${space[1]}px;

// 		border-right: 1px solid ${themePalette('--masthead-nav-lines')};
// 	} */

// 	position: relative;
// 	top: 0;
// 	bottom: 0;
// 	right: 0;
// 	margin-top: ${space[1]}px;
// 	width: 1px;
// 	background-color: ${themePalette('--masthead-nav-lines')};
// `;

// const verticalDividerFromDesktop = css`
// 	${from.desktop} {
// 		${verticalDivider}
// 	}
// `;

const sectionsNavStyles = css`
	grid-column: content-start / viewport-end;
	grid-row: 3;
	${textSans14}
	height: 28px;
	margin-top: ${space[2]}px;
	ul {
		display: flex;
		column-gap: ${space[3]}px;
	}
	li {
		white-space: nowrap;
	}
	${from.mobileMedium} {
		margin-top: ${space[3]}px;
	}
	${from.leftCol} {
		margin-top: 14px;
	}
`;

const pillarStyle = css`
	background-color: ${palette.brand[400]};
	width: fit-content;

	${from.desktop} {
		height: 40px;
		width: 108px;
	}

	${from.leftCol} {
		height: 52px;
		width: 125px;
	}

	${from.wide} {
		width: 136px;
	}
`;

const textStyles = css`
	${headlineBold14}
	color: ${palette.neutral[100]};

	margin-left: 6px;

	${from.mobileMedium} {
		${headlineBold17}
	}

	${from.desktop} {
		${headlineBold20}
	}

	${from.leftCol} {
		${headlineBold24}
	}
`;

const verticalDividerStyles = css`
	${from.desktop} {
		:before {
			content: '';
			border-left: 1px solid ${palette.neutral[86]};
			display: flex;
			position: relative;
			height: calc(100% - ${space[1]}px);
			margin-top: ${space[1]}px;
		}
	}
`;

const VerticalDivider = () => <div css={verticalDividerStyles} />;

const hoverStyles = (colour: string) => css`
	:after {
		content: '';
		display: block;
		position: relative;
		border-bottom: 4px solid ${colour};
		height: ${space[1]}px;
		width: calc(100% - 6px);
		margin-left: 6px;
	}
`;

type PillarProps = { name: string; colour: string; showDivider?: boolean };
const Pillar = ({ name, colour, showDivider = true }: PillarProps) => (
	<>
		{showDivider && <VerticalDivider />}
		<li css={[flexColumn, pillarStyle, hoverStyles(colour)]}>
			<span css={[textStyles]}>{name}</span>
		</li>
	</>
);

export const Titlepiece = ({ editionId }: TitlepieceProps) => {
	return (
		<TitlepieceGrid type="header">
			{/* Edition menu */}
			<div css={editionSwitcherMenuStyles}>
				<TitlepieceEditionDropdown
					editionId={editionId}
					dataLinkName={''}
				/>
			</div>

			{/* Guardian logo
			 * @todo - replace with <Logo /> component
			 */}
			<div css={guardianLogoStyles}>
				<a href="https://theguardian.com">
					<SvgGuardianLogo
						textColor={themePalette('--masthead-nav-link-text')}
					/>
				</a>
			</div>

			{/* Veggie burger menu */}
			<div css={burgerStyles}>
				<SvgMenu
					size="small"
					theme={{
						fill: themePalette('--masthead-veggie-burger-icon'),
					}}
				/>
			</div>

			{/* Pillars nav */}
			<nav css={[pillarsNavStyles, navLinkStyles, pillarChildStyle]}>
				<ul>
					{pillars.map(({ name, path, colour }, index) => (
						<a
							key={path}
							href={`https://www.theguardian.com${path}`}
						>
							<Pillar
								name={name}
								colour={colour}
								showDivider={index !== 0}
							/>
						</a>
					))}
					<Hide until="desktop">
						<VerticalDivider />
					</Hide>
				</ul>
			</nav>

			{/* Sections nav */}
			<nav css={[sectionsNavStyles, navLinkStyles]}>
				<ul>
					{sections.map(({ name, slug }) => (
						<li key={slug}>
							<a
								key={slug}
								href={`https://www.theguardian.com/${slug}`}
							>
								{name}
							</a>
						</li>
					))}
				</ul>
			</nav>
		</TitlepieceGrid>
	);
};
