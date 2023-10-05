import { css } from '@emotion/react';
import { ArticleDesign, ArticleDisplay } from '@guardian/libs';
import type { ArticleFormat } from '@guardian/libs';
import { between, body, headline, space } from '@guardian/source-foundations';
import { ArticleRenderer } from '../lib/ArticleRenderer';
import { decidePalette } from '../lib/decidePalette';
import { decideLanguage, decideLanguageDirection } from '../lib/lang';
import { LiveBlogRenderer } from '../lib/LiveBlogRenderer';
import { revealStyles } from '../lib/revealStyles';
import type { ImageForAppsLightbox } from '../model/appsLightboxImages';
import type { ServerSideTests, Switches } from '../types/config';
import type { TableOfContentsItem } from '../types/frontend';
import type { Palette } from '../types/palette';
import type { TagType } from '../types/tag';
import { Island } from './Island';
import { RecipeMultiplier } from './RecipeMultiplier.importable';
import { TableOfContents } from './TableOfContents.importable';

type Props = {
	format: ArticleFormat;
	blocks: Block[];
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
	availableTopics?: Topic[];
	selectedTopics?: Topic[];
	isInLiveblogAdSlotTest?: boolean;
	abTests?: ServerSideTests;
	tableOfContents?: TableOfContentsItem[];
	lang?: string;
	isRightToLeftLang?: boolean;
	imagesForAppsLightbox: ImageForAppsLightbox[];
};

const globalH2Styles = (display: ArticleDisplay) => css`
	h2:not([data-ignore='global-h2-styling']) {
		${display === ArticleDisplay.Immersive
			? headline.medium({ fontWeight: 'light' })
			: headline.xxsmall({ fontWeight: 'bold' })};
	}
`;

const globalOlStyles = () => css`
	ol:not([data-ignore='global-ol-styling']) {
		counter-reset: li;
		li:before {
			${body.medium({ lineHeight: 'tight' })};
			content: counter(li);
			counter-increment: li;
			margin-right: ${space[1]}px;
		}
	}
`;

const globalH3Styles = (display: ArticleDisplay) => css`
	${display === ArticleDisplay.NumberedList &&
	`
		h3 {
			${headline.xsmall({ fontWeight: 'bold' })};
			margin-bottom: ${space[2]}px;
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

const globalLinkStyles = (palette: Palette) => css`
	a:not([data-ignore='global-link-styling']) {
		text-decoration: none;
		border-bottom: 1px solid ${palette.border.articleLink};
		color: ${palette.text.articleLink};

		:hover {
			color: ${palette.text.articleLinkHover};
			border-bottom: 1px solid ${palette.border.articleLinkHover};
		}
	}
`;

const isRecipe = (tags: TagType[]): boolean =>
	tags.some(({ id }) => id === 'tone/recipes');

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
	onFirstPage,
	keyEvents,
	filterKeyEvents,
	availableTopics,
	selectedTopics,
	keywordIds,
	isInLiveblogAdSlotTest = false,
	abTests,
	tableOfContents,
	lang,
	isRightToLeftLang = false,
	imagesForAppsLightbox,
}: Props) => {
	const isInteractive = format.design === ArticleDesign.Interactive;
	const palette = decidePalette(format);
	const language = decideLanguage(lang);
	const languageDirection = decideLanguageDirection(isRightToLeftLang);

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
					globalStrongStyles,
					globalH2Styles(format.display),
					globalH3Styles(format.display),
					globalLinkStyles(palette),
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
					availableTopics={availableTopics}
					selectedTopics={selectedTopics}
					keywordIds={keywordIds}
					isInLiveblogAdSlotTest={isInLiveblogAdSlotTest}
				/>
			</div>
		);
	}
	return (
		<>
			{tableOfContents && tableOfContents.length > 0 && (
				<Island priority="critical">
					<TableOfContents
						tableOfContents={tableOfContents}
						format={format}
					></TableOfContents>
				</Island>
			)}
			<div
				id="maincontent"
				css={[
					isInteractive ? null : bodyPadding,
					globalH2Styles(format.display),
					globalH3Styles(format.display),
					globalOlStyles(),
					globalStrongStyles,
					globalLinkStyles(palette),
				]}
				lang={language}
				dir={languageDirection}
			>
				{isRecipe(tags) && (
					<Island
						priority="feature"
						defer={{ until: 'hash' }}
						clientOnly={true}
					>
						<RecipeMultiplier />
					</Island>
				)}
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
					imagesForAppsLightbox={imagesForAppsLightbox}
				/>
			</div>
		</>
	);
};
