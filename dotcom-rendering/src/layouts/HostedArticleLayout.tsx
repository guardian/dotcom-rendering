import { css } from '@emotion/react';
import {
	breakpoints,
	from,
	palette as sourcePalette,
	space,
} from '@guardian/source/foundations';
import { ArticleBody } from '../components/ArticleBody';
import { ArticleContainer } from '../components/ArticleContainer';
import { ArticleHeadline } from '../components/ArticleHeadline';
import { CallToActionAtom } from '../components/CallToActionAtom';
import { Caption } from '../components/Caption';
import { HostedContentDisclaimer } from '../components/HostedContentDisclaimer';
import { HostedContentHeader } from '../components/HostedContentHeader';
import { HostedContentOnwards } from '../components/HostedContentOnwards';
import { Island } from '../components/Island';
import { MainMedia } from '../components/MainMedia';
import { Section } from '../components/Section';
import { ShareButton } from '../components/ShareButton.island';
import { Standfirst } from '../components/Standfirst';
import { grid } from '../grid';
import type { ArticleFormat } from '../lib/articleFormat';
import { getContributionsServiceUrl } from '../lib/contributions';
import { decideMainMediaCaption } from '../lib/decide-caption';
import { palette as themePalette } from '../palette';
import type { Article } from '../types/article';
import type { Block } from '../types/blocks';
import type { RenderingTarget } from '../types/renderingTarget';
import type { TrailType } from '../types/trails';
import { Stuck } from './lib/stickiness';

interface Props {
	content: Article;
	format: ArticleFormat;
	renderingTarget: RenderingTarget;
	serverTime?: number;
}

interface WebProps extends Props {
	renderingTarget: 'Web';
}

interface AppProps extends Props {
	renderingTarget: 'Apps';
}

const containerStyles = css`
	${grid.container}

	${from.desktop} {
		${grid.paddedContainer}
	}
`;

const mainMediaStyles = css`
	${grid.column.all}
	grid-row-start: 1;

	overflow: hidden;
	max-height: 400px;

	${from.wide} {
		width: ${breakpoints.wide}px;
		margin: auto;
	}
`;

const captionStyles = css`
	${grid.column.centre}
	grid-row-start: 2;

	${from.desktop} {
		${grid.span(12, 2)}
	}
	${from.leftCol} {
		${grid.column.right}
	}
`;

const headlineStyles = css`
	${grid.column.centre}
	grid-row-start: 4;

	margin-top: ${space[4]}px;

	${from.desktop} {
		${grid.span(4, 8)}
		grid-row-start: 2;
	}

	${from.leftCol} {
		${grid.column.centre}
	}
`;

const metaStyles = css`
	${grid.column.centre}
	grid-row-start: 3;

	${from.desktop} {
		grid-row-start: 2;
	}

	${from.leftCol} {
		${grid.column.left}
	}
`;

const shareButtonStyles = css`
	margin-top: ${space[4]}px;
	padding: ${space[1]}px;
`;

const standfirstStyles = css`
	${grid.column.centre}
	grid-row-start: 5;

	${from.desktop} {
		${grid.between(4, 'right-column-end')}
		grid-row-start: 3;
	}

	${from.leftCol} {
		${grid.column.centre}
	}
`;

const articleBodyStyles = css`
	${grid.column.centre}

	margin-bottom: ${space[6]}px;

	${from.desktop} {
		${grid.between(4, 'right-column-end')}
		margin-bottom: ${space[10]}px;
	}

	${from.leftCol} {
		${grid.column.centre}
	}
`;

const onwardContentStyles = css`
	${grid.column.centre}

	margin-bottom: ${space[5]}px;

	${from.desktop} {
		${grid.span(4, 8)}
		margin-bottom: ${space[10]}px;
	}

	${from.leftCol} {
		${grid.column.right}
		grid-row-start: 3;
	}
`;

const ctaStyles = css`
	z-index: 1;
	${grid.column.all}

	overflow: hidden;
	max-height: 400px;
	${from.wide} {
		width: ${breakpoints.wide}px;
		margin: auto;
	}
`;

const sideBorders = css`
	${from.desktop} {
		/* box-sizing property needed to prevent the width of the grid taking into account the border width */
		box-sizing: content-box;
		border-left: 1px solid ${themePalette('--article-border')};
		border-right: 1px solid ${themePalette('--article-border')};
	}
`;
// This is dummy data until we have the actual trails for hosted content onwards.
export const trails: TrailType[] = [
	{
		url: 'https://www.theguardian.com/money/gallery/2026/mar/27/loft-style-apartments-for-sale-in-england-in-pictures',
		headline: 'Loft-style apartments for sale in England – in pictures',
		format: { design: 27, display: 1, theme: 6 },
		dataLinkName: 'media | group-0 | card-@1',
		image: {
			src: 'https://media.guim.co.uk/276ed08e0380a9a3045a779ea1ca8c93f7c1b51e/500_0_5000_4000/2000.jpg',
			altText:
				'Loft-style apartment interior in Clapton, east London with industrial design elements',
		},
	},
	{
		url: 'https://www.theguardian.com/books/2026/apr/01/under-water-by-tara-menon-review-love-loss-and-a-longing-for-the-ocean',
		headline:
			'Under Water by Tara Menon review – love, loss and a longing for the ocean',
		format: { design: 27, display: 1, theme: 6 },
		dataLinkName: 'media | group-0 | card-@2',
		image: {
			src: 'https://media.guim.co.uk/95d6b3df9e3471344dc19a32d94bb3d5ff6f5016/205_5_2978_2382/2000.jpg',
			altText: 'Tropical fish',
		},
	},
	{
		url: 'https://www.theguardian.com/money/gallery/2026/feb/27/homes-a-short-walk-from-the-sea-in-england-and-scotland-in-pictures',
		headline:
			'Homes a short walk from the sea in England and Scotland – in pictures',
		format: { design: 27, display: 1, theme: 6 },
		dataLinkName: 'media | group-0 | card-@3',
		image: {
			src: 'https://media.guim.co.uk/9879e5d3275b5dae8c8bfd8e1ac700332e2de8c4/237_0_3750_3000/2000.jpg',
			altText: 'Craster, Northumberland',
		},
	},
];

