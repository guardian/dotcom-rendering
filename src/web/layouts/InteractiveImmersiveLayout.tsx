import { css } from '@emotion/react';

import {
	brandBackground,
	brandBorder,
	labs,
	border,
} from '@guardian/src-foundations/palette';
import { from } from '@guardian/src-foundations/mq';
import { Design, Special } from '@guardian/types';
import type { Format } from '@guardian/types';

import { GuardianLines } from '@root/src/web/components/GuardianLines';
import { MainMedia } from '@root/src/web/components/MainMedia';
import { ArticleTitle } from '@root/src/web/components/ArticleTitle';
import { ArticleHeadline } from '@root/src/web/components/ArticleHeadline';
import { Footer } from '@root/src/web/components/Footer';
import { SubNav } from '@root/src/web/components/SubNav/SubNav';
import { Section } from '@root/src/web/components/Section';
import { Nav } from '@root/src/web/components/Nav/Nav';
import { MobileStickyContainer } from '@root/src/web/components/AdSlot';
import { Caption } from '@root/src/web/components/Caption';
import { ContainerLayout } from '@root/src/web/components/ContainerLayout';
import { LabsHeader } from '@frontend/web/components/LabsHeader';

import { getZIndex } from '@frontend/web/lib/getZIndex';

import { Stuck, BannerWrapper } from '@root/src/web/layouts/lib/stickiness';
import { getCurrentPillar } from '@root/src/web/lib/layoutHelpers';
import { renderElement } from '../lib/renderElement';

const hasMainMediaStyles = css`
	height: 100vh;
	/**
    100vw is normally enough but don't let the content shrink vertically too
    much just in case
    */
	min-height: 25rem;
	${from.desktop} {
		min-height: 31.25rem;
	}
	${from.wide} {
		min-height: 50rem;
	}
`;

interface Props {
	CAPI: CAPIType;
	NAV: NavType;
	format: Format;
	palette: Palette;
}

const decideCaption = (mainMedia: ImageBlockElement): string => {
	const caption = [];
	if (mainMedia && mainMedia.data && mainMedia.data.caption)
		caption.push(mainMedia.data.caption);
	if (
		mainMedia &&
		mainMedia.displayCredit &&
		mainMedia.data &&
		mainMedia.data.credit
	)
		caption.push(mainMedia.data.credit);
	return caption.join(' ');
};

const Box = ({
	palette,
	children,
}: {
	palette: Palette;
	children: React.ReactNode;
}) => (
	<div
		css={css`
			/*
				This pseudo css shows a black box to the right of the headline
				so that the black background of the inverted text stretches
				all the way right. But only from mobileLandscape because below
				that we want to show a gap. To work properly it needs to wrap
				the healine so it inherits the correct height based on the length
				of the headline text
			*/
			${from.mobileLandscape} {
				position: relative;
				:after {
					content: '';
					display: block;
					position: absolute;
					width: 50%;
					right: 0;
					background-color: ${palette.background.headline};
					${getZIndex('immersiveBlackBox')}
					top: 0;
					bottom: 0;
				}
			}
		`}
	>
		{children}
	</div>
);

const Renderer: React.FC<{
	format: Format;
	palette: Palette;
	elements: CAPIElement[];
	host?: string;
}> = ({ format, palette, elements, host }) => {
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
		});

		return ok ? (
			<figure id={'id' in element ? element.id : undefined}>{el}</figure>
		) : null;
	});

	return <div>{output}</div>;
};

