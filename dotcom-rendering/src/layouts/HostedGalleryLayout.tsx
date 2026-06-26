import { css } from '@emotion/react';
import {
	from,
	palette as sourcePalette,
	space,
} from '@guardian/source/foundations';
import { ArticleHeadline } from '../components/ArticleHeadline';
import { BackToTop } from '../components/BackToTop';
import { CallToActionButton } from '../components/CallToActionAtom';
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

	/** Additional padding needed due to no main media pushing the content down */
	padding-top: ${space[24]}px;

	${from.tablet} {
		border-bottom: 1px solid ${palette('--article-border')};
	}

	${from.leftCol} {
		padding-top: ${space[4]}px;
	}
`;

const metaStyles = css`
	${grid.column.centre}
	padding: ${space[1]}px;
	padding-bottom: ${space[6]}px;
	display: flex;
	flex-wrap: wrap;

	${from.tablet} {
		position: relative;
		&::before {
			content: '';
			position: absolute;
			left: -10px;
			top: 0;
			bottom: 0;
			width: 1px;
			background-color: ${palette('--article-border')};
		}
	}

	& > * {
		margin-top: ${space[4]}px;
	}
`;

const bttStyles = css`
	${grid.paddedContainer}
	${grid.outerRules()}
	background-color: ${palette('--article-inner-background')};
`;

const bttPosition = css`
	${grid.column.all}
	display: flex;
	justify-content: flex-end;
	position: relative;
	padding: 0 ${space[3]}px ${space[4]}px;

	${from.tablet} {
		${grid.column.centre}
		padding: 0 0 ${space[4]}px;
	}

	${from.desktop} {
		${grid.between('centre-column-start', 'right-column-end')}
	}
`;

const ctaButtonStyles = css`
	margin-right: ${space[3]}px;
`;

export const HostedGalleryLayout = (props: WebProps | AppProps) => {
	const { gallery, renderingTarget, format, serverTime } = props;
	const { frontendData } = gallery;
	const { commercialProperties, editionId } = frontendData;

	const { branding } = commercialProperties[editionId];

	// The CTA block element is rendered separately as a button
	const cta = frontendData.blocks[0]?.elements.find(
		(element) =>
			element._type ===
			'model.dotcomrendering.pageElements.CallToActionAtomBlockElement',
	);

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
						<div data-print-layout="hide" css={metaStyles}>
							{cta?.url && (
								<div css={ctaButtonStyles}>
									<CallToActionButton
										linkUrl={cta.url}
										accentColor={
											branding?.hostedCampaignColour
										}
										buttonText={cta.btnText}
									/>
								</div>
							)}
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
				</header>
				<GalleryBody
					renderingTarget={renderingTarget}
					format={format}
					bodyElements={gallery.bodyElements}
					pageId={frontendData.pageId}
					webTitle={frontendData.webTitle}
				/>
				<div css={bttStyles}>
					<div css={bttPosition}>
						<BackToTop format={format} />
					</div>
				</div>
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
			if (
				element._type ===
				'model.dotcomrendering.pageElements.ImageBlockElement'
			) {
				return (
					<GalleryImage
						image={element}
						format={props.format}
						pageId={props.pageId}
						webTitle={props.webTitle}
						renderingTarget={props.renderingTarget}
						key={element.elementId}
						// Pass the total number of images to include in the image caption (e.g. 1/5, 2/5, etc.)
						imagesLength={props.bodyElements.length}
					/>
				);
			} else {
				return null;
			}
		})}
	</>
);
