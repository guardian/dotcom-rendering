import { css } from '@emotion/react';
import { brandBackground } from '@guardian/source-foundations';
import type { DropdownLinkType } from './Dropdown';
import { Dropdown } from './Dropdown';

const Header = ({ children }: { children: React.ReactNode }) => (
	<div
		css={css`
			height: 300px;
			width: 100%;
			background-color: ${brandBackground.primary};
		`}
	>
		{children}
	</div>
);

const Nav = ({ children }: { children: React.ReactNode }) => (
	<div
		css={css`
			height: 20px;
			position: absolute;
			top: 10px;
			display: block;
			right: 258px;
			width: 197px;
			z-index: 1072;
			transform: translateX(100%);
			padding-top: 7px;
		`}
	>
		{children}
	</div>
);

const links: [
	DropdownLinkType,
	DropdownLinkType,
	DropdownLinkType,
	DropdownLinkType,
] = [
	{
		id: 'uk',
		url: '/preference/edition/uk',
		title: 'UK edition',
		isActive: true,
		dataLinkName: 'linkname-UK',
	},
	{
		id: 'us',
		url: '/preference/edition/us',
		title: 'US edition',
		dataLinkName: 'linkname-US',
	},
	{
		id: 'au',
		url: '/preference/edition/au',
		title: 'Australia edition',
		dataLinkName: 'linkname-AU',
	},
	{
		id: 'int',
		url: '/preference/edition/int',
		title: 'International edition',
		dataLinkName: 'linkname-INT',
	},
];

const linksWithNoneActive = [
	{
		...links[0],
		isActive: false,
	},
	{ ...links[1] },
	{ ...links[2] },
	{ ...links[3] },
];

export default {
	component: Dropdown,
	title: 'Components/Dropdown',
};

export const DropdownActive = () => (
	<Header>
		<Nav>
			<Dropdown
				id="d1"
				label="UK edition"
				links={links}
				dataLinkName="linkname1"
			/>
		</Nav>
	</Header>
);
DropdownActive.storyName = 'Dropdown with first item active';

export const DropdownNoActive = () => (
	<Header>
		<Nav>
			<Dropdown
				id="d2"
				label="UK edition"
				links={linksWithNoneActive}
				dataLinkName="linkname2"
			/>
		</Nav>
	</Header>
);
DropdownNoActive.storyName = 'Dropdown with nothing active';

const linksWithNotifications = [
	{
		id: 'account-overview',
		url: '/account-overview',
		title: 'Account Overview',
		dataLinkName: 'account-overview',
	},
	{
		id: 'billing',
		url: '/billing',
		title: 'Billing',
		dataLinkName: 'billing',
		notifications: [
			{
				id: 'example-id',
				message: 'Billing attempt failed',
				target: 'billing',
				ophanLabel: 'notification-label',
			},
		],
	},
];

export const DropdownWithNotifications = () => (
	<Header>
		<Nav>
			<Dropdown
				id="d3"
				label="My Account"
				links={linksWithNotifications}
				dataLinkName="linkname3"
			/>
		</Nav>
	</Header>
);

DropdownWithNotifications.storyName = 'Dropdown with notifications';

export const DropdownExpandedWithNotifications = () => (
	<Header>
		<Nav>
			<Dropdown
				id="d3"
				label="My Account"
				links={linksWithNotifications}
				dataLinkName="linkname3"
				defaultIsExpanded={true}
			/>
		</Nav>
	</Header>
);

DropdownExpandedWithNotifications.storyName =
	'Dropdown expanded with notifications';
