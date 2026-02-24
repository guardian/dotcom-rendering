import { css } from '@emotion/react';
import {
	from,
	palette as sourcePalette,
	space,
	textSans12,
} from '@guardian/source/foundations';
import { ArticleBody } from '../components/ArticleBody';
import { ArticleContainer } from '../components/ArticleContainer';
import { ArticleHeadline } from '../components/ArticleHeadline';
import { CallToActionAtom } from '../components/CallToActionAtom';
import { Caption } from '../components/Caption';
import { HostedContentHeader } from '../components/HostedContentHeader';
import { Island } from '../components/Island';
import { MainMedia } from '../components/MainMedia';
import { Section } from '../components/Section';
import { ShareButton } from '../components/ShareButton.importable';
import { Standfirst } from '../components/Standfirst';
import { grid } from '../grid';
import type { ArticleFormat } from '../lib/articleFormat';
import { getContributionsServiceUrl } from '../lib/contributions';
import { decideMainMediaCaption } from '../lib/decide-caption';
import { decideLanguage, decideLanguageDirection } from '../lib/lang';
import { palette } from '../palette';
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
		${grid.between('left-column-start', 'right-column-end')}
	}
`;

const captionStyles = css`
	${grid.column.centre}
	grid-row: 2;
	justify-self: end;
	${from.desktop} {
		${grid.column.right}
	}
`;

const headlineStyles = css`
	${grid.column.centre}
	${from.desktop} {
		${grid.between(4, 'grid-end')}
	}
`;

const metaStyles = css`
	${grid.column.centre}
	grid-row: 2;
	${from.desktop} {
		grid-row: 1;
	}
	${from.leftCol} {
		${grid.column.left}
		grid-row: 1;
	}
`;

const standfirstStyles = css`
	${grid.column.centre}
	grid-row: 1;
	${from.desktop} {
		${grid.between(4, 'right-column-end')}
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
		${grid.between('left-column-start', 'right-column-end')}
	}
`;

const sideBorders = css`
	${from.desktop} {
		position: relative;
		::before {
			position: absolute;
			top: 0;
			bottom: 0;
			content: '';
			border-left: 1px solid ${palette('--article-border')};
			border-right: 1px solid ${palette('--article-border')};
			left: -${grid.mobileColumnGap};
			right: -${grid.mobileColumnGap};
			${from.mobileLandscape} {
				left: -${grid.columnGap};
				right: -${grid.columnGap};
			}
			${grid.between('centre-column-start', 'right-column-end')}
			${from.leftCol} {
				${grid.between('left-column-start', 'right-column-end')}
			}
		}
	}
`;

export const HostedArticleLayout = (props: WebProps | AppProps) => {
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
						<HostedContentHeader
							branding={branding}
							accentColor={branding.hostedCampaignColour}
						/>
					</Section>
				</Stuck>
			) : null}

			<main
				data-layout="HostedArticleLayout"
				lang={decideLanguage(frontendData.lang)}
				dir={decideLanguageDirection(frontendData.isRightToLeftLang)}
			>
				<article css={[grid.container, sideBorders]}>
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
								/>
							</ArticleContainer>

							<span
								css={css`
									${textSans12}
									color: ${sourcePalette.neutral[46]};
									padding-bottom: ${space[4]}px;
								`}
							>
								{'Placeholder - disclaimer text'}
							</span>
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
