import React from 'react';
import { css } from 'emotion';

import { border } from '@guardian/src-foundations/palette';
import { from } from '@guardian/src-foundations/mq';

import TwitterIconPadded from '@frontend/static/icons/twitter-padded.svg';
import FacebookIcon from '@frontend/static/icons/facebook.svg';
import EmailIcon from '@frontend/static/icons/email.svg';
import LinkedInIcon from '@frontend/static/icons/linked-in.svg';
import PinterestIcon from '@frontend/static/icons/pinterest.svg';
import WhatsAppIcon from '@frontend/static/icons/whatsapp.svg';
import MessengerIcon from '@frontend/static/icons/messenger.svg';

import { Hide } from './Hide';

type Props = {
	pageId: string;
	webTitle: string;
	displayIcons: SharePlatform[];
	palette: Palette;
};

const ulStyles = css`
	float: left;
	${from.wide} {
		flex: auto;
	}
`;

const liStyles = css`
	padding-right: 3px;
	float: left;
	min-width: 32px;
	cursor: pointer;
`;

const iconStyles = (palette: Palette) => css`
	border: 1px solid ${border.secondary};
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
	min-width: 32px;
	max-width: 100%;
	width: auto;
	height: 32px;
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
}: Props) => {
	return (
		<ul className={ulStyles}>
			{displayIcons.includes('facebook') && (
				<li className={liStyles} key="facebook">
					<a
						href={`https://www.facebook.com/dialog/share?app_id=202314643182694&href=${encodeUrl(
							pageId,
						)}&CMP=share_btn_fb`}
						role="button"
						aria-label="Share on Facebook"
						target="_blank"
						data-ignore="global-link-styling"
					>
						<span className={iconStyles(palette)}>
							<FacebookIcon />
						</span>
					</a>
				</li>
			)}

			{displayIcons.includes('twitter') && (
				<li className={liStyles} key="twitter">
					<a
						href={`https://twitter.com/intent/tweet?text=${encodeTitle(
							webTitle,
						)}&url=${encodeUrl(pageId)}&CMP=share_btn_tw`}
						role="button"
						aria-label="Share on Twitter"
						target="_blank"
						data-ignore="global-link-styling"
					>
						<span className={iconStyles(palette)}>
							<TwitterIconPadded />
						</span>
					</a>
				</li>
			)}

			{displayIcons.includes('email') && (
				<li className={liStyles} key="email">
					<a
						href={`mailto:?subject=${encodeTitle(
							webTitle,
						)}&body=${encodeUrl(pageId)}&CMP=share_btn_link`}
						role="button"
						aria-label="Share via Email"
						target="_blank"
						data-ignore="global-link-styling"
					>
						<span className={iconStyles(palette)}>
							<EmailIcon />
						</span>
					</a>
				</li>
			)}

			{displayIcons.includes('linkedIn') && (
				<li className={liStyles} key="linkedIn">
					<a
						href={`http://www.linkedin.com/shareArticle?title=${encodeTitle(
							webTitle,
						)}&mini=true&url=${encodeUrl(pageId)}`}
						role="button"
						aria-label="Share on LinkedIn"
						target="_blank"
						data-ignore="global-link-styling"
					>
						<span className={iconStyles(palette)}>
							<LinkedInIcon />
						</span>
					</a>
				</li>
			)}

			{displayIcons.includes('pinterest') && (
				<li className={liStyles} key="pinterest">
					<a
						href={`http://www.pinterest.com/pin/find/?url=${encodeUrl(
							pageId,
						)}`}
						role="button"
						aria-label="Share on Pinterest"
						target="_blank"
						data-ignore="global-link-styling"
					>
						<span className={iconStyles(palette)}>
							<PinterestIcon />
						</span>
					</a>
				</li>
			)}

			{displayIcons.includes('whatsApp') && (
				<Hide when="above" breakpoint="phablet">
					<li className={liStyles} key="whatsApp">
						<a
							href={`whatsapp://send?text="${encodeTitle(
								webTitle,
							)}" ${encodeUrl(pageId)}&CMP=share_btn_wa`}
							role="button"
							aria-label="Share on WhatsApp"
							target="_blank"
							data-ignore="global-link-styling"
						>
							<span className={iconStyles(palette)}>
								<WhatsAppIcon />
							</span>
						</a>
					</li>
				</Hide>
			)}

			{displayIcons.includes('messenger') && (
				<Hide when="above" breakpoint="phablet">
					<li className={liStyles} key="messenger">
						<a
							href={`fb-messenger://share?link=${encodeUrl(
								pageId,
							)}&app_id=180444840287&CMP=share_btn_me`}
							role="button"
							aria-label="Share on Messanger>"
							target="_blank"
							data-ignore="global-link-styling"
						>
							<span className={iconStyles(palette)}>
								<MessengerIcon />
							</span>
						</a>
					</li>
				</Hide>
			)}
		</ul>
	);
};
