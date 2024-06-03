import { css } from '@emotion/react';
import { from, space, textSans14 } from '@guardian/source/foundations';
import { Hide, SvgGuardianLogo } from '@guardian/source/react-components';
import type { EditionId } from '../lib/edition';
import { nestedOphanComponents } from '../lib/ophan-helpers';
import type { NavType } from '../model/extract-nav';
import { palette as themePalette } from '../palette';
import { TitlepieceEditionDropdown } from './TitlepieceEditionDropdown';
import { Pillars } from './TitlepiecePillars';
import { VeggieBurgerMenu } from './TitlepieceVeggieBurgerMenu';

interface TitlepieceProps {
	nav: NavType;
	editionId: EditionId;
}

const gridStyles = css`
	display: grid;
	grid-template-areas:
		'editionSwitcher .        logo     burger'
		'pillars         pillars  pillars  pillars'
		'hr          hr   hr   hr'
		'subnav          subnav   subnav   subnav';

	${from.mobileLandscape} {
		grid-template-areas:
			'.        .        logo     logo'
			'pillars  pillars  pillars  burger'
			'hr   hr   hr   hr'
			'subnav   subnav   subnav   subnav';
	}

	${from.desktop} {
		grid-template-areas:
			'.        .        .       editionSwitcher'
			'pillars  burger   .       logo'
			'hr   hr   hr  hr'
			'subnav   subnav   subnav  subnav';
	}
`;

const headerStyles = css`
	background-color: ${themePalette('--masthead-nav-background')};
	color: ${themePalette('--masthead-nav-link-text')};

	padding: 0 10px;
	${from.tablet} {
		padding: 0 20px;
	}
`;

const editionSwitcherMenuStyles = css`
	grid-area: editionSwitcher;
	${from.mobileLandscape} {
		position: absolute;
		right: 10px;
		top: 0;
	}

	${from.tablet} {
		right: ${space[5]}px;
	}
`;

const guardianLogoStyles = css`
	grid-area: logo;
	justify-self: end;
	align-self: end;

	margin-top: ${space[2]}px;
	margin-bottom: 6px;
	margin-right: ${space[3]}px;

	${from.mobileLandscape} {
		margin-right: 0;
	}
	${from.mobileLandscape} {
		margin-bottom: 8px;
	}
	${from.desktop} {
		margin-bottom: 10px;
	}

	svg {
		height: 49px;

		${from.mobileLandscape} {
			height: 67px;
		}
		${from.tablet} {
			height: 96px;
		}
		${from.desktop} {
			height: 94px;
		}
		${from.leftCol} {
			height: 135px;
		}
	}
`;

const burgerStyles = css`
	/* justify-self: end;
	align-self: end;
	margin-top: ${space[4]}px;
	margin-bottom: 6px;

	${from.desktop} {
		justify-self: start;
	} */
`;

const navLinkStyles = css`
	color: ${themePalette('--masthead-nav-link-text')};
	text-decoration: none;
`;

const pillarsNavStyles = css`
	grid-area: pillars;
	align-self: end;
	margin-top: ${space[2]}px;
`;

const horizontalLine = css`
	grid-area: hr;
	border-bottom: 1px solid ${themePalette('--masthead-nav-lines')};
`;

const subnavStyles = css`
	grid-area: subnav;
	${textSans14}
	height: 28px;
	margin-top: ${space[2]}px;

	overflow-x: scroll;
	width: calc(100% + 10px);

	${from.mobileLandscape} {
		margin-top: ${space[3]}px;
	}

	${from.tablet} {
		width: calc(100% + ${space[5]}px);
	}

	${from.leftCol} {
		margin-top: 14px;
	}
`;

const subnavListStyles = css`
	display: flex;
	column-gap: ${space[3]}px;
`;
const subnavListItemStyles = css`
	white-space: nowrap;
`;

export const Titlepiece = ({ nav, editionId }: TitlepieceProps) => {
	return (
		<header css={[gridStyles, headerStyles]}>
			{/* Edition menu */}
			<div css={editionSwitcherMenuStyles}>
				<TitlepieceEditionDropdown
					editionId={editionId}
					dataLinkName={nestedOphanComponents('header', 'titlepiece')}
				/>
			</div>

			{/* Guardian logo
			 * @todo - replace with <Logo /> component ?
			 */}
			<div css={guardianLogoStyles}>
				<a href="https://theguardian.com">
					<SvgGuardianLogo
						textColor={themePalette('--masthead-nav-link-text')}
					/>
				</a>
			</div>

			<nav css={pillarsNavStyles}>
				{/* Pillars nav mobile version */}
				<Hide from="desktop">
					<Pillars
						pillars={nav.pillars}
						dataLinkName={nestedOphanComponents(
							'header',
							'titlepiece',
							'nav',
						)}
						selectedPillar={nav.selectedPillar}
						isImmersive={false}
						showBurgerMenu={false}
						hasPageSkin={false}
					/>
				</Hide>

				{/* Pillars nav desktop version */}
				<Hide until="desktop">
					<Pillars
						pillars={nav.pillars}
						dataLinkName={nestedOphanComponents(
							'header',
							'titlepiece',
							'nav',
						)}
						selectedPillar={nav.selectedPillar}
						isImmersive={false}
						showBurgerMenu={true}
						hasPageSkin={false}
					/>
				</Hide>
			</nav>

			{/* Veggie burger menu */}
			<div
				css={css`
					/* justify-self: end; */

					justify-self: center;

					${from.tablet} {
						justify-self: unset;
					}
					grid-area: burger;
				`}
			>
				<Hide from="desktop">
					<div css={burgerStyles}>
						<VeggieBurgerMenu />
					</div>
				</Hide>
			</div>

			<div css={horizontalLine} />

			{/* Subnav */}
			{nav.subNavSections && (
				<nav css={subnavStyles}>
					<ul css={subnavListStyles}>
						{nav.subNavSections.links.map(({ title, url }) => (
							<li key={title} css={subnavListItemStyles}>
								<a href={url} css={navLinkStyles}>
									{title}
								</a>
							</li>
						))}
					</ul>
				</nav>
			)}
		</header>
	);
};
