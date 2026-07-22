import { css } from '@emotion/react';
import type { ArticleFormat } from '../lib/articleFormat';
import type { EditionId } from '../lib/edition';
import type { ArticleElementRenderer } from '../lib/renderElement';
import { palette } from '../palette';
import type { Switches } from '../types/config';
import type { MiniProfile, StarRating } from '../types/content';
import { MiniProfile as MiniProfileComponent } from './MiniProfile';

interface MiniProfilesProps {
	format: ArticleFormat;
	ajaxUrl: string;
	host?: string;
	pageId: string;
	isAdFreeUser: boolean;
	isSensitive: boolean;
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
	sectioned: boolean;
	shouldHideAds: boolean;
}

const separatorStyles = css`
	border: none;
	width: 140px;
	margin: 8px 0 2px 0;
	border-top: 1px solid ${palette('--article-border')};
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
	editionId,
	hideCaption,
	starRating,
	RenderArticleElement,
	isLastElement,
	sectioned,
	shouldHideAds,
}: MiniProfilesProps) => {
	const displaySeparator = !isLastElement && !sectioned;

	return (
		<ol data-ignore="global-ol-styling">
			{miniProfiles.map((miniProfile, index) => (
				<MiniProfileComponent
					miniProfile={miniProfile}
					format={format}
					key={`${miniProfile.title}-${index}`}
					sectioned={sectioned}
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
							editionId={editionId}
							hideCaption={hideCaption}
							starRating={starRating}
							forceDropCap="off"
							isListElement={true}
							shouldHideAds={shouldHideAds}
						/>
					))}
				</MiniProfileComponent>
			))}
			{displaySeparator && <hr css={separatorStyles} />}
		</ol>
	);
};
