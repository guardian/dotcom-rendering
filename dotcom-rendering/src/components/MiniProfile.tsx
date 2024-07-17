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
import { Subheading } from './Subheading';

const miniProfileStyles = css`
	padding-top: 8px;
`;

const headingLineStyles = css`
	width: 140px;
	margin: 0 0 2px 0;
	border: none;
	border-top: 4px solid ${palette('--heading-line')};
`;

const bioStyles = css`
	${textSans14};
	line-height: 135%;
	padding-top: 6px;
	overflow-wrap: break-word;
	border-bottom: 1px solid ${palette('--article-border')};
	color: ${neutral[46]};
	a {
		color: ${palette('--caption-link')};
		text-decoration: none;
	}
	a:hover {
		text-decoration: underline;
	}
	strong {
		font-weight: bold;
	}
	p {
		margin-bottom: 0.5rem;
	}

	ol {
		list-style: decimal;
		list-style-position: inside;
		margin-bottom: 1rem;
	}

	ul {
		list-style: none;
		margin: 0 0 0.75rem;
		padding: 0;
		margin-bottom: 1rem;
		line-height: 1.3rem;
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
		margin-right: 0.5rem;
		background-color: ${neutral[86]};
		margin-left: -1.25rem;
	}
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
				<Subheading
					id={slugify(miniProfile.title)}
					format={format}
					topPadding={false}
				>
					{miniProfile.title}
				</Subheading>
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
			</li>
		</>
	);
};

const Bio = ({ html }: { html?: string }) => {
	if (!html) return null;

	return <div css={bioStyles} dangerouslySetInnerHTML={{ __html: html }} />;
};
