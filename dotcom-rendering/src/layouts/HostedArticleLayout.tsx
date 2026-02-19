import { css } from '@emotion/react';
import {
	from,
	palette as sourcePalette,
	space,
} from '@guardian/source/foundations';
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
import { decideMainMediaCaption } from '../lib/decide-caption';
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

const border = css`
	border: 1px solid black;
`;

const metaFlex = css`
	margin-bottom: ${space[3]}px;
	display: flex;
	justify-content: space-between;
	flex-wrap: wrap;
`;

const shareButtonWrapper = css`
	${grid.column.centre}

	${from.leftCol} {
		${grid.column.left}
	}
`;

export const HostedArticleLayout = (props: WebProps | AppProps) => {
	const {
		content: { frontendData },
		format,
	} = props;

	const mainMedia = frontendData.mainMediaElements[0];
	const mainMediaCaptionText = decideMainMediaCaption(mainMedia);

	const { branding } =
		frontendData.commercialProperties[frontendData.editionId];

	return (
		<>
			{props.renderingTarget === 'Web' && branding ? (
				<Stuck>
					<Section
						fullWidth={true}
						showSideBorders={false}
						showTopBorder={false}
						shouldCenter={false}
						backgroundColour={sourcePalette.neutral[7]}
						padSides={false}
						element="aside"
					>
						<HostedContentHeader
							branding={branding}
							accentColor={branding.hostedCampaignColour}
						/>
					</Section>
				</Stuck>
			) : null}
			<main>
				<article>
					<header css={[grid.container]}>
						<div
							css={[
								grid.column.all,
								css`
									overflow: hidden;
									max-height: 400px;
									${from.leftCol} {
										${grid.between(
											'left-column-start',
											'right-column-end',
										)}
									}
								`,
							]}
						>
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
						<div
							css={[
								grid.between('centre-column-start', 'grid-end'),
							]}
						>
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
					<div
						css={[
							grid.container,
							css`
								padding-top: ${space[12]}px;

								${from.leftCol} {
									padding-top: ${space[5]}px;
								}
							`,
						]}
					>
						<div
							data-print-layout="hide"
							css={[
								shareButtonWrapper,
								metaFlex,
								css`
									grid-row: 1;
								`,
							]}
						>
							{props.renderingTarget === 'Web' && (
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
							)}
						</div>
						<div
							css={[
								grid.column.right,
								css`
									grid-row: 1;
								`,
							]}
						>
							<Caption
								captionText={mainMediaCaptionText}
								format={format}
								isMainMedia={true}
							/>

							{'Onward content'}
						</div>
						<div
							css={[
								grid.column.centre,
								css`
									grid-row: 1;
								`,
							]}
						>
							<Standfirst
								format={format}
								standfirst={frontendData.standfirst}
							/>
						</div>
						<div id="maincontent" css={[grid.column.centre]}>
							{'body'}
						</div>
					</div>

					<div css={[grid.container, border]}>
						<div css={[grid.column.all]}>Footer</div>
					</div>
				</article>
				<div css={[grid.container]}>
					<div
						css={[
							grid.column.all,
							css`
								overflow: hidden;
								max-height: 400px;
								${from.leftCol} {
									${grid.between(
										'left-column-start',
										'right-column-end',
									)}
								}
							`,
						]}
					>
						<CallToActionAtom
							linkUrl="https://safety.epicgames.com/en-US?lang=en-US"
							backgroundImage="https://media.guim.co.uk/7fe58f11470360bc9f1e4b6bbcbf45d7cf06cfcf/0_0_1300_375/1300.jpg"
							text="This is a call to action text"
							buttonText="Learn more"
						/>
					</div>
				</div>
			</main>
		</>
	);
};
