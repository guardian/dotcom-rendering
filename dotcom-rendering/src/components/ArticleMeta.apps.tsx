import { css } from '@emotion/react';
import type { ArticleFormat } from '@guardian/libs';
import { ArticleDesign, ArticleSpecial } from '@guardian/libs';
import {
	between,
	border,
	from,
	space,
	until,
} from '@guardian/source-foundations';
import { StraightLines } from '@guardian/source-react-components-development-kitchen';
import { interactiveLegacyClasses } from '../layouts/lib/interactiveLegacyStyling';
import { getSoleContributor } from '../lib/byline';
import { decidePalette } from '../lib/decidePalette';
import type { Branding as BrandingType } from '../types/branding';
import type { Palette } from '../types/palette';
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

const metaGridContainer = (showAvatar: boolean) => css`
	display: grid;
	grid-template-rows: auto;

	${showAvatar
		? css`
				grid-template-columns: auto 1fr auto;
				grid-template-areas:
					'avatar byline comment-count'
					'avatar byline comment-count'
					'dateline dateline dateline';
		  `
		: css`
				grid-template-columns: 1fr auto;
				grid-template-areas:
					'byline comment-count'
					'byline comment-count'
					'dateline dateline';
		  `}
`;

const MetaGridAvatar = ({ children }: { children: React.ReactNode }) => (
	<div
		css={css`
			grid-area: avatar;
			width: 140px;
			height: 140px;
			margin-top: 6px;
			margin-right: 10px;
			margin-bottom: 12px;
			margin-left: 0px;

			${until.leftCol} {
				grid-area: avatar;
				width: 60px;
				height: 60px;
				margin-top: 3px;
				margin-right: 10px;
				margin-bottom: 12px;
				margin-left: 0px;
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
			}
		`}
	>
		{children}
	</div>
);

const MetaGridCommentCount = ({
	children,
	palette,
	isPictureContent,
}: {
	children: React.ReactNode;
	palette: Palette;
	isPictureContent: boolean;
}) => (
	<div
		data-print-layout="hide"
		css={css`
			grid-area: comment-count;
			border-left: 1px solid ${palette.border.article};

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
			padding-left: 10px;
			padding-right: 10px;
		}

		${from.mobileLandscape} {
			padding-left: 20px;
			padding-right: 20px;
		}

		${from.phablet} {
			padding-left: 0px;
			padding-right: 0px;
		}

		padding-top: 2px;
	`;
};

const stretchLines = (isPictureContent: boolean) => css`
	display: block;

	${!isPictureContent && until.mobileLandscape} {
		margin-left: -20px;
		margin-right: -20px;
		width: auto;
	}

	${!isPictureContent && until.phablet} {
		margin-left: -10px;
		margin-right: -10px;
		width: auto;
	}
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

	const palette = decidePalette(format);

	const isPictureContent = format.design === ArticleDesign.Picture;
	// const isLiveBlog = format.design === ArticleDesign.LiveBlog;

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
					{format.theme === ArticleSpecial.Labs ? (
						<div>
							<StraightLines
								cssOverrides={stretchLines(isPictureContent)}
								count={1}
								color={border.primary}
							/>
							<div
								css={css`
									height: ${space[1]}px;
								`}
							/>
						</div>
					) : (
						''
					)}

					<div css={metaGridContainer(!!avatarUrl)}>
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
								palette={palette}
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
								cssOverrides={[
									stretchLines(isPictureContent),
									css`
										margin-bottom: 10px;
									`,
								]}
								count={1}
								color={palette.border.article}
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
