import { css } from '@emotion/react';
import { isUndefined } from '@guardian/libs';
import { from, space, until } from '@guardian/source/foundations';
import { StraightLines } from '@guardian/source-development-kitchen/react-components';
import type { ReactNode } from 'react';
import { grid } from '../grid';
import { interactiveLegacyClasses } from '../layouts/lib/interactiveLegacyStyling';
import {
	ArticleDesign,
	ArticleDisplay,
	type ArticleFormat,
} from '../lib/articleFormat';
import { getSoleContributor } from '../lib/byline';
import { palette as themePalette } from '../palette';
import type { Branding as BrandingType } from '../types/branding';
import type { TagType } from '../types/tag';
import { shouldShowAvatar, shouldShowContributor } from './ArticleMeta.web';
import { Avatar } from './Avatar';
import { Branding } from './Branding.importable';
import { CommentCount } from './CommentCount.importable';
import { Contributor } from './Contributor';
import { Dateline } from './Dateline';
import { FollowWrapper } from './FollowWrapper.importable';
import { Island } from './Island';
import { ListenToArticle } from './ListenToArticle.importable';
import { LiveblogNotifications } from './LiveblogNotifications.importable';

type Props = {
	format: ArticleFormat;
	byline?: string;
	tags: TagType[];
	primaryDateline: string;
	secondaryDateline: string;
	branding?: BrandingType;
	discussionApiUrl: string;
	shortUrlId: string;
	isCommentable: boolean;
	pageId?: string;
	headline?: string;
};

const metaGridContainer = css`
	display: grid;
	grid-template-rows: auto auto auto auto auto;
	grid-template-columns: 10px auto 1fr auto 10px;
	grid-template-areas:
		'. .        .        .             .'
		'. avatar   byline   comment-count .'
		'. avatar   byline   comment-count .'
		'. .        .        .             .'
		'. dateline dateline dateline      .'
		'. branding branding branding      .';

	${from.mobileLandscape} {
		grid-template-columns: 20px auto 1fr auto 20px;
	}

	${from.phablet} {
		grid-template-columns: 0px auto 1fr auto 0px;
	}
`;

const metaContainerMargins = css`
	${until.phablet} {
		margin-left: -20px;
		margin-right: -20px;
	}
	${until.mobileLandscape} {
		margin-left: -10px;
		margin-right: -10px;
	}
`;

const MetaGridAvatar = ({ children }: { children: ReactNode }) => (
	<div
		css={css`
			grid-area: avatar;
			width: 60px;
			height: 60px;
			margin-top: ${space[2]}px;
			margin-right: ${space[3]}px;
			margin-bottom: ${space[3]}px;
			margin-left: 0px;
			${from.leftCol} {
				width: 140px;
				height: 140px;
			}
		`}
	>
		{children}
	</div>
);

const MetaGridByline = ({
	children,
	isComment,
}: {
	children: ReactNode;
	isComment: boolean;
}) => (
	// address > div > span > div:first-of-type - spacing for the Follow Tag buttons in follow wrapper,
	// which is contextual of the meta by layout type
	<div
		css={css`
			grid-area: byline;
			width: auto;
			margin-top: ${space[2]}px;
			margin-bottom: ${space[3]}px;

			address > div {
				padding-bottom: 0px;
			}

			address > div > span > div:first-of-type {
				display: block;
				margin-top: ${space[2]}px;
				${!isComment && `margin-bottom: ${space[2]}px;`}
			}
		`}
	>
		{children}
	</div>
);

const MetaGridCommentCount = ({
	children,
	isPicture,
	isComment,
	isImmersive,
	isAnalysis,
	isLiveBlog,
}: {
	children: ReactNode;
	isPicture: boolean;
	isComment: boolean;
	isImmersive: boolean;
	isAnalysis: boolean;
	isLiveBlog: boolean;
}) => (
	<div
		data-print-content="hide"
		css={css`
			grid-area: comment-count;
			border-left: 1px solid
				${isLiveBlog
					? 'rgba(255, 255, 255, 0.4)'
					: themePalette('--article-meta-lines')};
			padding-top: ${space[2]}px;
			padding-left: ${space[2]}px;
			${(isComment || isImmersive || isAnalysis || isLiveBlog) &&
			`padding-bottom: ${space[3]}px;`}
			${isPicture && 'margin-top: -4px;'}

			${from.mobileLandscape} {
				padding-top: ${space[2]}px;
				padding-left: ${space[4]}px;
			}

			${from.phablet} {
				padding-right: ${space[4]}px;
			}
		`}
	>
		{children}
	</div>
);

const MetaGridDateline = ({
	children,
	isImmersiveOrAnalysisWithMultipleAuthors,
}: {
	children: ReactNode;
	isImmersiveOrAnalysisWithMultipleAuthors: boolean;
}) => (
	<div
		css={css`
			margin-top: ${space[2]}px;
			margin-bottom: ${space[4]}px;
		`}
		style={{
			gridArea: isImmersiveOrAnalysisWithMultipleAuthors
				? 'byline'
				: 'dateline',
		}}
	>
		{children}
	</div>
);

