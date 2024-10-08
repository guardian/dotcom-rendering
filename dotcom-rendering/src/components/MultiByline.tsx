import { css } from '@emotion/react';
import type { ArticleFormat } from '@guardian/libs';
import { palette } from '@guardian/source/foundations';
import type { EditionId } from '../lib/edition';
import type { ArticleElementRenderer } from '../lib/renderElement';
import type { ServerSideTests, Switches } from '../types/config';
import type { MultiBylineItem, StarRating } from '../types/content';
import { MultiBylineItem as MultiBylineItemComponent } from './MultiBylineItem';

interface MiniProfilesProps {
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
	multiBylineItems: MultiBylineItem[];
	RenderArticleElement: ArticleElementRenderer;
	/**
	 * Whether this is the last element in the article. If true, no separator will be rendered.
	 */
	isLastElement: boolean;
}

const separatorStyles = css`
	width: 140px;
	margin: 8px 0 2px 0;
	border-top: 1px solid ${palette.neutral[86]};
`;

export const MultiByline = ({
	multiBylineItems,
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
}: MiniProfilesProps) => {
	return (
		<ol data-ignore="global-ol-styling">
			{multiBylineItems.map((multiBylineItem, index) => (
				<MultiBylineItemComponent
					multiBylineItem={multiBylineItem}
					format={format}
					key={`${multiBylineItem.title}-${index}`}
				>
					{multiBylineItem.body.map((element) => (
						// eslint-disable-next-line react/jsx-key -- The element array should remain consistent as it's derived from the order of elements in CAPI
						<RenderArticleElement
							format={format}
							element={element}
							ajaxUrl={ajaxUrl}
							host={host}
							index={index}
							isMainMedia={false}
							pageId={pageId}
							webTitle={multiBylineItem.title}
							isAdFreeUser={isAdFreeUser}
							isSensitive={isSensitive}
							switches={switches}
							abTests={abTests}
							editionId={editionId}
							hideCaption={hideCaption}
							starRating={starRating}
							forceDropCap="off"
							isListElement={true}
						/>
					))}
				</MultiBylineItemComponent>
			))}
			{!isLastElement && <hr css={separatorStyles} />}
		</ol>
	);
};