export const InteractiveImmersiveLayout = ({
	CAPI,
	NAV,
	format,
	palette,
}: Props): JSX.Element => {
	const {
		config: { host },
	} = CAPI;

	const mainMedia = CAPI.mainMediaElements[0] as ImageBlockElement;
	const captionText = decideCaption(mainMedia);

	const HEADLINE_OFFSET = mainMedia ? 120 : 0;

	const LeftColCaption = () => (
		<div
			css={css`
				margin-top: ${HEADLINE_OFFSET}px;
				position: absolute;
				margin-left: 20px;
			`}
		>
			<Caption
				palette={palette}
				captionText={captionText}
				format={format}
				shouldLimitWidth={true}
				isLeftCol={true}
			/>
		</div>
	);

	return (
		<>
			<div
				css={css`
					background-color: ${palette.background.article};
				`}
			>
				<div
					css={[
						mainMedia && hasMainMediaStyles,
						css`
							display: flex;
							flex-direction: column;
						`,
					]}
				>
					<header
						css={css`
							${getZIndex('headerWrapper')}
							order: 0;
						`}
					>
						<Section
							showSideBorders={false}
							showTopBorder={false}
							padded={false}
							backgroundColour={brandBackground.primary}
						>
							<Nav
								format={{
									...format,
									theme: getCurrentPillar(CAPI),
								}}
								nav={NAV}
								subscribeUrl={
									CAPI.nav.readerRevenueLinks.header.subscribe
								}
								edition={CAPI.editionId}
							/>
						</Section>
					</header>

					{format.theme === Special.Labs && (
						<Stuck>
							<Section
								showSideBorders={true}
								showTopBorder={false}
								backgroundColour={labs[400]}
								borderColour={border.primary}
								sectionId="labs-header"
							>
								<LabsHeader />
							</Section>
						</Stuck>
					)}

					<MainMedia
						format={format}
						palette={palette}
						elements={CAPI.mainMediaElements}
						adTargeting={undefined}
						starRating={
							format.design === Design.Review && CAPI.starRating
								? CAPI.starRating
								: undefined
						}
						host={host}
						hideCaption={true}
					/>
				</div>
				{mainMedia && (
					<>
						<div
							css={css`
								margin-top: -${HEADLINE_OFFSET}px;
								/*
                        This z-index is what ensures the headline title text shows above main media. For
                        the actual headline we set the z-index deeper in ArticleHeadline itself so that
                        the text appears above the pseudo Box element
                    */
								position: relative;
								${getZIndex('articleHeadline')};
							`}
						>
							<ContainerLayout
								verticalMargins={false}
								padContent={false}
								padSides={false}
								leftContent={<LeftColCaption />}
							>
								<ArticleTitle
									format={format}
									palette={palette}
									tags={CAPI.tags}
									sectionLabel={CAPI.sectionLabel}
									sectionUrl={CAPI.sectionUrl}
									guardianBaseURL={CAPI.guardianBaseURL}
									badge={CAPI.badge}
								/>
							</ContainerLayout>
							<Box palette={palette}>
								<ContainerLayout
									verticalMargins={false}
									padContent={false}
									padSides={false}
								>
									<ArticleHeadline
										format={format}
										headlineString={CAPI.headline}
										palette={palette}
										tags={CAPI.tags}
										byline={CAPI.author.byline}
									/>
								</ContainerLayout>
							</Box>
						</div>
					</>
				)}
			</div>
			<Section
				showTopBorder={false}
				showSideBorders={false}
				shouldCenter={false}
				padded={false}
				backgroundColour={palette.background.article}
			>
				<main>
					<Renderer
						format={format}
						palette={palette}
						elements={CAPI.blocks[0] ? CAPI.blocks[0].elements : []}
						host={host}
					/>
				</main>
			</Section>

			{NAV.subNavSections && (
				<Section padded={false} sectionId="sub-nav-root">
					<SubNav
						subNavSections={NAV.subNavSections}
						currentNavLink={NAV.currentNavLink}
						palette={palette}
					/>
					<GuardianLines count={4} palette={palette} />
				</Section>
			)}

			<Section
				padded={false}
				backgroundColour={brandBackground.primary}
				borderColour={brandBorder.primary}
				showSideBorders={false}
			>
				<Footer
					pageFooter={CAPI.pageFooter}
					pillar={format.theme}
					pillars={NAV.pillars}
				/>
			</Section>

			<BannerWrapper />
			<MobileStickyContainer />
		</>
	);
};
