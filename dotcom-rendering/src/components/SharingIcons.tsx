import { css } from '@emotion/react';
import { from } from '@guardian/source-foundations';
import {
	LinkButton,
	SvgEnvelope,
	SvgFacebook,
	SvgLinkedIn,
	SvgMessenger,
	SvgPinterest,
	SvgTwitter,
	SvgWhatsApp,
} from '@guardian/source-react-components';
import type { IconProps } from '@guardian/source-react-components';

const shareIconList = css`
	display: flex;
	flex-direction: row;
	${from.wide} {
		flex: auto;
	}

	a {
		margin-right: 5px;
	}
`;

const mobileOnlyShareIconsListItem = css`
	${from.phablet} {
		display: none;
	}
`;

export type SharePlatformType =
	| 'facebook'
	| 'twitter'
	| 'email'
	| 'linkedIn'
	| 'pinterest'
	| 'whatsApp'
	| 'messenger';

export type SharingUrlsType = {
	[K in SharePlatformType]?: {
		url: string;
		userMessage: string;
	};
};

export interface ShareListItemType {
	id: SharePlatformType;
	Icon: React.ComponentType;
	url: string;
	userMessage: string;
	mobileOnly: boolean;
}

export const SharingIcons = ({
	sharingUrls,
	displayIcons,
}: {
	sharingUrls: {
		[K in SharePlatformType]?: {
			url: string;
			userMessage: string;
		};
	};
	displayIcons: SharePlatformType[];
}) => {
	const icons: {
		[K in SharePlatformType]?: React.ComponentType<IconProps>;
	} = {
		facebook: SvgFacebook,
		twitter: SvgTwitter,
		email: SvgEnvelope,
		whatsApp: SvgWhatsApp,
		messenger: SvgMessenger,
		linkedIn: SvgLinkedIn,
		pinterest: SvgPinterest,
	};

	const mobileOnlyIcons: SharePlatformType[] = ['whatsApp', 'messenger'];

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
		<div css={shareIconList}>
			{shareList.map((shareListItem) => {
				const { Icon, id, url, userMessage, mobileOnly } =
					shareListItem;

				return (
					<div
						css={mobileOnly ? mobileOnlyShareIconsListItem : ''}
						key={`${id}Share`}
					>
						<LinkButton
							hideLabel={true}
							href={url}
							role="button"
							aria-label={userMessage}
							target="_blank"
							rel="noreferrer"
							icon={<Icon />}
							priority="tertiary"
							size="small"
							data-ignore="global-link-styling"
						>
							{userMessage}
						</LinkButton>
					</div>
				);
			})}
		</div>
	);
};
