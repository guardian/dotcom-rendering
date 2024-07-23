import { css } from '@emotion/react';
import type { ArticleFormat } from '@guardian/libs';
import { palette } from '@guardian/source/foundations';
import type { EditionId } from '../lib/edition';
import type { ArticleElementRenderer } from '../lib/renderElement';
import type { ServerSideTests, Switches } from '../types/config';
import type { MiniProfile, StarRating } from '../types/content';
import { MiniProfile as MiniProfileComponent } from './MiniProfile';

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
	miniProfiles: MiniProfile[];
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

export const MiniProfiles = ({
	miniProfiles,
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
			{miniProfiles.map((miniProfile, index) => (
				// eslint-disable-next-line react/no-array-index-key -- Title should usually be identical, but in case it isn't, also use array index
				<MiniProfileComponent
					miniProfile={miniProfile}
					format={format}
					key={`${miniProfile.title}-${index}`}
				>
					{miniProfile.body.map((element) => (
						// eslint-disable-next-line react/jsx-key -- The element array should remain consistent as it's derived from the order of elements in CAPI
						<RenderArticleElement
							format={format}
							element={element}
							ajaxUrl={ajaxUrl}
							host={host}
							index={index}
							isMainMedia={false}
							pageId={pageId}
							webTitle={miniProfile.title}
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
				</MiniProfileComponent>
			))}
			{!isLastElement && <hr css={separatorStyles} />}
		</ol>
	);
};
