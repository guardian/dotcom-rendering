import { css } from '@emotion/react';
import { ArticleDesign, ArticleDisplay } from '@guardian/libs';
import type { ArticleFormat } from '@guardian/libs';
import { between, body, headline, space } from '@guardian/source-foundations';
import { isRecipe } from '../../model/enhance-recipes';
import type { Switches } from '../../types/config';
import type { Palette } from '../../types/palette';
import { Platform } from '../../types/platform';
import type { CombinedProps } from '../../types/props';
import type { TagType } from '../../types/tag';
import { ArticleRenderer } from '../lib/ArticleRenderer';
import { decidePalette } from '../lib/decidePalette';
import {
	AppsLiveBlogRenderer,
	WebLiveBlogRenderer,
} from '../lib/LiveBlogRenderer';
import { revealStyles } from '../lib/revealStyles';
import { Island } from './Island';
import { RecipeMultiplier } from './RecipeMultiplier.importable';

type CommonProps = {
	format: ArticleFormat;
	blocks: Block[];
	pinnedPost?: Block;
	adTargeting?: AdTargeting;
	host?: string;
	pageId: string;
	webTitle: string;
	ajaxUrl: string;
	isAdFreeUser: boolean;
	switches: Switches;
	section: string;
	shouldHideReaderRevenue: boolean;
	tags: TagType[];
	isPaidContent: boolean;
	contentType: string;
	sectionName: string;
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
};

type AppsProps = void;

type WebProps = {
	contributionsServiceUrl: string;
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

const globalH3Styles = (display: ArticleDisplay) => {
	switch (display) {
		case ArticleDisplay.NumberedList:
			return css`
				h3 {
					${headline.xsmall({ fontWeight: 'bold' })};
					margin-bottom: ${space[2]}px;
				}
			`;
		default:
			return css`
				h3 {
					${body.medium({ fontWeight: 'bold' })};
					margin-bottom: ${space[4]}px;
				}
			`;
	}
};

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

const ArticleBody = (
	props: CombinedProps<CommonProps, AppsProps, WebProps>,
) => {
	const {
		format,
		blocks,
		pinnedPost,
		adTargeting,
		host,
		pageId,
		webTitle,
		ajaxUrl,
		switches,
		isAdFreeUser,
		section,
		shouldHideReaderRevenue,
		tags,
		isPaidContent,
		contentType,
		sectionName,
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
		platform,
	} = props;
	const isInteractive = format.design === ArticleDesign.Interactive;
	const palette = decidePalette(format);

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
				{platform === Platform.Web ? (
					<WebLiveBlogRenderer
						format={format}
						blocks={blocks}
						pinnedPost={pinnedPost}
						adTargeting={adTargeting}
						host={host}
						pageId={pageId}
						webTitle={webTitle}
						ajaxUrl={ajaxUrl}
						switches={switches}
						isAdFreeUser={isAdFreeUser}
						isSensitive={isSensitive}
						isLiveUpdate={false}
						section={section}
						shouldHideReaderRevenue={shouldHideReaderRevenue}
						tags={tags}
						isPaidContent={isPaidContent}
						onFirstPage={onFirstPage}
						keyEvents={keyEvents}
						filterKeyEvents={filterKeyEvents}
						availableTopics={availableTopics}
						selectedTopics={selectedTopics}
						keywordIds={keywordIds}
						contributionsServiceUrl={props.contributionsServiceUrl}
					/>
				) : (
					<AppsLiveBlogRenderer
						format={format}
						blocks={blocks}
						pinnedPost={pinnedPost}
						adTargeting={adTargeting}
						host={host}
						pageId={pageId}
						webTitle={webTitle}
						ajaxUrl={ajaxUrl}
						switches={switches}
						isAdFreeUser={isAdFreeUser}
						isSensitive={isSensitive}
						isLiveUpdate={false}
						section={section}
						shouldHideReaderRevenue={shouldHideReaderRevenue}
						tags={tags}
						isPaidContent={isPaidContent}
						onFirstPage={onFirstPage}
						keyEvents={keyEvents}
						filterKeyEvents={filterKeyEvents}
						availableTopics={availableTopics}
						selectedTopics={selectedTopics}
						keywordIds={keywordIds}
					/>
				)}
			</div>
		);
	}
	return (
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
		>
			{isRecipe(tags) && (
				<Island deferUntil="hash" clientOnly={true}>
					<RecipeMultiplier />
				</Island>
			)}
			<ArticleRenderer
				format={format}
				elements={blocks[0] ? blocks[0].elements : []}
				adTargeting={adTargeting}
				host={host}
				pageId={pageId}
				webTitle={webTitle}
				ajaxUrl={ajaxUrl}
				contentType={contentType}
				sectionName={sectionName}
				tags={tags}
				isPaidContent={isPaidContent}
				isPreview={isPreview}
				idUrl={idUrl}
				switches={switches}
				isDev={isDev}
				isAdFreeUser={isAdFreeUser}
				isSensitive={isSensitive}
				platform={platform}
			/>
		</div>
	);
};

export const WebArticleBody = (props: CommonProps & WebProps) => (
	<ArticleBody {...props} platform={Platform.Web} />
);

export const AppsArticleBody = (props: CommonProps) => (
	<ArticleBody {...props} platform={Platform.Apps} />
);
