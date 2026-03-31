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

const headerStyles = css`
	${grid.container}
	${grid.column.all}
	grid-row: 1;
`;

const contentStyles = css`
	${grid.container}
	${grid.column.all}
	grid-row: 2;
`;

const mainMediaStyles = css`
	${grid.column.all}
	grid-row: 1;
	overflow: hidden;
	max-height: 400px;

	${from.wide} {
		width: ${breakpoints.wide}px;
		margin: auto;
	}
`;

const captionStyles = css`
	${grid.column.centre}
	grid-row: 2;

	${from.desktop} {
		${grid.span(12, 2)}
	}
	${from.leftCol} {
		${grid.column.right}
	}
`;

const headlineStyles = css`
	margin-top: ${space[4]}px;
	${grid.column.centre}
	${from.desktop} {
		${grid.span(4, 8)}
		grid-row: 2;
	}
	${from.leftCol} {
		${grid.column.centre}
	}
`;
const metaStyles = css`
	margin-top: ${space[4]}px;
	padding: ${space[1]}px;
	${grid.column.centre}
	grid-row: 3;
	${from.desktop} {
		grid-row: 2;
	}
	${from.leftCol} {
		${grid.column.left}
	}
`;

const standfirstStyles = css`
	${grid.column.centre}
	grid-row: 1;
	${from.desktop} {
		${grid.between(4, 'right-column-end')}
	}
	${from.leftCol} {
		${grid.column.centre}
	}
`;

const articleBodyStyles = css`
	${grid.column.centre}
	grid-row:auto;
	${from.desktop} {
		${grid.between(4, 'right-column-end')}
		grid-row: 2;
	}
	${from.leftCol} {
		${grid.column.centre}
		grid-row: 2;
	}
	padding-bottom: 24px;
`;

const onwardContentStyles = css`
	height: 20px;
	background-color: lightgrey;

	${grid.column.centre}
	grid-row:auto;

	${from.desktop} {
		${grid.span(4, 8)}
		grid-row: 3;
	}
	${from.leftCol} {
		${grid.column.right}
		grid-row: 1
	}
	margin-bottom: 24px;
`;

const ctaStyles = css`
	${grid.column.all}
	grid-row:auto;
	overflow: hidden;
	max-height: 400px;
	${from.wide} {
		width: ${breakpoints.wide}px;
		margin: auto;
	}
`;

const sideBorders = css`
	${from.desktop} {
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
				<article css={[grid.paddedContainer, sideBorders]}>
					<header css={headerStyles}>
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

						{props.renderingTarget === 'Web' && (
							<div data-print-layout="hide" css={metaStyles}>
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
					</header>

					<div css={contentStyles}>
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
									blocks={frontendData.blocks}
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
									isSensitive={
										frontendData.config.isSensitive
									}
									isDev={!!frontendData.config.isDev}
									keywordIds={frontendData.config.keywordIds}
									abTests={frontendData.config.abTests}
									shouldHideAds={frontendData.shouldHideAds}
									lang={frontendData.lang}
									isRightToLeftLang={
										frontendData.isRightToLeftLang
									}
								/>
								<HostedContentDisclaimer />
							</ArticleContainer>
						</div>

						<div css={onwardContentStyles}>
							{'Placeholder - onward content'}
						</div>

						<div css={ctaStyles}>
							<CallToActionAtom
								linkUrl="https://safety.epicgames.com/en-US?lang=en-US"
								backgroundImage="https://media.guim.co.uk/7fe58f11470360bc9f1e4b6bbcbf45d7cf06cfcf/0_0_1300_375/1300.jpg"
								text="This is a call to action text"
								buttonText="Learn more"
							/>
						</div>
					</div>
				</article>
			</main>
		</>
	);
};
