import { css, Global } from '@emotion/react';

import {
	brandBackground,
	brandBorder,
	labs,
	border,
	brandLine,
	neutral,
	from,
	until,
} from '@guardian/source-foundations';
import { ArticleDisplay, ArticleFormat, ArticleSpecial } from '@guardian/libs';

import { Footer } from '@root/src/web/components/Footer';
import { SubNav } from '@root/src/web/components/SubNav.importable';
import { ElementContainer } from '@root/src/web/components/ElementContainer';
import { Nav } from '@root/src/web/components/Nav/Nav';
import {
	MobileStickyContainer,
	labelStyles as adLabelStyles,
	adCollapseStyles,
} from '@root/src/web/components/AdSlot';
import { LabsHeader } from '@frontend/web/components/LabsHeader';

import { getZIndex } from '@frontend/web/lib/getZIndex';

import { Stuck, BannerWrapper } from '@root/src/web/layouts/lib/stickiness';
import { getCurrentPillar } from '@root/src/web/lib/layoutHelpers';

import { renderElement } from '../lib/renderElement';
import { Header } from '../components/Header';
import { HeaderAdSlot } from '../components/HeaderAdSlot';
import { interactiveGlobalStyles } from './lib/interactiveLegacyStyling';
import { decidePalette } from '../lib/decidePalette';
import { Island } from '../components/Island';

interface Props {
	CAPI: CAPIType;
	NAV: NavType;
	format: ArticleFormat;
}

const Renderer: React.FC<{
	format: ArticleFormat;
	palette: Palette;
	elements: CAPIElement[];
	host?: string;
	pageId: string;
	webTitle: string;
}> = ({ format, palette, elements, host, pageId, webTitle }) => {
	// const cleanedElements = elements.map(element =>
	//     'html' in element ? { ...element, html: clean(element.html) } : element,
	// );
	// ^^ Until we decide where to do the "isomorphism split" in this this code is not safe here.
	//    But should be soon.
	const output = elements.map((element, index) => {
		const [ok, el] = renderElement({
			format,
			palette,
			element,
			adTargeting: undefined,
			host,
			index,
			isMainMedia: false,
			pageId,
			webTitle,
		});

		if (ok) {
			switch (element._type) {
				// Here we think it makes sense not to wrap every `p` inside a `figure`
				case 'model.dotcomrendering.pageElements.InteractiveBlockElement':
				case 'model.dotcomrendering.pageElements.TextBlockElement':
					return el;

				default:
					return (
						<figure
							id={
								'elementId' in element
									? element.elementId
									: undefined
							}
							key={index}
						>
							{el}
						</figure>
					);
			}
		}

		return null;
	});

	const adStyles = css`
		${adLabelStyles}
		${adCollapseStyles}

		${from.tablet} {
			.mobile-only .ad-slot {
				display: none;
			}
		}
		${until.tablet} {
			.hide-until-tablet .ad-slot {
				display: none;
			}
		}
	`;

	return <div css={adStyles}>{output}</div>;
};

