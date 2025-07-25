import { css } from '@emotion/react';
import {
	between,
	headlineBold24,
	remSpace,
	textEgyptian17,
} from '@guardian/source/foundations';
import {
	ArticleDesign,
	ArticleDisplay,
	type ArticleFormat,
} from '../lib/articleFormat';
import { ArticleRenderer } from '../lib/ArticleRenderer';
import type { EditionId } from '../lib/edition';
import { decideLanguage, decideLanguageDirection } from '../lib/lang';
import { revealStyles } from '../lib/revealStyles';
import type { TableOfContentsItem } from '../model/enhanceTableOfContents';
import { palette as themePalette } from '../palette';
import type { Block } from '../types/blocks';
import type { ServerSideTests, Switches } from '../types/config';
import type { TagType } from '../types/tag';
import { Island } from './Island';
import { LiveBlogRenderer } from './LiveBlogRenderer';
import { TableOfContents } from './TableOfContents.importable';
import { textBlockStyles } from './TextBlockComponent';

type Props = {
	format: ArticleFormat;
	blocks: Block[];
	editionId: EditionId;
	pinnedPost?: Block;
	host?: string;
	pageId: string;
	webTitle: string;
	ajaxUrl: string;
	isAdFreeUser: boolean;
	switches: Switches;
	sectionId: string;
	shouldHideReaderRevenue: boolean;
	tags: TagType[];
	isPaidContent: boolean;
	contributionsServiceUrl: string;
	contentType: string;
	keywordIds: string;
	isPreview?: boolean;
	idUrl: string;
	isSensitive: boolean;
	isDev: boolean;
	onFirstPage?: boolean;
	keyEvents?: Block[];
	filterKeyEvents?: boolean;
	abTests: ServerSideTests;
	tableOfContents?: TableOfContentsItem[];
	lang?: string;
	isRightToLeftLang?: boolean;
	shouldHideAds: boolean;
};

const globalOlStyles = () => css`
	ol:not([data-ignore='global-ol-styling']) {
		counter-reset: li;

		> li::before {
			${textEgyptian17};
			line-height: 1.15;
			content: counter(li);
			counter-increment: li;
			margin-right: ${remSpace[1]};
			float: left;
		}
	}
`;

const globalH3Styles = (display: ArticleDisplay) => css`
	${display === ArticleDisplay.NumberedList &&
	`
		h3 {
			${headlineBold24};
			margin-bottom: ${remSpace[2]};
		}
	`}
`;

const globalStrongStyles = css`
	strong {
		font-weight: bold;
	}
`;

const bodyPadding = css`
	${between.tablet.and.desktop} {
		padding-right: 80px;
	}
`;

const globalLinkStyles = () => css`
	a:not([data-ignore='global-link-styling']) {
		text-decoration: none;
		border-bottom: 1px solid ${themePalette('--article-link-border')};
		color: ${themePalette('--article-link-text')};

		:hover {
			color: ${themePalette('--article-link-text-hover')};
			border-bottom: 1px solid
				${themePalette('--article-link-border-hover')};
		}
	}
`;

export const ArticleBody = ({
	format,
	blocks,
	pinnedPost,
	host,
	pageId,
	webTitle,
	ajaxUrl,
	switches,
	isAdFreeUser,
	sectionId,
	shouldHideReaderRevenue,
	tags,
	isPaidContent,
	contributionsServiceUrl,
	contentType,
	isPreview,
	idUrl,
	isSensitive,
	isDev,
	onFirstPage = false,
	keyEvents = [],
	filterKeyEvents = false,
	keywordIds,
	abTests,
	tableOfContents,
	lang,
	isRightToLeftLang = false,
	editionId,
	shouldHideAds,
}: Props) => {
	const isInteractiveContent =
		format.design === ArticleDesign.Interactive ||
		format.design === ArticleDesign.Crossword;
	const language = decideLanguage(lang);
	const languageDirection = decideLanguageDirection(isRightToLeftLang);
	const hasObserverPublicationTag = tags.find(
		(tag) =>
			tag.type === 'Publication' && tag.id === 'publication/theobserver',
	);
	const ObserverFooter = () => {
		return (
			<ul css={textBlockStyles(format)}>
				<li>
					<p>
						This is the archive of The Observer up until 21/04/2025.
						The Observer is now owned and operated by Tortoise
						Media.
					</p>
				</li>
			</ul>
		);
	};

	if (
		format.design === ArticleDesign.LiveBlog ||
		format.design === ArticleDesign.DeadBlog
	) {
		return (
			<div
				id="liveblog-body"
				// This classname is used by Spacefinder as the container in which it'll attempt to insert inline ads
				className="js-liveblog-body"
				css={[
					`margin-top: ${remSpace[3]}`,
					globalStrongStyles,
					globalH3Styles(format.display),
					globalLinkStyles(),
					// revealStyles is used to animate the reveal of new blocks
					(format.design === ArticleDesign.DeadBlog ||
						format.design === ArticleDesign.LiveBlog) &&
						revealStyles,
				]}
			>
				<LiveBlogRenderer
					format={format}
					blocks={blocks}
					pinnedPost={pinnedPost}
					host={host}
					pageId={pageId}
					webTitle={webTitle}
					ajaxUrl={ajaxUrl}
					abTests={abTests}
					switches={switches}
					isAdFreeUser={isAdFreeUser}
					isSensitive={isSensitive}
					isLiveUpdate={false}
					sectionId={sectionId}
					shouldHideReaderRevenue={shouldHideReaderRevenue}
					tags={tags}
					isPaidContent={isPaidContent}
					contributionsServiceUrl={contributionsServiceUrl}
					onFirstPage={onFirstPage}
					keyEvents={keyEvents}
					filterKeyEvents={filterKeyEvents}
					keywordIds={keywordIds}
					editionId={editionId}
					shouldHideAds={shouldHideAds}
				/>
			</div>
		);
	}
	return (
		<>
			{tableOfContents && tableOfContents.length > 0 && (
				<Island priority="critical" defer={{ until: 'visible' }}>
					<TableOfContents
						tableOfContents={tableOfContents}
						format={format}
					></TableOfContents>
				</Island>
			)}
			<div
				id="maincontent"
				css={[
					`margin-top: ${remSpace[3]}`,
					isInteractiveContent ? null : bodyPadding,
					globalH3Styles(format.display),
					globalOlStyles(),
					globalStrongStyles,
					globalLinkStyles(),
				]}
				lang={language}
				dir={languageDirection}
			>
				<ArticleRenderer
					format={format}
					elements={blocks[0] ? blocks[0].elements : []}
					host={host}
					pageId={pageId}
					webTitle={webTitle}
					ajaxUrl={ajaxUrl}
					contentType={contentType}
					sectionId={sectionId}
					tags={tags}
					isPaidContent={isPaidContent}
					isPreview={isPreview}
					idUrl={idUrl}
					switches={switches}
					isDev={isDev}
					isAdFreeUser={isAdFreeUser}
					isSensitive={isSensitive}
					abTests={abTests}
					editionId={editionId}
					contributionsServiceUrl={contributionsServiceUrl}
					shouldHideAds={shouldHideAds}
				/>
			</div>
			{hasObserverPublicationTag && <ObserverFooter />}
		</>
	);
};
