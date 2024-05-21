import type { EditionId } from '../lib/edition';
import type { NavType } from '../model/extract-nav';
import { palette as themePalette } from '../palette';
import { Island } from './Island';
import { Nav } from './Nav/Nav';
import { Section } from './Section';
import { SubNav } from './SubNav.importable';
import { TopBar } from './TopBar.importable';

type Props = {
	nav: NavType;
	editionId: EditionId;
	idUrl?: string;
	mmaUrl?: string;
	subscribeUrl: string;
	discussionApiUrl: string;
	idApiUrl: string;
	showSubNav?: boolean;
	isImmersive?: boolean;
	displayRoundel?: boolean;
	hasPageSkin?: boolean;
	hasPageSkinContentSelfConstrain?: boolean;
};

/**
 * The Masthead component is intended to combine the Header components (TopBar, Logo, Nav) and on network fronts,
 * may include a "Highlights" container sandwiched between the TopBar and Titlepiece (comprising of Nav + Logo)
 *
 * The Masthead structure can be visualised as the following:
 *
 * +------------------+
 * |  Top Bar         |
 * |------------------|
 * |  Highlights      |
 * |------------------|
 * |  Nav    |  Logo  |
 * |------------------|
 * |  Sub Nav         |
 * +------------------+
 *
 * [`Masthead` on Chromatic](https://www.chromatic.com/component?appId=63e251470cfbe61776b0ef19&csfId=components-masthead)
 */
export const Masthead = ({
	nav,
	editionId,
	idUrl,
	mmaUrl,
	discussionApiUrl,
	subscribeUrl,
	idApiUrl,
	showSubNav = true,
	isImmersive,
	displayRoundel,
	hasPageSkin = false,
	hasPageSkinContentSelfConstrain = false,
}: Props) => (
	<>
		<Section
			fullWidth={true}
			showTopBorder={false}
			showSideBorders={false}
			padSides={false}
			shouldCenter={false}
			backgroundColour={themePalette('--masthead-top-bar-background')}
			element="header"
			hasPageSkin={hasPageSkin}
			hasPageSkinContentSelfConstrain={hasPageSkinContentSelfConstrain}
		>
			<div data-component="nav4">
				<Island priority="critical">
					<TopBar
						editionId={editionId}
						idUrl={idUrl}
						mmaUrl={mmaUrl}
						discussionApiUrl={discussionApiUrl}
						idApiUrl={idApiUrl}
						hasPageSkin={hasPageSkin}
					/>
				</Island>
			</div>
		</Section>

		<Section
			fullWidth={true}
			backgroundColour={themePalette('--masthead-nav-background')}
			borderColour={themePalette('--masthead-nav-border')}
			showTopBorder={false}
			padSides={false}
			element="nav"
			hasPageSkin={hasPageSkin}
			hasPageSkinContentSelfConstrain={hasPageSkinContentSelfConstrain}
		>
			<Nav
				nav={nav}
				subscribeUrl={subscribeUrl}
				selectedPillar={nav.selectedPillar}
				editionId={editionId}
				isImmersive={isImmersive}
				displayRoundel={displayRoundel}
			/>
		</Section>

		{nav.subNavSections && showSubNav && (
			<Section
				fullWidth={true}
				backgroundColour={themePalette('--article-background')}
				borderColour={themePalette('--article-border')}
				padSides={false}
				element="aside"
			>
				<Island priority="enhancement" defer={{ until: 'idle' }}>
					<SubNav
						subNavSections={nav.subNavSections}
						currentNavLink={nav.currentNavLink}
						position="header"
					/>
				</Island>
			</Section>
		)}
	</>
);
