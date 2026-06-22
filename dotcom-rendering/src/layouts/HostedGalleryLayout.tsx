import { css } from '@emotion/react';
import {
	from,
	palette as sourcePalette,
	space,
	textSansBold15,
} from '@guardian/source/foundations';
import { ArticleHeadline } from '../components/ArticleHeadline';
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

const bttPosition = css`
	background-color: ${palette('--article-inner-background')};
	padding: ${space[5]}px ${space[3]}px ${space[4]}px;
	position: absolute;
	bottom: -21px;
	right: 0;
	display: flex;
	justify-content: flex-end;
	width: 100%;

	${from.tablet} {
		padding: ${space[5]}px ${space[8]}px ${space[4]}px;
	}

	${from.desktop} {
		padding: ${space[5]}px ${space[5]}px ${space[4]}px;
	}
`;

const iconHeight = '42px';

const iconContainer = css`
	position: relative;
	float: right;
	border-radius: 100%;
	background-color: ${sourcePalette.neutral[100]};
	cursor: pointer;
	height: ${iconHeight};
	min-width: ${iconHeight};
`;

const link = css`
	text-decoration: none;
	color: ${sourcePalette.neutral[100]};
	font-weight: bold;
	line-height: ${iconHeight};

	:hover {
		color: ${sourcePalette.neutral[86]};

		.icon-container {
			background-color: ${sourcePalette.neutral[86]};
		}
	}
`;

const icon = css`
	::before {
		position: absolute;
		top: 6px;
		bottom: 0;
		left: 0;
		right: 0;
		margin: auto;
		border: 2px solid ${sourcePalette.neutral[7]};
		border-bottom: 0;
		border-right: 0;
		content: '';
		height: 12px;
		width: 12px;
		transform: rotate(45deg);
	}
`;

const textStyles = css`
	${textSansBold15};
	padding-right: 5px;
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
					position: 'relative',
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
				<div css={bttPosition}>
					<BackToTop />
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
	<div
		css={css`
			position: relative;
		`}
	>
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
	</div>
);

const BackToTop = () => (
	<a css={link} href="#top" data-link-name="back to top">
		<span css={textStyles}>Back to top</span>
		<span css={iconContainer} className="icon-container">
			<i css={icon} />
		</span>
	</a>
);
