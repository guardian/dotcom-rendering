import { css } from '@emotion/react';
import {
	from,
	palette as sourcePalette,
	space,
} from '@guardian/source/foundations';
import { ArticleHeadline } from '../components/ArticleHeadline';
import { ArticleTitle } from '../components/ArticleTitle';
import { GalleryImage } from '../components/GalleryImage';
import { HostedContentHeader } from '../components/HostedContentHeader.island';
import { Island } from '../components/Island';
import { MainMediaGallery } from '../components/MainMediaGallery';
import { OnwardsUpper } from '../components/OnwardsUpper.island';
import { Section } from '../components/Section';
import { ShareButton } from '../components/ShareButton.island';
import { Standfirst } from '../components/Standfirst';
import { grid } from '../grid';
import type { ArticleFormat } from '../lib/articleFormat';
import { palette } from '../palette';
import type { Gallery } from '../types/article';
import type { RenderingTarget } from '../types/renderingTarget';
import { Stuck } from './lib/stickiness';

interface Props {
	gallery: Gallery;
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

const shareButtonStyles = css`
	margin-top: ${space[4]}px;
	padding: ${space[1]}px;
`;

export const HostedGalleryLayout = (props: WebProps | AppProps) => {
	const { gallery, renderingTarget, format, serverTime } = props;
	const { frontendData } = gallery;
	const { commercialProperties, editionId } = frontendData;

	const { branding } = commercialProperties[editionId];

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
						mainMedia={gallery.mainMedia}
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

					{renderingTarget === 'Web' && (
						<div
							data-print-layout="hide"
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
										backgroundColor:
											palette('--article-border'),
									},
								},
							}}
						>
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
						</div>
					)}
				</header>
				<GalleryBody
					renderingTarget={renderingTarget}
					format={format}
					bodyElements={gallery.bodyElements}
					pageId={frontendData.pageId}
					webTitle={frontendData.webTitle}
				/>
			</main>
			<Island priority="feature" defer={{ until: 'visible' }}>
				<OnwardsUpper
					ajaxUrl={frontendData.config.ajaxUrl}
					hasRelated={frontendData.hasRelated}
					hasStoryPackage={frontendData.hasStoryPackage}
					isAdFreeUser={frontendData.isAdFreeUser}
					pageId={frontendData.pageId}
					isPaidContent={!!frontendData.config.isPaidContent}
					showRelatedContent={frontendData.config.showRelatedContent}
					keywordIds={frontendData.config.keywordIds}
					contentType={frontendData.contentType}
					tags={frontendData.tags}
					format={format}
					pillar={format.theme}
					editionId={frontendData.editionId}
					shortUrlId={frontendData.config.shortUrlId}
					discussionApiUrl={frontendData.config.discussionApiUrl}
					serverTime={serverTime}
					renderingTarget={renderingTarget}
					webURL={frontendData.webURL}
				/>
			</Island>
		</>
	);
};

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
