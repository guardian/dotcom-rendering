import { css } from '@emotion/react';
import { breakpoints, from, space, until } from '@guardian/source/foundations';
import type { LayoutType } from '../layouts/lib/articleArrangements';
import {
	ArticleDesign,
	ArticleDisplay,
	type ArticleFormat,
} from '../lib/articleFormat';
import type { EditionId } from '../lib/edition';
import { RenderArticleElement } from '../lib/renderElement';
import type { Switches } from '../types/config';
import type { FEElement } from '../types/content';

const mainMedia = css`
	height: 100%;

	${until.tablet} {
		margin: 0;
		order: 2;
	}

	img {
		flex: 0 0 auto; /* IE */
		width: 100%;
		height: 100%;
	}
`;

const noGutters = css`
	${until.phablet} {
		margin-left: -20px;
		margin-right: -20px;
	}

	${until.mobileLandscape} {
		margin-left: -10px;
		margin-right: -10px;
	}
`;

const padBottom = css`
	padding-bottom: ${space[1]}px;
`;

const immersiveWrapper = css`
	/*
        Immersive main media is wrapped in a flex div with height 100vw and then
        we use this grow here to ensure the content fills the available height
    */
	flex-grow: 1;
	/* Prevent the immersive image 100vh from spilling into main content */
	overflow: hidden;
`;

const chooseWrapper = (format: ArticleFormat) => {
	switch (format.display) {
		case ArticleDisplay.Immersive:
			return immersiveWrapper;
		case ArticleDisplay.Standard: {
			switch (format.design) {
				case ArticleDesign.LiveBlog:
				case ArticleDesign.DeadBlog:
					return '';
				case ArticleDesign.Video:
				case ArticleDesign.Audio:
					return padBottom;
				case ArticleDesign.HostedVideo:
					return css`
						margin: auto;
						max-width: ${breakpoints.desktop}px;
						height: 100%;
					`;
				default:
					return noGutters;
			}
		}
		case ArticleDisplay.Showcase:
			switch (format.design) {
				case ArticleDesign.Picture:
					return '';
				default:
					return noGutters;
			}
		default:
			return noGutters;
	}
};

const weekendReadFrame = css`
	position: relative;
	padding: 10px;
	${from.wide} {
		padding: 15px;
	}
	::before {
		content: '';
		display: block;
		background-image: url('https://interactive.guim.co.uk/atoms/2025/04/2025-weekend-essay-test/assets/v/1791480673/frame.png');
		background-size: contain;
		background-position: center;
		background-repeat: no-repeat;
		position: absolute;
		inset: 0;
		pointer-events: none;
	}
`;

type Props = {
	format: ArticleFormat;
	elements: FEElement[];
	hideCaption?: boolean;
	host?: string;
	pageId: string;
	webTitle: string;
	ajaxUrl: string;
	isAdFreeUser: boolean;
	isSensitive: boolean;
	switches: Switches;
	editionId: EditionId;
	shouldHideAds: boolean;
	contentType?: string;
	contentLayout?: string;
	articleArrangement?: LayoutType;
};

export const MainMedia = ({
	elements,
	format,
	hideCaption,
	host,
	pageId,
	webTitle,
	ajaxUrl,
	isAdFreeUser,
	isSensitive,
	switches,
	editionId,
	shouldHideAds,
	contentType,
	contentLayout,
	articleArrangement,
}: Props) => {
	return (
		<div
			css={[
				mainMedia,
				chooseWrapper(format),
				articleArrangement === 'immersivePortrait' &&
					format.design === ArticleDesign.WeekendEssay &&
					weekendReadFrame,
			]}
		>
			{elements.map((element, index) => (
				<RenderArticleElement
					key={index}
					format={format}
					element={element}
					ajaxUrl={ajaxUrl}
					host={host}
					index={index}
					isMainMedia={true}
					pageId={pageId}
					webTitle={webTitle}
					isAdFreeUser={isAdFreeUser}
					isSensitive={isSensitive}
					switches={switches}
					hideCaption={hideCaption}
					editionId={editionId}
					shouldHideAds={shouldHideAds}
					contentType={contentType}
					contentLayout={contentLayout}
					articleArrangement={articleArrangement}
				/>
			))}
		</div>
	);
};