export const HostedArticleLayout = (props: WebProps | AppProps) => {
	const {
		content: { frontendData },
		renderingTarget,
		format,
	} = props;

	const contributionsServiceUrl = getContributionsServiceUrl(frontendData);

	const mainMedia = frontendData.mainMediaElements[0];
	const mainMediaCaptionText = decideMainMediaCaption(mainMedia);

	const { branding } =
		frontendData.commercialProperties[frontendData.editionId];

	//The CTA block element is rendered separately at the end of the article body because otherwise we won't be able to have it at the end of the page.
	const cta = frontendData.blocks[0]?.elements.find(
		(element) =>
			element._type ===
			'model.dotcomrendering.pageElements.CallToActionAtomBlockElement',
	);

	//We need to remove the CTA block element from the blocks that are rendered in the article body, otherwise it will be rendered twice.
	const blocks: Block[] = frontendData.blocks.map((block) => ({
		...block,
		elements: block.elements.filter(
			(element) =>
				element._type !==
				'model.dotcomrendering.pageElements.CallToActionAtomBlockElement',
		),
	}));

	return (
		<>
			{branding ? (
				<Stuck>
					<Section
						fullWidth={true}
						showSideBorders={false}
						showTopBorder={false}
						shouldCenter={false}
						backgroundColour={sourcePalette.neutral[7]}
						padSides={false}
						element="header"
					>
						<HostedContentHeader branding={branding} />
					</Section>
				</Stuck>
			) : null}

			<main data-layout="HostedArticleLayout">
				<article css={[containerStyles, sideBorders]}>
					<div css={mainMediaStyles}>
						<MainMedia
							format={format}
							elements={frontendData.mainMediaElements}
							host={frontendData.config.host}
							pageId={frontendData.pageId}
							webTitle={frontendData.webTitle}
							ajaxUrl={frontendData.config.ajaxUrl}
							abTests={frontendData.config.abTests}
							switches={frontendData.config.switches}
							isAdFreeUser={frontendData.isAdFreeUser}
							isSensitive={frontendData.config.isSensitive}
							editionId={frontendData.editionId}
							hideCaption={true}
							shouldHideAds={true}
							contentType={frontendData.contentType}
						/>
					</div>

					<div css={captionStyles}>
						<Caption
							captionText={mainMediaCaptionText}
							format={format}
							isMainMedia={true}
						/>
					</div>

					<div data-print-layout="hide" css={metaStyles}>
						{renderingTarget === 'Web' && (
							<div css={shareButtonStyles}>
								<Island
									priority="feature"
									defer={{ until: 'visible' }}
								>
									<ShareButton
										pageId={frontendData.pageId}
										webTitle={frontendData.webTitle}
										format={format}
										context="ArticleMeta"
									/>
								</Island>
							</div>
						)}
					</div>

					<div css={headlineStyles}>
						<ArticleHeadline
							format={format}
							headlineString={frontendData.headline}
							tags={frontendData.tags}
							byline={frontendData.byline}
							webPublicationDateDeprecated={
								frontendData.webPublicationDateDeprecated
							}
						/>
					</div>

					<div css={standfirstStyles}>
						<Standfirst
							format={format}
							standfirst={frontendData.standfirst}
						/>
					</div>
					<div css={articleBodyStyles}>
						<ArticleContainer format={format}>
							<ArticleBody
								format={format}
								blocks={blocks}
								editionId={frontendData.editionId}
								host={frontendData.config.host}
								pageId={frontendData.pageId}
								webTitle={frontendData.webTitle}
								ajaxUrl={frontendData.config.ajaxUrl}
								isAdFreeUser={frontendData.isAdFreeUser}
								switches={frontendData.config.switches}
								sectionId={frontendData.config.section}
								shouldHideReaderRevenue={
									frontendData.shouldHideReaderRevenue
								}
								tags={frontendData.tags}
								isPaidContent={
									!!frontendData.config.isPaidContent
								}
								contributionsServiceUrl={
									contributionsServiceUrl
								}
								contentType={frontendData.contentType}
								idUrl={frontendData.config.idUrl ?? ''}
								isSensitive={frontendData.config.isSensitive}
								isDev={!!frontendData.config.isDev}
								keywordIds={frontendData.config.keywordIds}
								abTests={frontendData.config.abTests}
								shouldHideAds={frontendData.shouldHideAds}
								lang={frontendData.lang}
								isRightToLeftLang={
									frontendData.isRightToLeftLang
								}
								accentColor={branding?.hostedCampaignColour}
							/>
							<HostedContentDisclaimer />
						</ArticleContainer>
					</div>

					<div
						css={[
							onwardContentStyles,
							!mainMediaCaptionText &&
								css`
									margin-top: ${space[18]}px;
								`,
						]}
					>
						<HostedContentOnwards
							trails={trails}
							brandName="TrendAI"
							accentColor={branding?.hostedCampaignColour}
						/>
					</div>

					{cta && (
						<div css={ctaStyles}>
							<CallToActionAtom
								linkUrl={cta.url}
								backgroundImage={cta.image}
								text={cta.label}
								buttonText={cta.btnText}
								accentColor={branding?.hostedCampaignColour}
							/>
						</div>
					)}
				</article>
			</main>
		</>
	);
};
