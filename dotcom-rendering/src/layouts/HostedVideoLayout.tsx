import { css } from '@emotion/react';
import {
	breakpoints,
	from,
	palette,
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
import type { FEElement } from '../types/content';
import type { RenderingTarget } from '../types/renderingTarget';
import { Stuck } from './lib/stickiness';

interface Props {
	content: Article;
	format: ArticleFormat;
	renderingTarget: RenderingTarget;
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
	background-color: ${palette.neutral[10]};

	z-index: 1;
	overflow: hidden;
	max-height: 600px;
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

	padding-bottom: ${space[6]}px;

	${from.desktop} {
		${grid.between(4, 'right-column-end')}
	}

	${from.leftCol} {
		${grid.column.centre}
	}
`;

const onwardContentStyles = css`
	${grid.column.centre}

	height: 20px;
	background-color: lightgrey;
	margin-bottom: ${space[6]}px;

	${from.desktop} {
		${grid.span(4, 8)}
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

export const HostedVideoLayout = (props: WebProps | AppProps) => {
	const {
		content: { frontendData },
		format,
	} = props;

	const contributionsServiceUrl = getContributionsServiceUrl(frontendData);

	const mainMedia = frontendData.mainMediaElements[0];
	const mainMediaCaptionText = decideMainMediaCaption(mainMedia);

	const { branding } =
		frontendData.commercialProperties[frontendData.editionId];

	const isCtaElement = (element: FEElement) =>
		element._type ===
		'model.dotcomrendering.pageElements.CallToActionAtomBlockElement';

	// The CTA atom is extracted and rendered separately at the end of the article body
	const cta = frontendData.blocks[0]?.elements.find(isCtaElement);

	// Block elements without CTA atoms
	const blocks: Block[] = frontendData.blocks.map((block) => ({
		...block,
		elements: block.elements.filter((element) => !isCtaElement(element)),
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
						padSides={true}
						element="header"
					>
						<HostedContentHeader branding={branding} />
					</Section>
				</Stuck>
			) : null}

			<main data-layout="HostedVideoLayout">
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
						{props.renderingTarget === 'Web' && (
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

					<div css={onwardContentStyles}>
						{'Placeholder - onward content'}
					</div>

					{cta && (
						<div css={ctaStyles}>
							<CallToActionAtom
								linkUrl={cta.url}
								backgroundImage={cta.image}
								text={cta.label}
								buttonText={cta.btnText}
							/>
						</div>
					)}
				</article>
			</main>
		</>
	);
};
