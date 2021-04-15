import React from 'react';
import { css, cx } from 'emotion';
import TwitterIconPadded from '@frontend/static/icons/twitter-padded.svg';
import FacebookIcon from '@frontend/static/icons/facebook.svg';
import EmailIcon from '@frontend/static/icons/email.svg';
import LinkedInIcon from '@frontend/static/icons/linked-in.svg';
import WhatsAppIcon from '@frontend/static/icons/whatsapp.svg';
import MessengerIcon from '@frontend/static/icons/messenger.svg';
import { visuallyHidden } from '@guardian/src-foundations/accessibility';
import { pillarMap, pillarPalette, neutralBorder } from '@root/src/lib/pillars';

const pillarFill = pillarMap(
	(pillar) =>
		css`
			fill: ${pillarPalette[pillar].main};
		`,
);

const shareIconsListItem = css`
	padding: 0 3px 6px 0;
	display: inline-block;
	min-width: 32px;
`;

const shareIcon = (pillar: Theme) => css`
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
		background-color: ${pillarPalette[pillar].main};
		border-color: ${pillarPalette[pillar].main};
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

export const ShareIcons: React.FC<{
	sharingUrls: {
		[K in SharePlatform]?: {
			url: string;
			userMessage: string;
		};
	};
	displayIcons: SharePlatform[];
	pillar: Theme;
	className?: string;
}> = ({ sharingUrls, displayIcons, pillar, className }) => {
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
		<ul className={className}>
			{shareList.map((shareListItem) => {
				const { Icon, id, url, userMessage } = shareListItem;

				return (
					<li className={shareIconsListItem} key={`${id}Share`}>
						<a href={url} role="button">
							<span
								className={css`
									${visuallyHidden};
								`}
							>
								{userMessage}
							</span>
							<span
								className={cx(
									shareIcon(pillar),
									pillarFill[pillar],
								)}
							>
								<Icon />
							</span>
						</a>
					</li>
				);
			})}
		</ul>
	);
};
