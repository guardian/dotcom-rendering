import { css } from '@emotion/react';
import { body, palette, text, textSans } from '@guardian/source-foundations';
import { neutralBorder, pillarPalette_DO_NOT_USE } from '../lib/pillars';
import type { BaseLinkType } from '../model/extract-nav';
import CommentIcon from '../static/icons/comment.svg';
import { ShareIcons } from './ShareIcons.amp';

const guardianLines = (pillar: ArticleTheme) => css`
	background-image: repeating-linear-gradient(
		to bottom,
		${neutralBorder(pillar)},
		${neutralBorder(pillar)} 1px,
		transparent 1px,
		transparent 4px
	);
	background-repeat: repeat-x;
	background-position: top;
	background-size: 1px 13px;
	padding-top: 18px;
	margin-top: 12px;
`;

const linkStyle = (pillar: ArticleTheme) => css`
	position: relative;
	padding-left: 5px;
	padding-right: 6px;
	text-decoration: none;
	color: ${pillarPalette_DO_NOT_USE[pillar].main};
	${textSans.small()};
	:after {
		content: '/';
		${textSans.small()};
		position: absolute;
		pointer-events: none;
		top: 0;
		right: -3px;
		color: ${palette.neutral[86]};
	}
`;

const itemStyle = css`
	display: inline-block;

	:last-of-type > a::after {
		content: '';
	}
`;

const keywordListStyle = (pillar: ArticleTheme) => css`
	display: block;
	margin-left: -6px;
	padding-top: 6px;
	padding-bottom: 12px;
	border-bottom: 1px solid ${neutralBorder(pillar)};
	margin-bottom: 6px;
`;

const sectionLinkStyle = (pillar: ArticleTheme) => css`
	position: relative;
	padding-left: 5px;
	padding-right: 6px;
	text-decoration: none;
	color: ${pillarPalette_DO_NOT_USE[pillar].main};
	${body.medium()};
	:after {
		content: '/';
		${body.medium()};
		position: absolute;
		pointer-events: none;
		top: 0;
		right: -3px;
		color: ${palette.neutral[86]};
	}
`;

const sectionListStyle = css`
	display: block;
	margin-left: -6px;
`;

const labelStyle = css`
	${textSans.xxsmall()};
	color: ${text.supporting};
	display: block;
	margin-bottom: -3px;
`;

const siteLinks = css`
	display: flex;
	justify-content: space-between;
`;

const siteLinkStyle = css`
	${textSans.small()};
	font-weight: bold;
	text-decoration: none;
	color: ${palette.neutral[7]};
	text-align: right;
`;

const commentIcon = css`
	vertical-align: middle;
	margin-bottom: -5px;
`;

const shareIcons = css`
	padding-bottom: 30px;
`;

type Props = {
	pillar: ArticleTheme;
	sections: BaseLinkType[];
	keywords: BaseLinkType[];
	sharingURLs: {
		[K in SharePlatform]?: {
			url: string;
			userMessage: string;
		};
	};
	pageID: string;
	isCommentable: boolean;
	guardianBaseURL: string;
};

export const SubMeta = ({
	pillar,
	sections,
	keywords,
	sharingURLs,
	pageID,
	isCommentable,
	guardianBaseURL,
}: Props) => {
	const sectionListItems = sections.map((link) => (
		<li css={itemStyle} key={link.url}>
			<a
				css={sectionLinkStyle(pillar)}
				href={`${guardianBaseURL}${link.url}`}
			>
				{link.title}
			</a>
		</li>
	));

	const keywordListItems = keywords.map((link) => (
		<li css={itemStyle} key={link.url}>
			<a css={linkStyle(pillar)} href={`${guardianBaseURL}${link.url}`}>
				{link.title}
			</a>
		</li>
	));

	return (
		<>
			<div css={guardianLines(pillar)}>
				<span css={labelStyle}>Topics</span>
				<ul css={sectionListStyle}>{sectionListItems}</ul>
				<ul css={keywordListStyle(pillar)}>{keywordListItems}</ul>
			</div>
			<ul css={shareIcons}>
				<ShareIcons
					sharingUrls={sharingURLs}
					pillar={pillar}
					displayIcons={[
						'facebook',
						'twitter',
						'email',
						'linkedIn',
						'whatsApp',
						'messenger',
					]}
				/>
			</ul>
			{/* TODO link to actual (non-AMP) site here. Also handle comment count behaviour. */}
			<div css={[guardianLines(pillar), siteLinks]}>
				{isCommentable && (
					<a
						css={siteLinkStyle}
						href={`${guardianBaseURL}/${pageID}#comments`}
					>
						<CommentIcon css={commentIcon} /> View comments
					</a>
				)}
				<a css={siteLinkStyle} href={`${guardianBaseURL}/${pageID}`}>
					View on theguardian.com
				</a>
			</div>
		</>
	);
};
