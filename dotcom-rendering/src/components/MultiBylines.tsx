import { css } from '@emotion/react';
import type { ArticleFormat } from '../lib/articleFormat';
import type { EditionId } from '../lib/edition';
import type { ArticleElementRenderer } from '../lib/renderElement';
import { palette } from '../palette';
import type { ServerSideTests, Switches } from '../types/config';
import type {
	MultiByline as MultiBylineModel,
	StarRating,
} from '../types/content';
import { MultiByline } from './MultiByline';

interface MultiBylineProps {
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
	multiBylines: MultiBylineModel[];
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

export const MultiBylines = ({
	multiBylines,
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
}: MultiBylineProps) => {
	return (
		<>
			{multiBylines.map((multiByline, index) => (
				<MultiByline
					multiByline={multiByline}
					format={format}
					key={multiByline.title}
				>
					{multiByline.body.map((element) => (
						// eslint-disable-next-line react/jsx-key -- The element array should remain consistent as it's derived from the order of elements in CAPI
						<RenderArticleElement
							format={format}
							element={element}
							ajaxUrl={ajaxUrl}
							host={host}
							index={index}
							isMainMedia={false}
							pageId={pageId}
							webTitle={multiByline.title}
							isAdFreeUser={isAdFreeUser}
							isSensitive={isSensitive}
							switches={switches}
							abTests={abTests}
							editionId={editionId}
							hideCaption={hideCaption}
							starRating={starRating}
							forceDropCap="off"
							isListElement={true}
							shouldHideAds={shouldHideAds}
						/>
					))}
				</MultiByline>
			))}
			{!isLastElement && <hr css={separatorStyles} />}
		</>
	);
};