const NavHeader = ({ CAPI, NAV, format }: Props): JSX.Element => {
	// Typically immersives use the slim nav, but this switch is used to force
	// the full nav - typically during special events such as Project 200, or
	// the Euros. The motivation is to better onboard new visitors; interactives
	// often reach readers who are less familiar with the Guardian.
	const isSlimNav = !CAPI.config.switches.interactiveFullHeaderSwitch;

	if (isSlimNav) {
		return (
			<div
				css={css`
					${getZIndex('headerWrapper')}
					order: 0;
				`}
			>
				<ElementContainer
					showSideBorders={true}
					borderColour={brandLine.primary}
					showTopBorder={false}
					padded={false}
					backgroundColour={brandBackground.primary}
					element="nav"
				>
					<Nav
						format={{
							display: format.display,
							design: format.design,
							theme: getCurrentPillar(CAPI),
						}}
						nav={NAV}
						subscribeUrl={
							CAPI.nav.readerRevenueLinks.header.subscribe
						}
						edition={CAPI.editionId}
					/>
				</ElementContainer>
			</div>
		);
	}

	return (
		<section
			/* Note, some interactives require this - e.g. https://www.theguardian.com/environment/ng-interactive/2015/jun/05/carbon-bomb-the-coal-boom-choking-china. */
			css={css`
				${getZIndex('headerWrapper')};
				position: relative;
			`}
		>
			<Stuck>
				<div data-print-layout="hide">
					<ElementContainer
						showTopBorder={false}
						showSideBorders={false}
						padded={false}
						shouldCenter={false}
						element="aside"
					>
						<HeaderAdSlot
							isAdFreeUser={CAPI.isAdFreeUser}
							shouldHideAds={CAPI.shouldHideAds}
							display={format.display}
						/>
					</ElementContainer>
				</div>
			</Stuck>

			{format.theme !== ArticleSpecial.Labs && (
				<div data-print-layout="hide">
					<ElementContainer
						showTopBorder={false}
						showSideBorders={false}
						padded={false}
						backgroundColour={brandBackground.primary}
						element="header"
					>
						<Header
							edition={CAPI.editionId}
							idUrl={CAPI.config.idUrl}
							mmaUrl={CAPI.config.mmaUrl}
							isAnniversary={
								CAPI.config.switches.anniversaryHeaderSvg
							}
						/>
					</ElementContainer>
				</div>
			)}

			<ElementContainer
				showSideBorders={true}
				borderColour={brandLine.primary}
				showTopBorder={false}
				padded={false}
				backgroundColour={brandBackground.primary}
				element="nav"
			>
				<Nav
					format={{
						display: ArticleDisplay.Standard,
						design: format.design,
						theme: getCurrentPillar(CAPI),
					}}
					nav={NAV}
					subscribeUrl={CAPI.nav.readerRevenueLinks.header.subscribe}
					edition={CAPI.editionId}
				/>
			</ElementContainer>

			{NAV.subNavSections && format.theme !== ArticleSpecial.Labs && (
				<ElementContainer
					backgroundColour={neutral[100]}
					padded={false}
					element="aside"
				>
					<Island deferUntil="idle">
						<SubNav
							subNavSections={NAV.subNavSections}
							currentNavLink={NAV.currentNavLink}
							format={format}
						/>
					</Island>
				</ElementContainer>
			)}
		</section>
	);
};

export const FullPageInteractiveLayout = ({
	CAPI,
	NAV,
	format,
}: Props): JSX.Element => {
	const {
		config: { host },
	} = CAPI;

	const palette = decidePalette(format);

	return (
		<>
			{CAPI.isLegacyInteractive && (
				<Global styles={interactiveGlobalStyles} />
			)}
			<header
				css={css`
					background-color: ${palette.background.article};
				`}
			>
				<NavHeader CAPI={CAPI} NAV={NAV} format={format} />

				{format.theme === ArticleSpecial.Labs && (
					<Stuck>
						<ElementContainer
							showSideBorders={true}
							showTopBorder={false}
							backgroundColour={labs[400]}
							borderColour={border.primary}
							sectionId="labs-header"
						>
							<LabsHeader />
						</ElementContainer>
					</Stuck>
				)}
			</header>

			<ElementContainer
				showTopBorder={false}
				showSideBorders={false}
				shouldCenter={false}
				padded={false}
				backgroundColour={palette.background.article}
				element="main"
			>
				<article>
					<Renderer
						format={format}
						palette={palette}
						elements={CAPI.blocks[0] ? CAPI.blocks[0].elements : []}
						host={host}
						pageId={CAPI.pageId}
						webTitle={CAPI.webTitle}
					/>
				</article>
			</ElementContainer>

			{NAV.subNavSections && (
				<ElementContainer
					padded={false}
					backgroundColour={neutral[100]}
					element="aside"
				>
					<Island deferUntil="visible">
						<SubNav
							subNavSections={NAV.subNavSections}
							currentNavLink={NAV.currentNavLink}
							format={format}
						/>
					</Island>
				</ElementContainer>
			)}

			<ElementContainer
				padded={false}
				backgroundColour={brandBackground.primary}
				borderColour={brandBorder.primary}
				showSideBorders={false}
				element="footer"
			>
				<Footer
					pageFooter={CAPI.pageFooter}
					pillar={format.theme}
					pillars={NAV.pillars}
				/>
			</ElementContainer>

			<BannerWrapper />
			<MobileStickyContainer />
		</>
	);
};
