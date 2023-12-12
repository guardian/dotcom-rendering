import { css } from '@emotion/react';
import type { ArticleFormat } from '@guardian/libs';
import { ArticleDesign } from '@guardian/libs';
import { between, from, space, until } from '@guardian/source-foundations';
import { StraightLines } from '@guardian/source-react-components-development-kitchen';
import { interactiveLegacyClasses } from '../layouts/lib/interactiveLegacyStyling';
import { getSoleContributor } from '../lib/byline';
import { palette as themePalette } from '../palette';
import type { Branding as BrandingType } from '../types/branding';
import type { TagType } from '../types/tag';
import {
	metaContainer as metaContainerMargins,
	shouldShowAvatar,
	shouldShowContributor,
} from './ArticleMeta';
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
	grid-template-rows: auto auto auto;
	grid-template-columns: auto 1fr auto;
	grid-template-areas:
		'avatar byline comment-count'
		'avatar byline comment-count'
		'dateline dateline dateline';
`;

const MetaGridAvatar = ({ children }: { children: React.ReactNode }) => (
	<div
		css={css`
			grid-area: avatar;
			width: 60px;
			height: 60px;
			margin-top: ${space[1]}px;
			margin-right: ${space[2]}px;
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
			padding-top: ${space[2]}px;

			address > div > svg:first-of-type {
				display: block;
				margin-top: ${space[2]}px;
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
		data-print-layout="hide"
		css={css`
			grid-area: comment-count;
			border-left: 1px solid ${themePalette('--article-border')};

			${until.desktop} {
				margin-top: ${isPictureContent ? '-6px' : '-2px'};
				padding-top: ${isPictureContent ? '6px' : '2px'};
				padding-left: 10px;
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
			details {
				padding-top: ${space[2]}px;
				margin-bottom: ${space[4]}px;
			}
			div {
				padding-top: ${space[2]}px;
				margin-bottom: ${space[4]}px;
			}
		`}
	>
		{children}
	</div>
);

const metaPadding = (format: ArticleFormat) => {
	if (
		format.design === ArticleDesign.LiveBlog ||
		format.design === ArticleDesign.DeadBlog
	) {
		return css`
			${between.tablet.and.leftCol} {
				order: 3;
			}

			padding-top: 2px;
		`;
	}

	return css`
		${between.tablet.and.leftCol} {
			order: 3;
		}

		${until.mobileLandscape} {
			padding-inline: ${space[2]}px;
		}

		${from.mobileLandscape} {
			padding-left: ${space[5]}px;
			padding-right: ${space[5]}px;
		}

		${from.phablet} {
			padding-left: 0px;
			padding-right: 0px;
		}

		padding-top: 2px;
	`;
};

// ${!isPictureContent && until.mobileLandscape} {
// 	margin-left: -20px;
// 	margin-right: -20px;
// 	width: auto;
// }

// ${!isPictureContent && until.phablet} {
// 	margin-left: -10px;
// 	margin-right: -10px;
// 	width: auto;
// }
const stretchLines = css`
	display: block;
	margin-left: calc((-100vw + 100%) / 2);
	width: 100vw;
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
	// const isLiveBlog = format.design === ArticleDesign.LiveBlog;

	const isCommentLayout = format.design === ArticleDesign.Comment;
	const shouldShowFollowButtonsOnCommentLayout =
		isCommentLayout && !!byline && soleContributor !== undefined;

	return (
		<div
			className={
				isInteractive ? interactiveLegacyClasses.metaContainer : ''
			}
			css={metaContainerMargins(format)}
		>
			<div css={[metaPadding(format)]}>
				<div>
					{branding && (
						<Island priority="feature" defer={{ until: 'visible' }}>
							<Branding branding={branding} format={format} />
						</Island>
					)}

					{shouldShowFollowButtonsOnCommentLayout && (
						<StraightLines
							cssOverrides={[
								css`
									margin-bottom: -2px;
								`,
							]}
							count={4}
							color={themePalette('--article-border')}
						/>
					)}

					<div css={metaGridContainer}>
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
								<div
									css={css`
										margin-bottom: 8px;
									`}
								>
									<Island
										priority="feature"
										defer={{ until: 'visible' }}
									>
										<FollowWrapper
											displayName={soleContributor.title}
											id={soleContributor.id}
										/>
									</Island>
								</div>
							)}
							{messageUs &&
								format.design === ArticleDesign.LiveBlog && (
									<Island
										priority="feature"
										defer={{ until: 'visible' }}
									>
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
							<MetaGridCommentCount
								isPictureContent={isPictureContent}
							>
								<div>
									<Island
										priority="feature"
										defer={{ until: 'idle' }}
									>
										<CommentCount
											discussionApiUrl={discussionApiUrl}
											shortUrlId={shortUrlId}
											format={format}
										/>
									</Island>
								</div>
							</MetaGridCommentCount>
						)}

						<MetaGridDateline>
							<StraightLines
								cssOverrides={[stretchLines]}
								count={1}
								color={themePalette('--article-border')}
							/>
							<Dateline
								primaryDateline={primaryDateline}
								secondaryDateline={secondaryDateline}
								format={format}
							/>
						</MetaGridDateline>
					</div>
				</div>
			</div>
		</div>
	);
};
