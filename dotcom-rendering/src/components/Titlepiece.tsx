import { css } from '@emotion/react';
import { from, space, textSans14 } from '@guardian/source/foundations';
import { SvgGuardianLogo } from '@guardian/source/react-components';
import type { EditionId } from '../lib/edition';
import { nestedOphanComponents } from '../lib/ophan-helpers';
import type { NavType } from '../model/extract-nav';
import { palette as themePalette } from '../palette';
import { TitlepieceEditionDropdown } from './TitlepieceEditionDropdown';
// import { TitlepieceGrid } from './TitlepieceGrid';
import { Pillars } from './TitlepiecePillars';
import { VeggieBurgerMenu } from './TitlepieceVeggieBurgerMenu';

interface TitlepieceProps {
	nav: NavType;
	editionId: EditionId;
}

const gridStyles = css`
	display: grid;
	grid-template-areas:
		'editionSwitcher . logo burger'
		'pillars pillars pillars pillars'
		'subnav subnav subnav subnav';

	${from.mobileLandscape} {
		grid-template-areas:
			'. . . logo'
			'pillars pillars pillars burger'
			'subnav subnav subnav subnav';
	}

	${from.desktop} {
		grid-template-areas:
			'. . . editionSwitcher'
			'pillars pillars burger logo'
			'subnav subnav subnav subnav';
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
	justify-self: end;
	margin-top: ${space[4]}px;

	${from.mobileLandscape} {
		margin-top: 0;
		align-self: auto;
	}
	${from.desktop} {
		margin: auto;
		align-self: center;
	}
`;

const navLinkStyles = css`
	color: ${themePalette('--masthead-nav-link-text')};
	text-decoration: none;
`;

const pillarsNavStyles = css`
	align-self: end;

	margin-top: ${space[2]}px;
	border-bottom: 1px solid ${themePalette('--masthead-nav-lines')};
`;

const sectionsNavStyles = css`
	${textSans14}
	height: 28px;
	margin-top: ${space[2]}px;
	overflow-x: scroll;
	ul {
		display: flex;
		column-gap: ${space[3]}px;
	}
	li {
		white-space: nowrap;
	}
	${from.mobileLandscape} {
		margin-top: ${space[3]}px;
	}
	${from.leftCol} {
		margin-top: 14px;
	}
`;

export const Titlepiece = ({ nav, editionId }: TitlepieceProps) => {
	return (
		<header css={[gridStyles, headerStyles]}>
			{/* Edition menu */}
			<div
				style={{ gridArea: 'editionSwitcher' }}
				css={editionSwitcherMenuStyles}
			>
				<TitlepieceEditionDropdown
					editionId={editionId}
					dataLinkName={nestedOphanComponents('header', 'titlepiece')}
				/>
			</div>

			{/* Guardian logo
			 * @todo - replace with <Logo /> component
			 */}
			<div style={{ gridArea: 'logo' }} css={guardianLogoStyles}>
				<a href="https://theguardian.com">
					<SvgGuardianLogo
						textColor={themePalette('--masthead-nav-link-text')}
					/>
				</a>
			</div>

			{/* Pillars nav mobile version */}
			<nav style={{ gridArea: 'pillars' }} css={pillarsNavStyles}>
				<Pillars
					pillars={nav.pillars}
					dataLinkName={nestedOphanComponents(
						'header',
						'titlepiece',
						'nav',
					)}
					selectedPillar={nav.selectedPillar}
					isImmersive={false}
					showLastPillarDivider={false}
					hasPageSkin={false}
				/>
			</nav>

			{/* Veggie burger menu */}
			<div style={{ gridArea: 'burger' }} css={burgerStyles}>
				<VeggieBurgerMenu />
			</div>

			{/* Sections nav */}
			{nav.subNavSections && (
				<nav style={{ gridArea: 'subnav' }} css={sectionsNavStyles}>
					<ul>
						{nav.subNavSections.links.map(({ title, url }) => (
							<li key={title}>
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
