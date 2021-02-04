import React, { useEffect, useState } from 'react';
import { css } from 'emotion';
import { neutralBorder } from '@root/src/lib/pillars';

import { Section } from '@root/src/web/components/Section';
import { SubNav } from '@root/src/web/components/SubNav/SubNav';
import { Nav } from '@root/src/web/components/Nav/Nav';
import { brandBackground, brandLine } from '@guardian/src-foundations/palette';

import libDebounce from 'lodash.debounce';
import { decideTheme } from '@root/src/web/lib/decideTheme';
import { decideDesign } from '@root/src/web/lib/decideDesign';

interface Props {
	CAPI: CAPIBrowserType;
	NAV: NavType;
	format: Format;
	palette: Palette;
}

const stickyStyle = (theme: Theme) => css`
	position: sticky;
	top: 0;
	z-index: 9000;
	background-color: white;
	box-shadow: 0 0 transparent, 0 0 transparent,
		1px 3px 6px ${neutralBorder(theme)};
`;

const fixedStyle = (theme: Theme) => css`
	width: 100%;
	position: fixed;
	top: 0;
	z-index: 9000;
	background-color: white;
	box-shadow: 0 0 transparent, 0 0 transparent,
		1px 3px 6px ${neutralBorder(theme)};
`;

export const NavGroup: React.FC<Props> = ({
	CAPI,
	NAV,
	format,
	palette,
}: Props) => {
	const theme = decideTheme({
		pillar: CAPI.pillar,
		design: decideDesign(CAPI.designType, CAPI.tags),
	});

	return (
		<div>
			<Section
				showSideBorders={true}
				borderColour={brandLine.primary}
				showTopBorder={false}
				padded={false}
				backgroundColour={brandBackground.primary}
			>
				<Nav
					nav={NAV}
					format={{
						...format,
						theme,
					}}
					subscribeUrl={CAPI.nav.readerRevenueLinks.header.subscribe}
					edition={CAPI.editionId}
				/>
			</Section>
			{NAV.subNavSections && (
				<Section
					backgroundColour={palette.background.article}
					padded={false}
					sectionId="sub-nav-root"
				>
					<SubNav
						subNavSections={NAV.subNavSections}
						currentNavLink={NAV.currentNavLink}
						palette={palette}
					/>
				</Section>
			)}
		</div>
	);
};

// StickyNavSimple is a basic, CSS only, sticky nav. The nav stays at the top of
// the viewport as the user scrolls past it's initial placement.
//
// *Note:* this uses position:sticky, which only works if the parent element is
// scrollable and has a fixed height.
const StickyNavSimple: React.FC<Props> = ({
	CAPI,
	NAV,
	palette,
	format,
}: Props) => {
	const theme = decideTheme({
		pillar: CAPI.pillar,
		design: decideDesign(CAPI.designType, CAPI.tags),
	});

	return (
		<div className={stickyStyle(theme)}>
			<NavGroup CAPI={CAPI} NAV={NAV} palette={palette} format={format} />
		</div>
	);
};

// StickyNavBackScroll reappears fixed to top of viewport if below initial buffer and user
// is scrolling back. The idea is that scrolling back up may indicate intent to
// reach nav.
const StickyNavBackscroll: React.FC<Props> = ({
	CAPI,
	NAV,
	format,
	palette,
}: Props) => {
	const initialState = { shouldFix: false, scrollY: 0 };
	const [state, setState] = useState(initialState);

	const pillar = decideTheme({
		pillar: CAPI.pillar,
		design: decideDesign(CAPI.designType, CAPI.tags),
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
			<NavGroup CAPI={CAPI} NAV={NAV} palette={palette} format={format} />

			{state.shouldFix && (
				<div className={fixedStyle(pillar)}>
					<NavGroup
						CAPI={CAPI}
						NAV={NAV}
						palette={palette}
						format={format}
					/>
				</div>
			)}
		</>
	);
};

// StickyNav is the entrypoint for the nav during this engagement test. It
// handles AB test logic and picks the right variant for the user.
export const StickyNav: React.FC<Props> = ({
	CAPI,
	NAV,
	palette,
	format,
}: Props) => {
	// const ABTestAPI = useAB();
	/* 	if (true) {
		// ABTestAPI.isUserInVariant('stickyNavTest', 'sticky-nav-simple')) {
		return (
			<StickyNavSimple
				CAPI={CAPI}
				NAV={NAV}
				palette={palette}
				format={format}
			/>
		);
	} */
	if (true) {
		// ABTestAPI.isUserInVariant('stickyNavTest', 'sticky-nav-backscroll')) {
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
