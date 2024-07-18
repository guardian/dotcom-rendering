import { css } from '@emotion/react';
import { type ArticleFormat } from '@guardian/libs';
import { neutral, textSans14 } from '@guardian/source/foundations';
import type { EditionId } from '../lib/edition';
import type { ArticleElementRenderer } from '../lib/renderElement';
import { slugify } from '../model/enhance-H2s';
import { palette } from '../palette';
import type { ServerSideTests, Switches } from '../types/config';
import type {
	MiniProfile as MiniProfileModel,
	StarRating,
} from '../types/content';
import { subheadingStyles } from './Subheading';

const miniProfileStyles = css`
	padding-top: 8px;
`;

const headingLineStyles = css`
	width: 140px;
	margin: 0 0 2px 0;
	border: none;
	border-top: 4px solid ${palette('--heading-line')};
`;

// Nesting is necessary in the bio styles because we receive a string of html from the
// field. This can contain the following tags:
// Blocks: p, ul, li
// Inline: strong, em, a
const bioStyles = css`
	${textSans14};
	padding-top: 6px;
	color: ${palette('--mini-profiles-text-subdued')};
	line-height: 1.3rem;
	p {
		margin-bottom: 0.5rem;
	}
	a {
		color: ${palette('--caption-link')};
		text-underline-offset: 3px;
	}
	a:not(:hover) {
		text-decoration-color: ${neutral[86]};
	}
	a:hover {
		text-decoration: underline;
	}
	ul {
		list-style: none;
		margin: 0 0 0.75rem;
		padding: 0;
		margin-bottom: 0.5rem;
	}
	ul li {
		padding-left: 1.25rem;
	}
	ul li p {
		display: inline-block;
		margin-bottom: 0;
	}
	ul li:before {
		display: inline-block;
		content: '';
		border-radius: 0.375rem;
		height: 10px;
		width: 10px;
		margin: 0 0.5rem 0 -1.25rem;
		background-color: ${palette('--bullet-fill')};
	}
	strong {
		font-weight: bold;
	}
`;

const endNoteStyles = css`
	${textSans14};
	line-height: 135%;
	color: ${palette('--mini-profiles-text-subdued')};
	margin-bottom: 1rem;
`;

const bottomBorderStyles = css`
	border-top: 1px solid ${palette('--article-border')};
	margin-bottom: 0.5rem;
`;

const headingMarginStyle = css`
	margin-bottom: 4px;
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
	hideCaption,
	starRating,
	RenderArticleElement,
}: MiniProfileProps) => {
	return (
		<>
			<li css={miniProfileStyles} data-spacefinder-role="nested">
				<hr css={headingLineStyles} />
				<h3
					id={slugify(miniProfile.title)}
					css={[subheadingStyles(format), headingMarginStyle]}
				>
					{miniProfile.title}
				</h3>
				<Bio html={miniProfile.bio} />
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
				{miniProfile.endNote ? (
					<EndNote text={miniProfile.endNote} />
				) : null}
			</li>
		</>
	);
};

const Bio = ({ html }: { html?: string }) => {
	if (!html) return null;
	return (
		<>
			<div css={bioStyles} dangerouslySetInnerHTML={{ __html: html }} />
			<div css={bottomBorderStyles} />
		</>
	);
};

const EndNote = ({ text }: { text?: string }) => {
	if (!text) return null;
	return (
		<p css={endNoteStyles}>
			<em>{text}</em>
		</p>
	);
};
