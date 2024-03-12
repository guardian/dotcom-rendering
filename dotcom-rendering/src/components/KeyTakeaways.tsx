import { css } from '@emotion/react';
import type { ArticleFormat } from '@guardian/libs';
import { headline } from '@guardian/source-foundations';
import type { EditionId } from '../lib/edition';
import { RenderArticleElement } from '../lib/renderElement';
import { palette } from '../palette';
import type { ServerSideTests, Switches } from '../types/config';
import type { KeyTakeaway } from '../types/content';

const keyTakeawayStyles = css`
	padding-top: 8px;
`;

const headingStyles = css`
	${headline.xsmall({ fontWeight: 'medium' })};
	padding: 2px 0px;
`;

const headingIndexStyles = css`
	${headline.xsmall({ fontWeight: 'bold' })};
`;

const headingLineStyles = css`
	width: 140px;
	margin: 0px;
	border: none;
	border-top: 8px solid ${palette('--heading-line')};
`;

interface CommonProps {
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
}

interface KeyTakeawaysProps extends CommonProps {
	keyTakeaways: KeyTakeaway[];
}

interface KeyTakeawayProps extends CommonProps {
	keyTakeaway: KeyTakeaway;
	titleIndex: number;
}

const KeyTakeawayComponent = ({
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
}: KeyTakeawayProps) => {
	return (
		<li css={keyTakeawayStyles}>
			<hr css={headingLineStyles}></hr>
			<h2 css={headingStyles}>
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
				/>
			))}
		</li>
	);
};

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
}: KeyTakeawaysProps) => {
	return (
		<ol>
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
				/>
			))}
		</ol>
	);
};
