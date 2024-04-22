import { palette as sourcePalette } from '@guardian/source-foundations';
import type { EditionId } from '../lib/edition';
import type { NavType } from '../model/extract-nav';
import { Island } from './Island';
import { Nav } from './Nav/Nav';
import { Section } from './Section';
import { SubNav } from './SubNav.importable';
import { TopBar } from './TopBar.importable';

/** Ensures we do not cause CLS from lazy loaded component height */
// const explicitHeight = css`
// 	overflow: hidden;
// 	height: 80px;
// 	${from.mobileMedium} {
// 		height: 100px;
// 	}
// 	${from.tablet} {
// 		height: 120px;
// 	}
// 	${from.desktop} {
// 		height: 150px;
// 	}
// `;

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
			backgroundColour={sourcePalette.brand[300]}
			element="header"
			hasPageSkin={hasPageSkin}
			hasPageSkinContentSelfConstrain={hasPageSkinContentSelfConstrain}
		>
			<div data-component="nav3">
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
			borderColour={sourcePalette.brand[600]}
			showTopBorder={false}
			padSides={false}
			backgroundColour={sourcePalette.brand[400]}
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
			<>
				<Section
					fullWidth={true}
					backgroundColour={sourcePalette.brand[400]}
					padSides={false}
					element="aside"
				>
					<Island priority="enhancement" defer={{ until: 'idle' }}>
						<SubNav
							subNavSections={nav.subNavSections}
							currentNavLink={nav.currentNavLink}
							linkHoverColour={sourcePalette.brandAlt[400]}
							borderColour={sourcePalette.neutral[97]}
						/>
					</Island>
				</Section>
			</>
		)}
	</>
);
