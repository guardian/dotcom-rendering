import { css } from '@emotion/react';
import { ArticleDesign } from '@guardian/libs';
import { from, until } from '@guardian/source-foundations';
import { palette as themePalette } from '../palette';
import EmailIcon from '../static/icons/email.svg';
import FacebookIcon from '../static/icons/facebook.svg';
import LinkedInIcon from '../static/icons/linked-in.svg';
import MessengerIcon from '../static/icons/messenger.svg';
import TwitterIconPadded from '../static/icons/twitter-padded.svg';
import WhatsAppIcon from '../static/icons/whatsapp.svg';
import { Hide } from './Hide';

type Context = 'ArticleMeta' | 'LiveBlock' | 'SubMeta';
type ShareIconSize = 'small' | 'medium';

type Props = {
	pageId: string;
	blockId?: string;
	webTitle: string;
	displayIcons: SharePlatform[];
	format: ArticleFormat;
	size: ShareIconSize;
	context: Context;
};

const ulStyles = css`
	float: left;
	${from.wide} {
		flex: auto;
	}
`;

const liStyles = (size: ShareIconSize) => css`
	padding-right: 3px;
	float: left;
	min-width: ${size === 'small' ? '23px' : '32px'};
	cursor: pointer;
`;

const topMarginStlyes = css`
	margin-top: 3px;
`;

const decideIconColor = (format: ArticleFormat, context: Context) => {
	if (format.design === ArticleDesign.LiveBlog) {
		if (context === 'ArticleMeta') {
			return css`
				fill: ${themePalette('--share-icon-blog-fill')};
				${until.desktop} {
					fill: ${themePalette('--standfirst-text')};
				}
			`;
		}

		if (context === 'SubMeta') {
			return css`
				fill: ${themePalette('--share-icon-blog-fill')};
			`;
		}
	}
	if (
		format.design === ArticleDesign.DeadBlog &&
		(context === 'SubMeta' || context === 'ArticleMeta')
	) {
		return css`
			fill: ${themePalette('--share-icon-blog-fill')};
		`;
	}
	return css`
		fill: ${themePalette('--share-icon-fill')};
	`;
};

const decideIconColorOnHover = (format: ArticleFormat, context: Context) => {
	if (
		(format.design === ArticleDesign.LiveBlog ||
			format.design === ArticleDesign.DeadBlog) &&
		(context === 'ArticleMeta' || context === 'SubMeta')
	) {
		return css`
			:hover {
				background-color: ${themePalette('--share-icon-blog-fill')};
				border-color: ${themePalette('--share-icon-blog-fill')};
				fill: white;
			}
		`;
	}
	if (format.design === ArticleDesign.Picture) {
		return css`
			:hover {
				background-color: ${themePalette('--share-icon-fill')};
				border-color: ${themePalette('--share-icon-fill')};
				fill: black;
			}
		`;
	}
	return css`
		:hover {
			background-color: ${themePalette('--share-icon-fill')};
			border-color: ${themePalette('--share-icon-fill')};
			fill: white;
		}
	`;
};

const iconStyles = (size: ShareIconSize) => css`
	border: 1px solid ${themePalette('--article-border')};
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
	min-width: ${size === 'small' ? '23px' : '32px'};
	max-width: 100%;
	width: auto;
	height: ${size === 'small' ? '23px' : '32px'};
	border-radius: 50%;
	display: inline-block;
	vertical-align: middle;
	position: relative;
	box-sizing: content-box;

	svg {
		height: 88%;
		width: 88%;
		top: 0;
		bottom: 0;
		right: 0;
		left: 0;
		margin: auto;
		position: absolute;
	}
`;

const getUrl = ({
	pageId,
	CMP,
	blockId,
}: {
	pageId: string;
	CMP?: string;
	blockId?: string;
}) => {
	const searchParams = new URLSearchParams({});
	if (CMP) searchParams.append('CMP', CMP);
	if (blockId) searchParams.append('page', `with:block-${blockId}`);

	const blockHash = blockId ? `#block-${blockId}` : '';
	return new URL(
		`${pageId}?${searchParams.toString()}${blockHash}`,
		'https://www.theguardian.com/',
	).href;
};

const encodeTitle = (webTitle: string): string =>
	webTitle.replace(/Leave.EU/gi, 'Leave. EU');

