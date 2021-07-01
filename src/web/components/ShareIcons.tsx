import { css } from '@emotion/react';

import { from } from '@guardian/src-foundations/mq';

import TwitterIconPadded from '@frontend/static/icons/twitter-padded.svg';
import FacebookIcon from '@frontend/static/icons/facebook.svg';
import EmailIcon from '@frontend/static/icons/email.svg';
import LinkedInIcon from '@frontend/static/icons/linked-in.svg';
import WhatsAppIcon from '@frontend/static/icons/whatsapp.svg';
import MessengerIcon from '@frontend/static/icons/messenger.svg';

import { Hide } from './Hide';

type Props = {
	pageId: string;
	webTitle: string;
	displayIcons: SharePlatform[];
	palette: Palette;
	size: ShareIconSize;
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

const iconStyles = ({
	palette,
	size,
}: {
	palette: Palette;
	size: ShareIconSize;
}) => css`
	border: 1px solid ${palette.border.article};
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
	fill: ${palette.fill.shareIcon};

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

	:hover {
		background-color: ${palette.fill.shareIcon};
		border-color: ${palette.fill.shareIcon};
		fill: white;
	}
`;

const encodeUrl = (pageId: string): string => {
	return encodeURIComponent(`https://www.theguardian.com/${pageId}`);
};

const encodeTitle = (webTitle: string): string => {
	return encodeURIComponent(webTitle.replace(/Leave.EU/gi, 'Leave. EU'));
};
export const ShareIcons = ({
	pageId,
	webTitle,
	displayIcons,
	palette,
	size,
}: Props) => {
	return (
		<ul css={ulStyles}>
			{displayIcons.includes('facebook') && (
				<li css={liStyles(size)} key="facebook">
					<a
						href={`https://www.facebook.com/dialog/share?app_id=180444840287&href=${encodeUrl(
							pageId,
						)}&CMP=share_btn_fb`}
						role="button"
						aria-label="Share on Facebook"
						target="_blank"
						rel="noreferrer"
						data-ignore="global-link-styling"
					>
						<span css={iconStyles({ palette, size })}>
							<FacebookIcon />
						</span>
					</a>
				</li>
			)}

			{displayIcons.includes('twitter') && (
				<li css={liStyles(size)} key="twitter">
					<a
						href={`https://twitter.com/intent/tweet?text=${encodeTitle(
							webTitle,
						)}&url=${encodeUrl(pageId)}&CMP=share_btn_tw`}
						role="button"
						aria-label="Share on Twitter"
						target="_blank"
						rel="noreferrer"
						data-ignore="global-link-styling"
					>
						<span css={iconStyles({ palette, size })}>
							<TwitterIconPadded />
						</span>
					</a>
				</li>
			)}

			{displayIcons.includes('email') && (
				<li css={liStyles(size)} key="email">
					<a
						href={`mailto:?subject=${encodeTitle(
							webTitle,
						)}&body=${encodeUrl(pageId)}&CMP=share_btn_link`}
						role="button"
						aria-label="Share via Email"
						target="_blank"
						data-ignore="global-link-styling"
					>
						<span css={iconStyles({ palette, size })}>
							<EmailIcon />
						</span>
					</a>
				</li>
			)}

			{displayIcons.includes('linkedIn') && (
				<li css={liStyles(size)} key="linkedIn">
					<a
						href={`http://www.linkedin.com/shareArticle?title=${encodeTitle(
							webTitle,
						)}&mini=true&url=${encodeUrl(pageId)}`}
						role="button"
						aria-label="Share on LinkedIn"
						target="_blank"
						rel="noreferrer"
						data-ignore="global-link-styling"
					>
						<span css={iconStyles({ palette, size })}>
							<LinkedInIcon />
						</span>
					</a>
				</li>
			)}

			{displayIcons.includes('whatsApp') && (
				<Hide when="above" breakpoint="phablet" el="li" key="whatsApp">
					<span css={[liStyles(size), topMarginStlyes]}>
						<a
							href={`whatsapp://send?text="${encodeTitle(
								webTitle,
							)}" ${encodeUrl(pageId)}&CMP=share_btn_wa`}
							role="button"
							aria-label="Share on WhatsApp"
							target="_blank"
							rel="noreferrer"
							data-ignore="global-link-styling"
						>
							<span css={iconStyles({ palette, size })}>
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
							href={`fb-messenger://share?link=${encodeUrl(
								pageId,
							)}&app_id=180444840287&CMP=share_btn_me`}
							role="button"
							aria-label="Share on Messenger>"
							target="_blank"
							rel="noreferrer"
							data-ignore="global-link-styling"
						>
							<span css={iconStyles({ palette, size })}>
								<MessengerIcon />
							</span>
						</a>
					</span>
				</Hide>
			)}
		</ul>
	);
};
