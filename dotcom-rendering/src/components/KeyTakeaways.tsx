import { css } from '@emotion/react';
import type { ArticleFormat } from '../lib/articleFormat';
import type { EditionId } from '../lib/edition';
import type { ArticleElementRenderer } from '../lib/renderElement';
import { palette } from '../palette';
import type { ServerSideTests, Switches } from '../types/config';
import type { KeyTakeaway, StarRating } from '../types/content';
import { KeyTakeaway as KeyTakeawayComponent } from './KeyTakeaway';

interface KeyTakeawaysProps {
	format: ArticleFormat;
	ajaxUrl: string;
	host?: string;
	pageId: string;
	isAdFreeUser: boolean;
	isSensitive: boolean;
	abTests: ServerSideTests;
	switches: Switches;
	editionId: EditionId;
	hideCaption?: boolean;
	starRating?: StarRating;
	keyTakeaways: KeyTakeaway[];
	RenderArticleElement: ArticleElementRenderer;
	/**
	 * Whether this is the last element in the article. If true, no separator will be rendered.
	 */
	isLastElement: boolean;
	shouldHideAds: boolean;
}

const separatorStyles = css`
	border: none;
	width: 140px;
	margin: 8px 0 2px 0;
	border-top: 1px solid ${palette('--article-border')};
`;

export const KeyTakeaways = ({
	keyTakeaways,
	format,
	ajaxUrl,
	host,
	pageId,
	isAdFreeUser,
	isSensitive,
	switches,
	abTests,
	editionId,
	hideCaption,
	starRating,
	RenderArticleElement,
	isLastElement,
	shouldHideAds,
}: KeyTakeawaysProps) => {
	return (
		<ol data-ignore="global-ol-styling">
			{keyTakeaways.map((keyTakeaway, index) => (
				<KeyTakeawayComponent
					keyTakeaway={keyTakeaway}
					format={format}
					ajaxUrl={ajaxUrl}
					host={host}
					pageId={pageId}
					isAdFreeUser={isAdFreeUser}
					isSensitive={isSensitive}
					switches={switches}
					abTests={abTests}
					editionId={editionId}
					titleIndex={index + 1}
					hideCaption={hideCaption}
					starRating={starRating}
					key={index}
					RenderArticleElement={RenderArticleElement}
					shouldHideAds={shouldHideAds}
				/>
			))}
			{!isLastElement && <hr css={separatorStyles} />}
		</ol>
	);
};
