import { css } from '@emotion/react';
import type { ArticleFormat } from '@guardian/libs';
import { ArticleDesign, ArticleDisplay } from '@guardian/libs';
import { from, space, until } from '@guardian/source-foundations';
import { StraightLines } from '@guardian/source-react-components-development-kitchen';
import { interactiveLegacyClasses } from '../layouts/lib/interactiveLegacyStyling';
import { getSoleContributor } from '../lib/byline';
import { palette as themePalette } from '../palette';
import type { Branding as BrandingType } from '../types/branding';
import type { TagType } from '../types/tag';
import { shouldShowAvatar, shouldShowContributor } from './ArticleMeta';
import { Avatar } from './Avatar';
import { Branding } from './Branding.importable';
import { CommentCount } from './CommentCount.importable';
import { Contributor } from './Contributor';
import { Dateline } from './Dateline';
import { FollowWrapper } from './FollowWrapper.importable';
import { Island } from './Island';
import { SendAMessage } from './SendAMessage.importable';

type Props = {
	format: ArticleFormat;
	pageId: string;
	webTitle: string;
	byline?: string;
	tags: TagType[];
	primaryDateline: string;
	secondaryDateline: string;
	branding?: BrandingType;
	discussionApiUrl: string;
	shortUrlId: string;
	isCommentable: boolean;
	ajaxUrl: string;
	messageUs?: MessageUs;
};

const metaGridContainer = css`
	display: grid;
	grid-template-rows: auto auto auto auto auto;
	grid-template-columns: 10px auto 1fr auto 10px;
	grid-template-areas:
		' . . . . .'
		'. avatar byline comment-count .'
		'. avatar byline comment-count .'
		' . . . . .'
		'. dateline dateline dateline .';

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

const MetaGridAvatar = ({ children }: { children: React.ReactNode }) => (
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

const MetaGridByline = ({ children }: { children: React.ReactNode }) => (
	<div
		css={css`
			grid-area: byline;
			width: auto;
			margin-top: ${space[2]}px;
			margin-bottom: ${space[2]}px;

			address > div > svg:first-of-type {
				display: block;
				margin-top: ${space[3]}px;
			}
		`}
	>
		{children}
	</div>
);

const MetaGridCommentCount = ({
	children,
	isPictureContent,
}: {
	children: React.ReactNode;
	isPictureContent: boolean;
}) => (
	<div
		data-print-Content="hide"
		css={css`
			grid-area: comment-count;
			border-left: 1px solid ${themePalette('--article-border')};
			padding-top: ${space[2]}px;
			padding-left: ${space[2]}px;
			${isPictureContent && 'margin-top: -4px;'}

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

const MetaGridDateline = ({ children }: { children: React.ReactNode }) => (
	<div
		css={css`
			grid-area: dateline;
			margin-top: ${space[2]}px;
			margin-bottom: ${space[4]}px;
		`}
	>
		{children}
	</div>
);

const stretchLines = ({
	isPictureContent,
}: {
	isPictureContent: boolean;
}) => css`
	grid-column: 1 / -1;

	${isPictureContent &&
	`grid-column: 2 / -2;
	`}
`;

export const ArticleMetaApps = ({
	branding,
	format,
	pageId,
	webTitle,
	byline,
	tags,
	primaryDateline,
	secondaryDateline,
	discussionApiUrl,
	shortUrlId,
	isCommentable,
	ajaxUrl,
	messageUs,
}: Props) => {
	const soleContributor = getSoleContributor(tags, byline);
	const authorName = soleContributor?.title ?? 'Author Image';

	const avatarUrl = shouldShowAvatar(format)
		? soleContributor?.bylineLargeImageUrl
		: undefined;
	const isInteractive = format.design === ArticleDesign.Interactive;

	const isPictureContent = format.design === ArticleDesign.Picture;

	const isCommentLayout = format.design === ArticleDesign.Comment;
	const shouldShowFollowButtonsOnCommentLayout =
		isCommentLayout && !!byline && soleContributor !== undefined;

	return (
		<div
			className={
				isInteractive ? interactiveLegacyClasses.metaContainer : ''
			}
			css={metaContainerMargins}
		>
			<div css={metaGridContainer}>
				{shouldShowFollowButtonsOnCommentLayout && (
					<StraightLines
						cssOverrides={[
							stretchLines({ isPictureContent }),
							css`
								grid-row: 1 / -1;
							`,
						]}
						count={4}
						color={themePalette('--article-border')}
					/>
				)}
				{!!avatarUrl && (
					<MetaGridAvatar>
						<Avatar src={avatarUrl} alt={authorName} />
					</MetaGridAvatar>
				)}

				<MetaGridByline>
					{shouldShowContributor(format) && !!byline && (
						<Contributor
							byline={byline}
							tags={tags}
							format={format}
						/>
					)}
					{shouldShowFollowButtonsOnCommentLayout && (
						<Island priority="feature" defer={{ until: 'visible' }}>
							<FollowWrapper
								displayName={soleContributor.title}
								id={soleContributor.id}
							/>
						</Island>
					)}
					{messageUs && format.design === ArticleDesign.LiveBlog && (
						<Island priority="feature" defer={{ until: 'visible' }}>
							<SendAMessage
								formFields={messageUs.formFields}
								formId={messageUs.formId}
								format={format}
								pageId={pageId}
							/>
						</Island>
					)}
				</MetaGridByline>

				{isCommentable && (
					<MetaGridCommentCount isPictureContent={isPictureContent}>
						<Island priority="feature" defer={{ until: 'idle' }}>
							<CommentCount
								discussionApiUrl={discussionApiUrl}
								shortUrlId={shortUrlId}
							/>
						</Island>
					</MetaGridCommentCount>
				)}

				{format.display !== ArticleDisplay.Immersive &&
					format.design !== ArticleDesign.Analysis && (
						<StraightLines
							cssOverrides={[
								stretchLines({ isPictureContent }),
								css`
									grid-row: 4 / -4;
								`,
							]}
							count={1}
							color={themePalette('--article-border')}
						/>
					)}

				<MetaGridDateline>
					<Dateline
						primaryDateline={primaryDateline}
						secondaryDateline={secondaryDateline}
						format={format}
					/>
				</MetaGridDateline>
			</div>

			{branding && (
				<Island priority="feature" defer={{ until: 'visible' }}>
					<Branding branding={branding} format={format} />
				</Island>
			)}
		</div>
	);
};
