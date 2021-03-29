import React, { useEffect, useState } from 'react';
import { css } from 'emotion';
import libDebounce from 'lodash.debounce';

import { brandBackground, brandLine } from '@guardian/src-foundations/palette';

import { neutralBorder } from '@root/src/lib/pillars';
import { Section } from '@root/src/web/components/Section';
import { SubNav } from '@root/src/web/components/SubNav/SubNav';
import { getZIndex } from '@root/src/web/lib/getZIndex';
import { getCurrentPillar } from '@root/src/web/lib/layoutHelpers';

import { Nav as LazyNav } from './Nav';
import { Nav } from '../Nav';

interface BrowserProps {
	capiData: CAPIBrowserType;
	navData: BrowserNavType;
	format: Format;
	palette: Palette;
}

interface NavGroupLazyProps extends BrowserProps {
	ID: string;
}

interface NavGroupEagerProps {
	capiData: CAPIType;
	navData: NavType;
	format: Format;
	palette: Palette;
}

const stickyStyle = (theme: Theme) => css`
	position: sticky;
	top: 0;
	${getZIndex('stickyNav')}
	background-color: white;
	border-bottom: 1px solid ${neutralBorder(theme)};
`;

const fixedStyle = (theme: Theme, shouldDisplay: boolean) => css`
	width: 100%;
	position: fixed;
	top: 0;
	${getZIndex('stickyNav')}
	background-color: white;
	border-bottom: 1px solid ${neutralBorder(theme)};
	display: ${shouldDisplay ? 'block' : 'none'};
`;

export const NavGroupEager: React.FC<NavGroupEagerProps> = ({
	capiData,
	navData,
	format,
	palette,
}: NavGroupEagerProps) => (
	<>
		<Section
			showSideBorders={true}
			borderColour={brandLine.primary}
			showTopBorder={false}
			padded={false}
			backgroundColour={brandBackground.primary}
		>
			<Nav
				nav={navData}
				format={{
					...format,
					theme: getCurrentPillar(capiData),
				}}
				subscribeUrl={capiData.nav.readerRevenueLinks.header.subscribe}
				edition={capiData.editionId}
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
	</>
);

const NavGroupLazy: React.FC<NavGroupLazyProps> = ({
	capiData,
	navData,
	format,
	palette,
	ID,
}: NavGroupLazyProps) => (
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
				ajaxUrl={capiData.config.ajaxUrl}
			/>
		</Section>
		{navData.subNavSections && (
			<Section
				backgroundColour={palette.background.article}
				padded={false}
				sectionId="sub-nav-root-lazy"
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

// StickyNavAnchor is a basic, CSS only, sticky nav. The nav stays at the top of
// the viewport as the user scrolls past it's initial placement.
//
// *Note:* this uses position:sticky, which only works if the parent element is
// scrollable and has a fixed height.
export const StickyNavAnchor: React.FC<BrowserProps> = ({
	capiData,
	navData,
	palette,
	format,
}: BrowserProps) => {
	return (
		<div className={stickyStyle(format.theme)}>
			<NavGroupLazy
				capiData={capiData}
				navData={navData}
				palette={palette}
				format={format}
				ID="sticky-nav-anchor"
			/>
		</div>
	);
};

// StickyNavBackScroll reappears fixed to top of viewport if below initial buffer and user
// is scrolling back. The idea is that scrolling back up may indicate intent to
// reach nav.
export const StickyNavBackscroll: React.FC<BrowserProps> = ({
	capiData,
	navData,
	format,
	palette,
}: BrowserProps) => {
	const initialState = { shouldFix: false, scrollY: 0 };
	const [state, setState] = useState(initialState);

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
			<NavGroupLazy
				capiData={capiData}
				navData={navData}
				palette={palette}
				format={format}
				ID="nav"
			/>

			<div className={fixedStyle(format.theme, state.shouldFix)}>
				<NavGroupLazy
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
