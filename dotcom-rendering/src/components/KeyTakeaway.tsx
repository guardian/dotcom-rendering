import { css } from '@emotion/react';
import type { EditionId } from '../lib/edition';
import { type ArticleFormat } from '../lib/format';
import type { ArticleElementRenderer } from '../lib/renderElement';
import { slugify } from '../model/enhance-H2s';
import { palette } from '../palette';
import type { ServerSideTests, Switches } from '../types/config';
import type {
	KeyTakeaway as KeyTakeawayModel,
	StarRating,
} from '../types/content';
import { Subheading } from './Subheading';

const keyTakeawayStyles = css`
	padding-top: 8px;
`;

const headingIndexStyles = css`
	font-weight: bold;
`;

export const headingLineStyles = css`
	width: 140px;
	margin: 0 0 2px 0;
	border: none;
	border-top: 4px solid ${palette('--heading-line')};
`;

interface KeyTakeawayProps {
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
	keyTakeaway: KeyTakeawayModel;
	titleIndex: number;
	RenderArticleElement: ArticleElementRenderer;
}

export const KeyTakeaway = ({
	keyTakeaway,
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
}: KeyTakeawayProps) => {
	return (
		<>
			<li css={keyTakeawayStyles} data-spacefinder-role="nested">
				<hr css={headingLineStyles} />
				<Subheading
					id={slugify(keyTakeaway.title)}
					format={format}
					topPadding={false}
				>
					<span css={headingIndexStyles}>{`${titleIndex}. `}</span>
					{keyTakeaway.title}
				</Subheading>
				{keyTakeaway.body.map((element, index) => (
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
						webTitle={keyTakeaway.title}
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
