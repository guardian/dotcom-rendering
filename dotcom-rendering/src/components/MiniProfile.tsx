import { css } from '@emotion/react';
import { type ArticleFormat } from '@guardian/libs';
import type { EditionId } from '../lib/edition';
import type { ArticleElementRenderer } from '../lib/renderElement';
import { slugify } from '../model/enhance-H2s';
import { palette } from '../palette';
import type { ServerSideTests, Switches } from '../types/config';
import type {
	MiniProfile as MiniProfileModel,
	StarRating,
} from '../types/content';
import { Subheading } from './Subheading';

const miniProfileStyles = css`
	padding-top: 8px;
`;

const headingIndexStyles = css`
	font-weight: bold;
`;

const headingLineStyles = css`
	width: 140px;
	margin: 0 0 2px 0;
	border: none;
	border-top: 4px solid ${palette('--heading-line')};
`;

interface MiniProfileProps {
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
	miniProfile: MiniProfileModel;
	titleIndex: number;
	RenderArticleElement: ArticleElementRenderer;
}

export const MiniProfile = ({
	miniProfile,
	format,
	ajaxUrl,
	host,
	pageId,
	isAdFreeUser,
	isSensitive,
	switches,
	abTests,
	editionId,
	titleIndex,
	hideCaption,
	starRating,
	RenderArticleElement,
}: MiniProfileProps) => {
	return (
		<>
			<li css={miniProfileStyles} data-spacefinder-role="nested">
				<hr css={headingLineStyles} />
				<Subheading
					id={slugify(miniProfile.title)}
					format={format}
					topPadding={false}
				>
					<span css={headingIndexStyles}>{`${titleIndex}. `}</span>
					{miniProfile.title}
				</Subheading>
				{miniProfile.body.map((element, index) => (
					<RenderArticleElement
						// eslint-disable-next-line react/no-array-index-key -- This is only rendered once so we can safely use index to suppress the warning
						key={index}
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
			</li>
		</>
	);
};
