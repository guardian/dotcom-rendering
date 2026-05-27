import { css } from '@emotion/react';
import {
	from,
	palette as sourcePalette,
	space,
} from '@guardian/source/foundations';
import { ArticleHeadline } from '../components/ArticleHeadline';
import { ArticleMetaApps } from '../components/ArticleMeta.apps';
import { ArticleMeta } from '../components/ArticleMeta.web';
import { ArticleTitle } from '../components/ArticleTitle';
import { Caption } from '../components/Caption';
import { GalleryImage } from '../components/GalleryImage';
import { HostedContentHeader } from '../components/HostedContentHeader.island';
import { Island } from '../components/Island';
import { MainMediaGallery } from '../components/MainMediaGallery';
import { Section } from '../components/Section';
import { Standfirst } from '../components/Standfirst';
import { grid } from '../grid';
import type { ArticleFormat } from '../lib/articleFormat';
import { decideMainMediaCaption } from '../lib/decide-caption';
import { palette } from '../palette';
import type { ArticleDeprecated, Gallery } from '../types/article';
import type { RenderingTarget } from '../types/renderingTarget';
import { Stuck } from './lib/stickiness';

interface Props {
	content: Gallery;
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

const headerStyles = css`
	${grid.container}
	background-color: ${palette('--article-inner-background')};

	${from.tablet} {
		border-bottom: 1px solid ${palette('--article-border')};
	}
`;

export const HostedGalleryLayout = (props: WebProps | AppProps) => {
	const { content, renderingTarget, format } = props;
	const { frontendData } = content;
	const { commercialProperties, editionId } = frontendData;

	const { branding } = commercialProperties[editionId];

	const isWeb = renderingTarget === 'Web';

	const captionText = decideMainMediaCaption(content.mainMedia);

	return (
		<>
			{isWeb && branding ? (
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
						<Island priority="feature" defer={{ until: 'visible' }}>
							<HostedContentHeader branding={branding} />
						</Island>
					</Section>
				</Stuck>
			) : null}

			<main
				css={{
					backgroundColor: palette('--article-background'),
				}}
			>
				<header css={headerStyles}>
					<MainMediaGallery
						mainMedia={content.mainMedia}
						format={format}
						renderingTarget={props.renderingTarget}
					/>
					<ArticleTitle
						format={format}
						tags={frontendData.tags}
						sectionLabel={frontendData.sectionLabel}
						sectionUrl={frontendData.sectionUrl}
						guardianBaseURL={frontendData.guardianBaseURL}
					/>
					<ArticleHeadline
						format={format}
						headlineString={frontendData.headline}
						tags={frontendData.tags}
						byline={frontendData.byline}
						webPublicationDateDeprecated={
							frontendData.webPublicationDateDeprecated
						}
					/>
					<Standfirst
						format={format}
						standfirst={frontendData.standfirst}
					/>
					<Caption
						captionText={captionText}
						format={format}
						isMainMedia={true}
					/>
					<Meta
						renderingTarget={renderingTarget}
						format={format}
						frontendData={frontendData}
					/>
				</header>
				<GalleryBody
					renderingTarget={renderingTarget}
					format={format}
					bodyElements={content.bodyElements}
					pageId={frontendData.pageId}
					webTitle={frontendData.webTitle}
				/>
			</main>
		</>
	);
};

const Meta = ({
	renderingTarget,
	format,
	frontendData,
}: {
	renderingTarget: RenderingTarget;
	format: ArticleFormat;
	frontendData: ArticleDeprecated;
}) => (
	<div
		css={{
			'&': css(grid.column.centre),
			paddingBottom: space[6],
			[from.tablet]: {
				position: 'relative',
				'&::before': {
					content: '""',
					position: 'absolute',
					left: -10,
					top: 0,
					bottom: 0,
					width: 1,
					backgroundColor: palette('--article-border'),
				},
			},
		}}
	>
		{renderingTarget === 'Web' ? (
			<ArticleMeta
				branding={
					frontendData.commercialProperties[frontendData.editionId]
						.branding
				}
				format={format}
				pageId={frontendData.pageId}
				webTitle={frontendData.webTitle}
				byline={frontendData.byline}
				tags={frontendData.tags}
				primaryDateline={frontendData.webPublicationDateDisplay}
				secondaryDateline={
					frontendData.webPublicationSecondaryDateDisplay
				}
				isCommentable={frontendData.isCommentable}
				discussionApiUrl={frontendData.config.discussionApiUrl}
				shortUrlId={frontendData.config.shortUrlId}
			/>
		) : null}
		{renderingTarget === 'Apps' ? (
			<ArticleMetaApps
				branding={
					frontendData.commercialProperties[frontendData.editionId]
						.branding
				}
				format={format}
				pageId={frontendData.pageId}
				byline={frontendData.byline}
				tags={frontendData.tags}
				primaryDateline={frontendData.webPublicationDateDisplay}
				secondaryDateline={
					frontendData.webPublicationSecondaryDateDisplay
				}
				isCommentable={frontendData.isCommentable}
				discussionApiUrl={frontendData.config.discussionApiUrl}
				shortUrlId={frontendData.config.shortUrlId}
			/>
		) : null}
	</div>
);

const GalleryBody = (props: {
	renderingTarget: RenderingTarget;
	format: ArticleFormat;
	bodyElements: Gallery['bodyElements'];
	pageId: string;
	webTitle: string;
}) => (
	<>
		{props.bodyElements.map((element) => {
			switch (element._type) {
				case 'model.dotcomrendering.pageElements.ImageBlockElement':
					return (
						<GalleryImage
							image={element}
							format={props.format}
							pageId={props.pageId}
							webTitle={props.webTitle}
							renderingTarget={props.renderingTarget}
							key={element.elementId}
						/>
					);
				default:
					return null;
			}
		})}
	</>
);
