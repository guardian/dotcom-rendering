import { KeyTakeaway } from '../types/content';
import { RenderArticleElement } from '../lib/renderElement';
import { ServerSideTests, Switches } from '../types/config';
import { EditionId } from '../lib/edition';
import { ArticleFormat } from '@guardian/libs';
import { css } from '@emotion/react';
import { headline } from '@guardian/source-foundations';
import { palette } from '../palette';

const headingStyles = css`
	${headline.xsmall({ fontWeight: 'medium' })};
	padding: 2px 0px;
`;

const headingIndexStyles = css`
	${headline.xsmall({ fontWeight: 'bold' })};
`;

const headingLineStyles = css`
	height: 8px;
	width: 140px;
	margin: 0px;
	border: 0px;
	border-top: 8px solid ${palette('--heading-line')};
`;

interface CommonProps {
	format: ArticleFormat;
	ajaxUrl: string;
	host: string;
	pageId: string;
	isAdFreeUser: boolean;
	isSensitive: boolean;
	abTests: ServerSideTests;
	switches: Switches;
	editionId: EditionId;
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
}: KeyTakeawayProps) => {
	return (
		<>
			<hr css={headingLineStyles}></hr>
			<h2 css={headingStyles}>
				<span css={headingIndexStyles}>{`${titleIndex}. `}</span>
				keyTakeaway.title
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
					isMainMedia={index === 0}
					pageId={pageId}
					webTitle={keyTakeaway.title}
					isAdFreeUser={isAdFreeUser}
					isSensitive={isSensitive}
					switches={switches}
					abTests={abTests}
					editionId={editionId}
				/>
			))}
		</>
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
}: KeyTakeawaysProps) => {
	return (
		<>
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
				/>
			))}
		</>
	);
};
