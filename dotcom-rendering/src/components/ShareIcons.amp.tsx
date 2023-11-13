import { css } from '@emotion/react';
import { visuallyHidden } from '@guardian/source-foundations';
import React from 'react';
import {
	neutralBorder,
	pillarMap,
	pillarPalette_DO_NOT_USE,
} from '../lib/pillars';
import EmailIcon from '../static/icons/email.svg';
import FacebookIcon from '../static/icons/facebook.svg';
import LinkedInIcon from '../static/icons/linked-in.svg';
import MessengerIcon from '../static/icons/messenger.svg';
import TwitterIconPadded from '../static/icons/twitter-padded.svg';
import WhatsAppIcon from '../static/icons/whatsapp.svg';

const pillarFill = pillarMap(
	(pillar) =>
		css`
			fill: ${pillarPalette_DO_NOT_USE[pillar].main};
		`,
);

const shareIconsListItem = css`
	padding: 0 3px 6px 0;
	display: inline-block;
	min-width: 32px;
`;

const shareIcon = (pillar: ArticleTheme) => css`
	border: 1px solid ${neutralBorder(pillar)};
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
		background-color: ${pillarPalette_DO_NOT_USE[pillar].main};
		border-color: ${pillarPalette_DO_NOT_USE[pillar].main};
		fill: white;
	}
`;

interface ShareListItemType {
	id: SharePlatform;
	Icon: React.ComponentType;
	url: string;
	userMessage: string;
	mobileOnly: boolean;
}

type Props = {
	sharingUrls: {
		[K in SharePlatform]?: {
			url: string;
			userMessage: string;
		};
	};
	displayIcons: SharePlatform[];
	pillar: ArticleTheme;
};

export const ShareIcons = ({ sharingUrls, displayIcons, pillar }: Props) => {
	const icons: { [K in SharePlatform]?: React.ComponentType } = {
		facebook: FacebookIcon,
		twitter: TwitterIconPadded,
		email: EmailIcon,
		linkedIn: LinkedInIcon,
		whatsApp: WhatsAppIcon,
		messenger: MessengerIcon,
	};

	const mobileOnlyIcons: SharePlatform[] = ['whatsApp', 'messenger'];

	const shareList = displayIcons.reduce((list: ShareListItemType[], id) => {
		const icon = icons[id];
		const sharingUrl = sharingUrls[id];

		if (icon && sharingUrl) {
			const listItem: ShareListItemType = {
				id,
				Icon: icon,
				mobileOnly: mobileOnlyIcons.includes(id),
				...sharingUrl,
			};
			list.push(listItem);
		}

		return list;
	}, []);

	return (
		<>
			{shareList.map((shareListItem) => {
				const { Icon, id, url, userMessage } = shareListItem;

				return (
					<li css={shareIconsListItem} key={`${id}Share`}>
						<a href={url} role="button">
							<span
								css={css`
									${visuallyHidden};
								`}
							>
								{userMessage}
							</span>
							<span css={[shareIcon(pillar), pillarFill[pillar]]}>
								<Icon />
							</span>
						</a>
					</li>
				);
			})}
		</>
	);
};
