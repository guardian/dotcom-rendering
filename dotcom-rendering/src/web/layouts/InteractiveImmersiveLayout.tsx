import React from 'react';
import { css, Global } from '@emotion/react';

import {
	neutral,
	brandBackground,
	brandBorder,
} from '@guardian/src-foundations/palette';
import { from, until } from '@guardian/src-foundations/mq';
import type { ArticleFormat } from '@guardian/libs';

import { Footer } from '@root/src/web/components/Footer';
import { SubNav } from '@root/src/web/components/SubNav/SubNav';
import { ElementContainer } from '@root/src/web/components/ElementContainer';
import {
	MobileStickyContainer,
	AdSlot,
	labelStyles as adLabelStyles,
	adCollapseStyles,
} from '@root/src/web/components/AdSlot';
import { BannerWrapper } from '@root/src/web/layouts/lib/stickiness';
import { interactiveGlobalStyles } from './lib/interactiveLegacyStyling';
import { ImmersiveHeader } from './ImmersiveHeader';
import { renderElement } from '../lib/renderElement';

interface Props {
	CAPI: CAPIType;
	NAV: NavType;
	format: ArticleFormat;
	palette: Palette;
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

interface Props {
	CAPI: CAPIType;
	NAV: NavType;
	format: ArticleFormat;
	palette: Palette;
}

export const InteractiveImmersiveLayout = ({
	CAPI,
	NAV,
	format,
	palette,
}: Props) => {
	const {
		config: { host },
	} = CAPI;

	return (
		<>
			{CAPI.isLegacyInteractive && (
				<Global styles={interactiveGlobalStyles} />
			)}
			{CAPI.config.switches.surveys && (
				<AdSlot position="survey" display={format.display} />
			)}

			<ImmersiveHeader
				CAPI={CAPI}
				NAV={NAV}
				format={format}
				palette={palette}
			/>
			<main>
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
							elements={
								CAPI.blocks[0] ? CAPI.blocks[0].elements : []
							}
							host={host}
							pageId={CAPI.pageId}
							webTitle={CAPI.webTitle}
						/>
					</article>
				</ElementContainer>
			</main>

			{NAV.subNavSections && (
				<ElementContainer
					padded={false}
					sectionId="sub-nav-root"
					backgroundColour={neutral[100]}
					element="nav"
				>
					<SubNav
						subNavSections={NAV.subNavSections}
						currentNavLink={NAV.currentNavLink}
						palette={palette}
						format={format}
					/>
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
