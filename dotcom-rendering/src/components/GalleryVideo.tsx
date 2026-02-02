import { css } from '@emotion/react';
import { from, space, until } from '@guardian/source/foundations';
import { grid } from '../grid';
import { type ArticleFormat } from '../lib/articleFormat';
import { palette } from '../palette';
import { type MediaAtomBlockElement } from '../types/content';
import { GalleryCaption } from './GalleryCaption';
import { MaintainAspectRatio } from './MaintainAspectRatio';
import { SelfHostedVideoInArticle } from './SelfHostedVideoInArticle';

type Props = {
	format: ArticleFormat;
	video: MediaAtomBlockElement;
	pageId: string;
	webTitle: string;
};

const styles = css`
	${grid.paddedContainer}
	grid-auto-flow: row dense;
	background-color: ${palette('--article-inner-background')};

	${until.tablet} {
		border-top: 1px solid ${palette('--article-border')};
		padding-top: ${space[1]}px;
	}

	${from.tablet} {
		border-left: 1px solid ${palette('--article-border')};
		border-right: 1px solid ${palette('--article-border')};
	}

	${from.desktop} {
		&:first-of-type {
			padding-top: ${space[3]}px;
		}
	}
`;

const galleryBodyVideoStyles = css`
	display: inline;
	position: relative;
	${grid.column.all}

	${from.tablet} {
		${grid.column.centre}
	}

	${from.desktop} {
		padding-bottom: ${space[10]}px;
	}

	${from.leftCol} {
		${grid.between('centre-column-start', 'right-column-end')}
	}
`;

const DEFAULT_WIDTH = 460;
const DEFAULT_HEIGHT = 259;

const isLoopingVideo = (
	videoPlayerFormat: MediaAtomBlockElement['videoPlayerFormat'],
): videoPlayerFormat is 'Loop' | 'Cinemagraph' =>
	videoPlayerFormat !== undefined &&
	['Loop', 'Cinemagraph'].includes(videoPlayerFormat);

export const GalleryVideo = ({ format, video, pageId, webTitle }: Props) => {
	if (video.assets.length === 0) {
		return null;
	}

	const poster = video.posterImage?.[0]?.url;

	// Use SelfHostedVideoInArticle for looping videos (Loop/Cinemagraph)
	if (isLoopingVideo(video.videoPlayerFormat)) {
		return (
			<figure css={styles}>
				<div css={galleryBodyVideoStyles}>
					<SelfHostedVideoInArticle
						element={video}
						format={format}
						isMainMedia={false}
						videoStyle={video.videoPlayerFormat}
						displayCaption={false}
					/>
				</div>

				<GalleryCaption
					captionHtml={video.title}
					format={format}
					pageId={pageId}
					webTitle={webTitle}
				/>
			</figure>
		);
	}

	// Standard video player for regular videos
	return (
		<figure css={styles}>
			<div css={galleryBodyVideoStyles}>
				<MaintainAspectRatio
					height={DEFAULT_HEIGHT}
					width={DEFAULT_WIDTH}
				>
					{/* eslint-disable-next-line jsx-a11y/media-has-caption -- caption not available */}
					<video
						controls={true}
						preload="metadata"
						width={DEFAULT_WIDTH}
						height={DEFAULT_HEIGHT}
						poster={poster}
						css={css`
							width: 100%;
							height: 100%;
							object-fit: contain;
						`}
					>
						{video.assets.map((asset) => (
							<source
								key={asset.url}
								src={asset.url}
								type={asset.mimeType}
							/>
						))}
						<p>
							{`Your browser doesn't support HTML5 video. Here is a `}
							<a href={video.assets[0]?.url}>link to the video</a>{' '}
							instead.
						</p>
					</video>
				</MaintainAspectRatio>
			</div>

			<GalleryCaption
				captionHtml={video.title}
				format={format}
				pageId={pageId}
				webTitle={webTitle}
			/>
		</figure>
	);
};
