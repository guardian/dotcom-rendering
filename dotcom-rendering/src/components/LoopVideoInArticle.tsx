import { css } from '@emotion/react';
import type { FEAspectRatio } from '../frontend/feFront';
import type { ArticleFormat } from '../lib/articleFormat';
import {
	convertAssetsToVideoSources,
	getFirstVideoAsset,
	getSubtitleAsset,
} from '../lib/video';
import type { MediaAtomBlockElement } from '../types/content';
import { Caption } from './Caption';
import { Hide } from './Hide';
import { Island } from './Island';
import { SelfHostedVideo } from './SelfHostedVideo.importable';

const Row = ({ children }: { children: React.ReactNode }) => (
	<div
		css={css`
			display: flex;
			flex-direction: row;
		`}
	>
		{children}
	</div>
);

const CaptionToggle = () => (
	<>
		<label
			htmlFor="the-checkbox"
			css={css`
				position: absolute;
				right: 5px;
				width: 32px;
				height: 32px;
				z-index: 1;
				/* We're using rgba here for the opacity */
				background-color: rgba(18, 18, 18, 0.6);
				border-radius: 50%;
				bottom: 6px;
				border: none;
				cursor: pointer;

				svg {
					top: 0;
					bottom: 0;
					right: 0;
					left: 0;
					margin: auto;
					position: absolute;
					fill: white;
				}
			`}
		>
			<svg width="6" height="14" fill="white" viewBox="0 0 6 14">
				<path d="M4.6 12l-.4 1.4c-.7.2-1.9.6-3 .6-.7 0-1.2-.2-1.2-.9 0-.2 0-.3.1-.5l2-6.7H.7l.4-1.5 4.2-.6h.2L3 12h1.6zm-.3-9.2c-.9 0-1.4-.5-1.4-1.3C2.9.5 3.7 0 4.6 0 5.4 0 6 .5 6 1.3c0 1-.8 1.5-1.7 1.5z" />
			</svg>
		</label>
		{/* Hidden input used to toggle the caption using css */}
		<input type="checkbox" id="the-checkbox" />
	</>
);

type LoopVideoInArticleProps = {
	element: MediaAtomBlockElement;
	format: ArticleFormat;
	isMainMedia: boolean;
};

export const LoopVideoInArticle = ({
	element,
	format,
	isMainMedia,
}: LoopVideoInArticleProps) => {
	const posterImageUrl = element.posterImage?.[0]?.url;
	const caption = element.title;
	const firstVideoAsset = getFirstVideoAsset(element.assets);

	if (!posterImageUrl) {
		return null;
	}

	return (
		<>
			<div
				css={css`
					position: relative;
				`}
			>
				<Island priority="critical" defer={{ until: 'visible' }}>
					<SelfHostedVideo
						atomId={element.id}
						fallbackImage={posterImageUrl}
						fallbackImageAlt={caption}
						fallbackImageAspectRatio={
							(firstVideoAsset?.aspectRatio ??
								'5:4') as FEAspectRatio
						}
						fallbackImageLoading="lazy"
						fallbackImageSize="small"
						height={firstVideoAsset?.dimensions?.height ?? 400}
						linkTo="Article-embed-MediaAtomBlockElement"
						posterImage={posterImageUrl}
						sources={convertAssetsToVideoSources(element.assets)}
						subtitleSize="medium"
						subtitleSource={getSubtitleAsset(element.assets)}
						videoStyle="Loop"
						uniqueId={element.id}
						width={firstVideoAsset?.dimensions?.width ?? 500}
						enableHls={false}
					/>
				</Island>

				{isMainMedia && !!caption && (
					// Below tablet, main media videos show an info toggle at the bottom right of
					// the video which, when clicked, toggles the caption as an overlay
					<Hide when="above" breakpoint="tablet">
						<Row>
							<div
								css={css`
									#the-checkbox {
										/* Never show the input */
										display: none;
									}
									#the-caption {
										/* Hide caption by default */
										display: none;
									}
									#the-checkbox:checked + #the-caption {
										/* Show the caption if the input is checked */
										display: block;
									}
								`}
							>
								{/* CaptionToggle contains the input with id #the-checkbox */}
								<CaptionToggle />{' '}
								<div id="the-caption">
									<Caption
										captionText={caption}
										format={format}
										isOverlaid={true}
										isMainMedia={isMainMedia}
										mediaType="SelfHostedVideo"
									/>
								</div>
							</div>
						</Row>
					</Hide>
				)}
			</div>
			{isMainMedia && !!caption ? (
				<Hide when="below" breakpoint="tablet">
					<Caption
						captionText={caption}
						format={format}
						isMainMedia={isMainMedia}
						mediaType="SelfHostedVideo"
					/>
				</Hide>
			) : (
				!!caption && (
					<Caption
						captionText={caption}
						format={format}
						isMainMedia={isMainMedia}
						mediaType="SelfHostedVideo"
					/>
				)
			)}
		</>
	);
};
