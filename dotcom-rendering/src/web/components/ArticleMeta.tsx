import { css } from '@emotion/react';
import {
	between,
	from,
	until,
	border,
	space,
} from '@guardian/source-foundations';
import { ArticleDisplay, ArticleDesign, ArticleSpecial } from '@guardian/libs';
import type { ArticleFormat } from '@guardian/libs';

import { Contributor } from '@root/src/web/components/Contributor';
import { Avatar } from '@root/src/web/components/Avatar';
import { Counts } from '@root/src/web/components/Counts';
import { Branding } from '@root/src/web/components/Branding';
import { Lines } from '@guardian/source-react-components-development-kitchen';
import { ShareIcons } from './ShareIcons';
import { Dateline } from './Dateline';
import { interactiveLegacyClasses } from '../layouts/lib/interactiveLegacyStyling';

type Props = {
	format: ArticleFormat;
	palette: Palette;
	pageId: string;
	webTitle: string;
	author: AuthorType;
	tags: TagType[];
	primaryDateline: string;
	secondaryDateline: string;
	branding?: Branding;
};

const meta = css`
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

const metaFlex = css`
	margin-bottom: 6px;
	display: flex;
	justify-content: space-between;
	flex-wrap: wrap;
`;

const stretchLines = css`
	${until.phablet} {
		margin-left: -20px;
		margin-right: -20px;
	}
	${until.mobileLandscape} {
		margin-left: -10px;
		margin-right: -10px;
	}
`;

const metaBorderTopStandfirstStyling = css`
	${until.desktop} {
		border-top: 1px solid rgba(255, 255, 255, 0.4);
	}
`;

const metaExtras = (palette: Palette) => css`
	border-top: 1px solid ${palette.border.article};
	flex-grow: 1;
	padding-top: 6px;

	${until.phablet} {
		margin-left: -20px;
		margin-right: -20px;
		padding-left: 20px;
		padding-right: 20px;
	}

	${until.mobileLandscape} {
		margin-left: -10px;
		margin-right: -10px;
		padding-left: 10px;
		padding-right: 10px;
	}

	${between.leftCol.and.wide} {
		padding-bottom: 6px;
	}
`;

const metaNumbers = (palette: Palette) => css`
	border-top: 1px solid ${palette.border.article};
	display: flex;
	flex-grow: 1;

	justify-content: flex-end;
	${between.leftCol.and.wide} {
		justify-content: flex-start;
	}

	${until.phablet} {
		margin-left: -20px;
		margin-right: -20px;
		padding-left: 20px;
		padding-right: 20px;
	}

	${until.mobileLandscape} {
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
				default:
					return defaultMargins;
			}
		}
	}
};

const getBylineImageUrl = (tags: TagType[]) => {
	const contributorTag = tags.find((tag) => tag.type === 'Contributor');
	return contributorTag && contributorTag.bylineImageUrl;
};

const getAuthorName = (tags: TagType[]) => {
	const contributorTag = tags.find((tag) => tag.type === 'Contributor');
	return contributorTag && contributorTag.title;
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
					return false;
				default:
					return true;
			}
		}
	}
};

const AvatarContainer = ({ children }: { children: React.ReactNode }) => (
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
	palette,
	pageId,
	webTitle,
	author,
	tags,
	primaryDateline,
	secondaryDateline,
}: Props) => {
	const bylineImageUrl = getBylineImageUrl(tags);
	const authorName = getAuthorName(tags);

	const showAvatarFromAuthor = () => {
		if (
			author.byline === undefined ||
			!author.byline ||
			author.byline === ''
		) {
			return false;
		}
		return true;
	};

	const onlyOneContributor: boolean =
		tags.filter((tag) => tag.type === 'Contributor').length === 1;

	const showAvatar =
		onlyOneContributor &&
		showAvatarFromAuthor() &&
		shouldShowAvatar(format);
	const isInteractive = format.design === ArticleDesign.Interactive;
	return (
		<div
			className={
				isInteractive ? interactiveLegacyClasses.metaContainer : ''
			}
			css={metaContainer(format)}
		>
			<div css={meta}>
				{branding && <Branding branding={branding} palette={palette} />}
				{format.theme === ArticleSpecial.Labs ? (
					<div css={stretchLines}>
						<Lines
							count={1}
							effect="straight"
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
						{showAvatar && bylineImageUrl && (
							<AvatarContainer>
								<Avatar
									imageSrc={bylineImageUrl}
									imageAlt={authorName || 'Author image'}
									palette={palette}
								/>
							</AvatarContainer>
						)}

						<div>
							{shouldShowContributor(format) && (
								<Contributor
									author={author}
									tags={tags}
									format={format}
									palette={palette}
								/>
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
					<div
						className={
							isInteractive
								? interactiveLegacyClasses.shareIcons
								: ''
						}
						css={[
							metaExtras(palette),
							format.design === ArticleDesign.LiveBlog &&
								css(
									metaBorderTopStandfirstStyling,
									metaExtrasLiveBlog,
								),
						]}
					>
						<ShareIcons
							pageId={pageId}
							webTitle={webTitle}
							palette={palette}
							format={format}
							displayIcons={['facebook', 'twitter', 'email']}
							size="medium"
							context="ArticleMeta"
						/>
					</div>
					<div
						css={[
							metaNumbers(palette),
							format.design === ArticleDesign.LiveBlog &&
								css(
									metaBorderTopStandfirstStyling,
									metaNumbersExtrasLiveBlog,
								),
						]}
					>
						<Counts format={format}>
							{/* The meta-number css is needed by Counts.tsx */}
							<div
								className="meta-number"
								id="share-count-root"
							/>
							<div
								className="meta-number"
								id="comment-count-root"
							/>
						</Counts>
					</div>
				</div>
			</div>
		</div>
	);
};