export const ShareIcons = ({
	pageId,
	blockId,
	webTitle,
	displayIcons,
	format,
	size,
	context,
}: Props) => {
	return (
		<ul css={ulStyles}>
			{displayIcons.includes('facebook') && (
				<li css={liStyles(size)} key="facebook">
					<a
						href={`https://www.facebook.com/dialog/share?${new URLSearchParams(
							{
								app_id: '180444840287',
								href: getUrl({
									pageId,
									blockId,
									CMP: 'share_btn_fb',
								}),
							},
						).toString()}`}
						role="button"
						aria-label="Share on Facebook"
						target="_blank"
						rel="noreferrer"
						data-ignore="global-link-styling"
					>
						<span
							css={[
								iconStyles(size),
								decideIconColor(format, context),
								decideIconColorOnHover(format, context),
							]}
						>
							<FacebookIcon />
						</span>
					</a>
				</li>
			)}

			{displayIcons.includes('twitter') && (
				<li css={liStyles(size)} key="twitter">
					<a
						href={`https://twitter.com/intent/tweet?${new URLSearchParams(
							{
								text: encodeTitle(webTitle),
								url: getUrl({
									pageId,
									blockId,
									CMP: 'share_btn_tw',
								}),
							},
						).toString()}`}
						role="button"
						aria-label="Share on Twitter"
						target="_blank"
						rel="noreferrer"
						data-ignore="global-link-styling"
					>
						<span
							css={[
								iconStyles(size),
								decideIconColor(format, context),
								decideIconColorOnHover(format, context),
							]}
						>
							<TwitterIconPadded />
						</span>
					</a>
				</li>
			)}

			{displayIcons.includes('email') && (
				<li css={liStyles(size)} key="email">
					<a
						href={`mailto:?${new URLSearchParams({
							subject: encodeTitle(webTitle),
							body: getUrl({
								pageId,
								blockId,
								CMP: 'share_btn_link',
							}),
						})
							.toString()
							.replace(/\+/g, '%20')}`}
						role="button"
						aria-label="Share via Email"
						target="_blank"
						rel="noreferrer"
						data-ignore="global-link-styling"
					>
						<span
							css={[
								iconStyles(size),
								decideIconColor(format, context),
								decideIconColorOnHover(format, context),
							]}
						>
							<EmailIcon />
						</span>
					</a>
				</li>
			)}

			{displayIcons.includes('linkedIn') && (
				<li css={liStyles(size)} key="linkedIn">
					<a
						href={`http://www.linkedin.com/shareArticle?=${new URLSearchParams(
							{
								title: encodeTitle(webTitle),
								mini: 'true',
								// TODO?: add &CMP=share_btn_*
								url: getUrl({ pageId, blockId }),
							},
						).toString()}`}
						role="button"
						aria-label="Share on LinkedIn"
						target="_blank"
						rel="noreferrer"
						data-ignore="global-link-styling"
					>
						<span
							css={[
								iconStyles(size),
								decideIconColor(format, context),
								decideIconColorOnHover(format, context),
							]}
						>
							<LinkedInIcon />
						</span>
					</a>
				</li>
			)}

			{displayIcons.includes('whatsApp') && (
				<Hide when="above" breakpoint="phablet" el="li" key="whatsApp">
					<span css={[liStyles(size), topMarginStlyes]}>
						<a
							href={`whatsapp://send?${new URLSearchParams({
								text: [
									encodeTitle(webTitle),
									getUrl({
										pageId,
										blockId,
										CMP: 'share_btn_wa',
									}),
								].join(' '),
							}).toString()}`}
							role="button"
							aria-label="Share on WhatsApp"
							target="_blank"
							rel="noreferrer"
							data-ignore="global-link-styling"
						>
							<span
								css={[
									iconStyles(size),
									decideIconColor(format, context),
									decideIconColorOnHover(format, context),
								]}
							>
								<WhatsAppIcon />
							</span>
						</a>
					</span>
				</Hide>
			)}

			{displayIcons.includes('messenger') && (
				<Hide when="above" breakpoint="phablet" el="li" key="messenger">
					<span css={[liStyles(size), topMarginStlyes]}>
						<a
							href={`fb-messenger://share?${new URLSearchParams({
								link: getUrl({
									pageId,
									blockId,
									CMP: 'share_btn_me',
								}),
								app_id: '180444840287',
							}).toString()}`}
							role="button"
							aria-label="Share on Messenger"
							target="_blank"
							rel="noreferrer"
							data-ignore="global-link-styling"
						>
							<span
								css={[
									iconStyles(size),
									decideIconColor(format, context),
									decideIconColorOnHover(format, context),
								]}
							>
								<MessengerIcon />
							</span>
						</a>
					</span>
				</Hide>
			)}
		</ul>
	);
};
