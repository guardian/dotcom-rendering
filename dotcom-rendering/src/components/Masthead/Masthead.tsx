import type { ReactElement } from 'react';
import type { EditionId } from '../../lib/edition';
import type { NavType } from '../../model/extract-nav';
import { palette as themePalette } from '../../palette';
import { Island } from '../Island';
import { Section } from '../Section';
import { Titlepiece } from '../Titlepiece.importable';
import { TopBar } from '../TopBar.importable';

type Props = {
	nav: NavType;
	highlights?: ReactElement;
	editionId: EditionId;
	idUrl?: string;
	mmaUrl?: string;
	contributionsServiceUrl: string;
	discussionApiUrl: string;
	idApiUrl: string;
	showSubNav?: boolean;
	isImmersive?: boolean;
	hasPageSkin?: boolean;
	hasPageSkinContentSelfConstrain?: boolean;
	pageId?: string;
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
	highlights,
	editionId,
	idUrl,
	mmaUrl,
	discussionApiUrl,
	idApiUrl,
	contributionsServiceUrl,
	showSubNav = true,
	isImmersive,
	hasPageSkin = false,
	hasPageSkinContentSelfConstrain = false,
	pageId,
}: Props) => (
	<header data-component="header">
		<Section
			fullWidth={true}
			showTopBorder={false}
			showSideBorders={false}
			padSides={false}
			shouldCenter={false}
			backgroundColour={themePalette('--masthead-top-bar-background')}
			hasPageSkin={hasPageSkin}
			hasPageSkinContentSelfConstrain={hasPageSkinContentSelfConstrain}
		>
			<div data-component="topbar">
				<Island priority="critical">
					<TopBar
						editionId={editionId}
						idUrl={idUrl}
						mmaUrl={mmaUrl}
						discussionApiUrl={discussionApiUrl}
						idApiUrl={idApiUrl}
						contributionsServiceUrl={contributionsServiceUrl}
						hasPageSkin={hasPageSkin}
					/>
				</Island>
			</div>
		</Section>

		{highlights && (
			<Section
				shouldCenter={true}
				showSideBorders={false}
				fullWidth={true}
				backgroundColour={themePalette(
					'--highlights-container-background',
				)}
				borderColour={themePalette('--highlights-container-border')}
				showTopBorder={false}
				padSides={false}
				element="section"
				hasPageSkin={hasPageSkin}
				hasPageSkinContentSelfConstrain={
					hasPageSkinContentSelfConstrain
				}
			>
				{highlights}
			</Section>
		)}

		<Island priority="critical">
			<Titlepiece
				nav={nav}
				editionId={editionId}
				showSubNav={showSubNav}
				isImmersive={isImmersive}
				hasPageSkin={hasPageSkin}
				pageId={pageId}
			/>
		</Island>
	</header>
);
