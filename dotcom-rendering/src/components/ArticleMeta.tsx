import { css } from '@emotion/react';
import type { ArticleFormat } from '@guardian/libs';
import { ArticleDesign, ArticleDisplay, ArticleSpecial } from '@guardian/libs';
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
import { Avatar } from './Avatar';
import { Branding } from './Branding.importable';
import { CommentCount } from './CommentCount.importable';
import { useConfig } from './ConfigContext';
import { Contributor } from './Contributor';
import { Dateline } from './Dateline';
import { Island } from './Island';
import { SendAMessage } from './SendAMessage.importable';
import { ShareIcons } from './ShareIcons';

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

const meta = (format: ArticleFormat) => {
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

const metaFlex = css`
	margin-bottom: 6px;
	display: flex;
	justify-content: space-between;
	flex-wrap: wrap;
`;

const stretchLines = css`
	display: block;

	${until.phablet} {
		margin-left: -20px;
		margin-right: -20px;
	}
	${until.mobileLandscape} {
		margin-left: -10px;
		margin-right: -10px;
	}
`;

const borderColourWhenBackgroundDark = css`
	${until.desktop} {
		border-top: 1px solid rgba(255, 255, 255, 0.4);
	}
`;

const metaExtras = (palette: Palette, isPictureContent: boolean) => css`
	border-top: 1px solid ${palette.border.article};
	flex-grow: 1;
	padding-top: 6px;

	${!isPictureContent && until.phablet} {
		margin-left: -20px;
		margin-right: -20px;
		padding-left: 20px;
		padding-right: 20px;
	}

	${!isPictureContent && until.phablet} {
		margin-left: -10px;
		margin-right: -10px;
		padding-left: 10px;
		padding-right: 10px;
	}

	${between.leftCol.and.wide} {
		padding-bottom: 6px;
	}
`;

const metaNumbers = (palette: Palette, isPictureContent: boolean) => css`
	border-top: 1px solid ${palette.border.article};
	display: flex;
	flex-grow: 1;

	justify-content: flex-end;
	${between.leftCol.and.wide} {
		justify-content: flex-start;
	}

	${!isPictureContent && until.phablet} {
		margin-left: -20px;
		margin-right: -20px;
		padding-left: 20px;
		padding-right: 20px;
	}

	${!isPictureContent && until.phablet} {
		margin-left: -10px;
		margin-right: -10px;
		padding-left: 10px;
		padding-right: 10px;
	}
`;

const metaContainer = (format: ArticleFormat) => {
	const defaultMargins = css`
		${until.phablet} {
			margin-left: -20px;
			margin-right: -20px;
		}
		${until.mobileLandscape} {
			margin-left: -10px;
			margin-right: -10px;
		}
	`;
	switch (format.display) {
		case ArticleDisplay.Immersive:
		case ArticleDisplay.Showcase:
		case ArticleDisplay.NumberedList:
		case ArticleDisplay.Standard: {
			switch (format.design) {
				case ArticleDesign.PhotoEssay:
					return format.theme === ArticleSpecial.Labs
						? defaultMargins
						: css`
								${until.phablet} {
									margin-left: -20px;
									margin-right: -20px;
								}
								${until.mobileLandscape} {
									margin-left: -10px;
									margin-right: -10px;
								}
								${from.leftCol} {
									margin-left: 20px;
								}
								${from.wide} {
									margin-left: 40px;
								}
						  `;
				case ArticleDesign.LiveBlog:
				case ArticleDesign.DeadBlog: {
					return '';
				}
				default:
					return defaultMargins;
			}
		}
	}
};

const shouldShowAvatar = (format: ArticleFormat) => {
	switch (format.display) {
		case ArticleDisplay.Immersive:
			return false;
		case ArticleDisplay.Showcase:
		case ArticleDisplay.NumberedList:
		case ArticleDisplay.Standard: {
			switch (format.design) {
				case ArticleDesign.Feature:
				case ArticleDesign.Review:
				case ArticleDesign.Recipe:
				case ArticleDesign.Interview:
					return true;
				default:
					return false;
			}
		}
		default:
			return false;
	}
};

const shouldShowContributor = (format: ArticleFormat) => {
	switch (format.display) {
		case ArticleDisplay.NumberedList:
			return true;
		case ArticleDisplay.Immersive:
			return false;
		case ArticleDisplay.Showcase:
		case ArticleDisplay.Standard: {
			switch (format.design) {
				case ArticleDesign.Comment:
				case ArticleDesign.Editorial:
				case ArticleDesign.Analysis:
					return false;
				default:
					return true;
			}
		}
		default:
			return false;
	}
};

const MetaAvatarContainer = ({ children }: { children: React.ReactNode }) => (
	<div
		css={css`
			width: 140px;
			height: 140px;
			margin-top: 6px;
			margin-right: 10px;
			margin-bottom: 12px;
			margin-left: 0px;

			${until.leftCol} {
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

const RowBelowLeftCol = ({ children }: { children: React.ReactNode }) => (
	<div
		css={css`
			display: flex;
			flex-direction: column;

			${until.leftCol} {
				flex-direction: row;
			}
		`}
	>
		{children}
	</div>
);

const metaExtrasLiveBlog = css`
	${until.phablet} {
		margin-right: 0;
	}
`;

const metaNumbersExtrasLiveBlog = css`
	${until.phablet} {
		margin-left: 0;
	}
`;

export const ArticleMeta = ({
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

	const { renderingTarget } = useConfig();

	return (
		<div
			className={
				isInteractive ? interactiveLegacyClasses.metaContainer : ''
			}
			css={metaContainer(format)}
		>
			<div css={meta(format)}>
				{branding && (
					<Island deferUntil="visible">
						<Branding
							branding={branding}
							palette={palette}
							format={format}
						/>
					</Island>
				)}
				{format.theme === ArticleSpecial.Labs ? (
					<div>
						<StraightLines
							cssOverrides={stretchLines}
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
				<RowBelowLeftCol>
					<>
						{!!avatarUrl && (
							<MetaAvatarContainer>
								<Avatar
									src={avatarUrl}
									alt={authorName}
									format={format}
								/>
							</MetaAvatarContainer>
						)}

						<div>
							{shouldShowContributor(format) && !!byline && (
								<Contributor
									byline={byline}
									tags={tags}
									format={format}
								/>
							)}
							{messageUs &&
								format.design === ArticleDesign.LiveBlog && (
									<Island deferUntil="visible">
										<SendAMessage
											formFields={messageUs.formFields}
											formId={messageUs.formId}
											format={format}
											pageId={pageId}
										/>
									</Island>
								)}
							<Dateline
								primaryDateline={primaryDateline}
								secondaryDateline={secondaryDateline}
								format={format}
							/>
						</div>
					</>
				</RowBelowLeftCol>

				<div data-print-layout="hide" css={metaFlex}>
					{renderingTarget === 'Web' && (
						<div
							className={
								isInteractive
									? interactiveLegacyClasses.shareIcons
									: ''
							}
							css={[
								metaExtras(palette, isPictureContent),
								format.design === ArticleDesign.LiveBlog &&
									css(
										borderColourWhenBackgroundDark,
										metaExtrasLiveBlog,
									),
							]}
						>
							<ShareIcons
								pageId={pageId}
								webTitle={webTitle}
								format={format}
								displayIcons={['facebook', 'twitter', 'email']}
								size="medium"
								context="ArticleMeta"
							/>
						</div>
					)}
					<div
						className={
							isInteractive
								? interactiveLegacyClasses.shareAndCommentCounts
								: ''
						}
						css={[
							metaNumbers(palette, isPictureContent),
							format.design === ArticleDesign.LiveBlog &&
								css(
									borderColourWhenBackgroundDark,
									metaNumbersExtrasLiveBlog,
								),
						]}
					>
						<div
							css={css`
								display: flex;
								flex-direction: row;
								align-items: flex-start;
							`}
						>
							<div>
								{isCommentable && (
									<Island deferUntil="idle">
										<CommentCount
											discussionApiUrl={discussionApiUrl}
											shortUrlId={shortUrlId}
											format={format}
										/>
									</Island>
								)}
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};
