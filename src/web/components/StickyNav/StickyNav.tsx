import React, { useEffect, useState } from 'react';
import { css } from 'emotion';
import { neutralBorder } from '@root/src/lib/pillars';

import { Section } from '@root/src/web/components/Section';
import { SubNav } from '@root/src/web/components/SubNav/SubNav';
import { brandBackground, brandLine } from '@guardian/src-foundations/palette';

import libDebounce from 'lodash.debounce';
import { decideTheme } from '@root/src/web/lib/decideTheme';
import { decideDesign } from '@root/src/web/lib/decideDesign';
// import { useAB } from '@guardian/ab-react';
// import { getZIndex } from '@root/src/web/lib/getZIndex';
import { LazyNav } from './LazyNav';

interface Props {
	capiData: CAPIBrowserType;
	navData: BrowserNavType;
	format: Format;
	palette: Palette;
}

interface NavGroupProps extends Props {
	ID: string;
}

const stickyStyle = (theme: Theme) => css`
	position: sticky;
	top: 0;
	z-index: 900;
	background-color: white;
	box-shadow: 0 0 transparent, 0 0 transparent,
		1px 3px 6px ${neutralBorder(theme)};
`;

const fixedStyle = (theme: Theme, shouldDisplay: boolean) => css`
	width: 100%;
	position: fixed;
	top: 0;
	z-index: 900;
	background-color: white;
	box-shadow: 0 0 transparent, 0 0 transparent,
		1px 3px 6px ${neutralBorder(theme)};

	display: ${shouldDisplay ? 'block' : 'none'};
`;

export const NavGroup: React.FC<NavGroupProps> = ({
	capiData,
	navData,
	format,
	palette,
	ID,
}: NavGroupProps) => (
	<div>
		<Section
			showSideBorders={true}
			borderColour={brandLine.primary}
			showTopBorder={false}
			padded={false}
			backgroundColour={brandBackground.primary}
		>
			<LazyNav
				topLevelPillars={navData.topLevelPillars}
				format={format}
				subscribeUrl={capiData.nav.readerRevenueLinks.header.subscribe}
				edition={capiData.editionId}
				currentNavLinkTitle={navData.currentNavLink}
				ID={ID || 'lazy-nav'}
			/>
		</Section>
		{navData.subNavSections && (
			<Section
				backgroundColour={palette.background.article}
				padded={false}
				sectionId="sub-nav-root"
			>
				<SubNav
					subNavSections={navData.subNavSections}
					currentNavLink={navData.currentNavLink}
					palette={palette}
				/>
			</Section>
		)}
	</div>
);

// StickyNavSimple is a basic, CSS only, sticky nav. The nav stays at the top of
// the viewport as the user scrolls past it's initial placement.
//
// *Note:* this uses position:sticky, which only works if the parent element is
// scrollable and has a fixed height.
export const StickyNavSimple: React.FC<Props> = ({
	capiData,
	navData,
	palette,
	format,
}: Props) => {
	const theme = decideTheme({
		pillar: capiData.pillar,
		design: decideDesign(capiData.designType, capiData.tags),
	});

	return (
		<div className={stickyStyle(theme)}>
			<NavGroup
				capiData={capiData}
				navData={navData}
				palette={palette}
				format={format}
				ID="sticky-nav-simple"
			/>
		</div>
	);
};

// StickyNavBackScroll reappears fixed to top of viewport if below initial buffer and user
// is scrolling back. The idea is that scrolling back up may indicate intent to
// reach nav.
export const StickyNavBackscroll: React.FC<Props> = ({
	capiData,
	navData,
	format,
	palette,
}: Props) => {
	const initialState = { shouldFix: false, scrollY: 0 };
	const [state, setState] = useState(initialState);

	const pillar = decideTheme({
		pillar: capiData.pillar,
		design: decideDesign(capiData.designType, capiData.tags),
	});

	useEffect(() => {
		const handle = () => {
			setState((oldState) => {
				const buffer = 300;
				const newY = window.scrollY;
				const goingBack = newY < oldState.scrollY;
				const beforeRange = newY < buffer;

				return {
					shouldFix: goingBack && !beforeRange,
					scrollY: newY,
				};
			});
		};

		window.addEventListener('scroll', libDebounce(handle, 20), {
			passive: true,
		});

		return () => {
			window.removeEventListener('scroll', handle);
		};
	}, []);

	return (
		<>
			<NavGroup
				capiData={capiData}
				navData={navData}
				palette={palette}
				format={format}
				ID="nav"
			/>

			<div className={fixedStyle(pillar, state.shouldFix)}>
				<NavGroup
					capiData={capiData}
					navData={navData}
					palette={palette}
					format={format}
					ID="sticky-nav-backscroll"
				/>
			</div>
		</>
	);
};

// StickyNav is the entrypoint for the nav during this engagement test. It
// handles AB test logic and picks the right variant for the user.
//
// Relies on AB data so *client-side only.*
/* export const StickyNav: React.FC<Props> = ({
	CAPI,
	NAV,
	palette,
	format,
}: Props) => {
	const ABTestAPI = useAB();

	if (ABTestAPI.isUserInVariant('stickyNavTest', 'sticky-nav-simple')) {
		return (
			<StickyNavSimple
				CAPI={CAPI}
				NAV={NAV}
				palette={palette}
				format={format}
			/>
		);
	}
	if (ABTestAPI.isUserInVariant('stickyNavTest', 'sticky-nav-backscroll')) {
		return (
			<StickyNavBackscroll
				CAPI={CAPI}
				NAV={NAV}
				palette={palette}
				format={format}
			/>
		);
	}
	// For both control and those not in the test.
	return <NavGroup CAPI={CAPI} NAV={NAV} palette={palette} format={format} />;
};
 */
