import React from 'react';
import { css, cx } from 'emotion';

import { pillarPalette_DO_NOT_USE, neutralBorder } from '@root/src/lib/pillars';
import { text } from '@guardian/src-foundations/palette';
import { palette } from '@guardian/src-foundations';
import { textSans, body } from '@guardian/src-foundations/typography';
import { ShareIcons } from '@root/src/amp/components/ShareIcons';
import CommentIcon from '@frontend/static/icons/comment.svg';

const guardianLines = (pillar: Theme) => css`
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

const linkStyle = (pillar: Theme) => css`
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

const keywordListStyle = (pillar: Theme) => css`
	display: block;
	margin-left: -6px;
	padding-top: 6px;
	padding-bottom: 12px;
	border-bottom: 1px solid ${neutralBorder(pillar)};
	margin-bottom: 6px;
`;

const sectionLinkStyle = (pillar: Theme) => css`
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
	${textSans.xsmall()};
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

export const SubMeta: React.FC<{
	pillar: Theme;
	sections: SimpleLinkType[];
	keywords: SimpleLinkType[];
	sharingURLs: {
		[K in SharePlatform]?: {
			url: string;
			userMessage: string;
		};
	};
	pageID: string;
	isCommentable: boolean;
	guardianBaseURL: string;
}> = ({
	pillar,
	sections,
	keywords,
	sharingURLs,
	pageID,
	isCommentable,
	guardianBaseURL,
}) => {
	const sectionListItems = sections.map((link) => (
		<li className={itemStyle} key={link.url}>
			<a
				className={sectionLinkStyle(pillar)}
				href={`${guardianBaseURL}${link.url}`}
			>
				{link.title}
			</a>
		</li>
	));

	const keywordListItems = keywords.map((link) => (
		<li className={itemStyle} key={link.url}>
			<a
				className={linkStyle(pillar)}
				href={`${guardianBaseURL}${link.url}`}
			>
				{link.title}
			</a>
		</li>
	));

	return (
		<>
			<div className={guardianLines(pillar)}>
				<span className={labelStyle}>Topics</span>
				<ul className={sectionListStyle}>{sectionListItems}</ul>
				<ul className={keywordListStyle(pillar)}>{keywordListItems}</ul>
			</div>
			<ShareIcons
				className={shareIcons}
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
			{/* TODO link to actual (non-AMP) site here. Also handle comment count behaviour. */}
			<div className={cx(guardianLines(pillar), siteLinks)}>
				{isCommentable && (
					<a
						className={siteLinkStyle}
						href={`${guardianBaseURL}/${pageID}#comments`}
					>
						<CommentIcon className={commentIcon} /> View comments
					</a>
				)}
				<a
					className={siteLinkStyle}
					href={`${guardianBaseURL}/${pageID}`}
				>
					View on theguardian.com
				</a>
			</div>
		</>
	);
};