const MetaGridBranding = ({ children }: { children: ReactNode }) => (
	<div
		css={css`
			grid-area: branding;
		`}
	>
		{children}
	</div>
);

const stretchLines = css`
	grid-column: 1 / -1;
`;

const galleryMetaContainer = css`
	${grid.column.centre}
	padding-bottom: ${space[2]}px;
	${from.tablet} {
		position: relative;
		&::before {
			content: '';
			position: absolute;
			left: -10px;
			top: 0;
			bottom: 0;
			width: 1px;
			background-color: ${themePalette('--article-border')};
		}
	}
`;

export const ArticleMetaApps = ({
	branding,
	format,
	byline,
	tags,
	primaryDateline,
	secondaryDateline,
	discussionApiUrl,
	shortUrlId,
	isCommentable,
	pageId,
	headline,
}: Props) => {
	const soleContributor = getSoleContributor(tags, byline);
	const authorName = soleContributor?.title ?? 'Author Image';
	const avatarUrl = shouldShowAvatar(format)
		? soleContributor?.bylineLargeImageUrl
		: undefined;

	const isInteractive = format.design === ArticleDesign.Interactive;
	const isPicture = format.design === ArticleDesign.Picture;
	const isComment = format.design === ArticleDesign.Comment;
	const isImmersive = format.display === ArticleDisplay.Immersive;
	const isAnalysis = format.design === ArticleDesign.Analysis;
	const isLiveBlog = format.design === ArticleDesign.LiveBlog;
	const isGallery = format.design === ArticleDesign.Gallery;
	const isVideo = format.design === ArticleDesign.Video;

	const shouldShowFollowButtons = (layoutOrDesignType: boolean) =>
		layoutOrDesignType && !!byline && !isUndefined(soleContributor);

	const shouldShowLiveblogNotifications =
		isLiveBlog && !!pageId && !!headline;

	const isImmersiveOrAnalysisWithMultipleAuthors =
		(isAnalysis || isImmersive) && !!byline && isUndefined(soleContributor);

	const shouldShowListenToArticleButton =
		!!pageId && !(isLiveBlog || isPicture || isGallery || isVideo);

	return (
		<div
			className={
				isInteractive ? interactiveLegacyClasses.metaContainer : ''
			}
			css={[
				metaContainerMargins,
				isGallery ? galleryMetaContainer : undefined,
			]}
		>
			<div
				css={[
					metaGridContainer,
					css`
						${isImmersiveOrAnalysisWithMultipleAuthors &&
						`margin-bottom: ${space[4]}px;`}
					`,
				]}
			>
				{shouldShowFollowButtons(isComment) && (
					<StraightLines
						cssOverrides={stretchLines}
						count={4}
						color={themePalette('--article-meta-lines')}
					/>
				)}
				{!!avatarUrl && (
					<MetaGridAvatar>
						<Avatar src={avatarUrl} alt={authorName} />
					</MetaGridAvatar>
				)}
				<MetaGridByline isComment={isComment}>
					{shouldShowContributor(format) && !!byline && (
						<Contributor
							byline={byline}
							tags={tags}
							format={format}
						/>
					)}
					{shouldShowFollowButtons(
						isComment || isAnalysis || isImmersive,
					) &&
						soleContributor && (
							<Island
								priority="feature"
								defer={{ until: 'visible' }}
							>
								<FollowWrapper
									displayName={soleContributor.title}
									id={soleContributor.id}
								/>
							</Island>
						)}
					{shouldShowLiveblogNotifications && (
						<Island priority="critical">
							<LiveblogNotifications
								displayName={headline}
								id={pageId}
							/>
						</Island>
					)}
				</MetaGridByline>
				{isCommentable && (
					<MetaGridCommentCount
						isPicture={isPicture}
						isComment={isComment}
						isImmersive={isImmersive}
						isAnalysis={isAnalysis}
						isLiveBlog={isLiveBlog}
					>
						<Island priority="feature" defer={{ until: 'idle' }}>
							<CommentCount
								discussionApiUrl={discussionApiUrl}
								shortUrlId={shortUrlId}
							/>
						</Island>
					</MetaGridCommentCount>
				)}
				<StraightLines
					cssOverrides={[
						stretchLines,
						css`
							grid-row: 4 / -4;
						`,
					]}
					count={1}
					color={
						isLiveBlog
							? 'rgba(255, 255, 255, 0.4)'
							: themePalette('--article-meta-lines')
					}
				/>
				<MetaGridDateline
					isImmersiveOrAnalysisWithMultipleAuthors={
						isImmersiveOrAnalysisWithMultipleAuthors
					}
				>
					<Dateline
						primaryDateline={primaryDateline}
						secondaryDateline={secondaryDateline}
						format={format}
					/>
				</MetaGridDateline>
				{branding && (
					<MetaGridBranding>
						<Island priority="feature" defer={{ until: 'visible' }}>
							<Branding branding={branding} format={format} />
						</Island>
					</MetaGridBranding>
				)}
			</div>
			{shouldShowListenToArticleButton && (
				<Island priority="feature" defer={{ until: 'visible' }}>
					<ListenToArticle articleId={pageId} />
				</Island>
			)}
		</div>
	);
};
