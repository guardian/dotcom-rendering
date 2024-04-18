import { css } from '@emotion/react';
import { type ArticleFormat } from '@guardian/libs';
import { remSpace } from '@guardian/source-foundations';
import type { EditionId } from '../lib/edition';
import type { ArticleElementRenderer } from '../lib/renderElement';
import { palette } from '../palette';
import type { ServerSideTests, Switches } from '../types/config';
import type { KeyTakeaway as KeyTakeawayModel } from '../types/content';
import { subheadingStyles } from './SubheadingBlockComponent';

const keyTakeawayStyles = css`
	padding-top: 8px;
`;

const headingIndexStyles = css`
	font-weight: bold;
`;

const headingLineStyles = css`
	width: 140px;
	margin: 0;
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
	starRating?: number;
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
			<li css={keyTakeawayStyles}>
				<hr css={headingLineStyles} />
				<h2
					css={[
						subheadingStyles(format),
						`padding: ${remSpace[0]} 0;`,
					]}
				>
					<span css={headingIndexStyles}>{`${titleIndex}. `}</span>
					{keyTakeaway.title}
				</h2>
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
					/>
				))}
			</li>
		</>
	);
};
