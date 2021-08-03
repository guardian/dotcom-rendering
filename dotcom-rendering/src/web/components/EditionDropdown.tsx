import { css } from '@emotion/react';

import { Dropdown } from '@root/src/web/components/Dropdown';
import { brand } from '@guardian/src-foundations/palette';
import { from } from '@guardian/src-foundations/mq';
import { getZIndex } from '../lib/getZIndex';

const editionDropdown = css`
	display: flex;
	position: absolute;
	right: 11px;
	${getZIndex('editionDropdown')}
	transform: translateX(100%);

	:before {
		content: '';
		border-left: 1px solid ${brand[600]};
		display: block;
		float: left;
		height: 24px;
	}

	${from.desktop} {
		right: 121px;
		width: 110px;
	}
	${from.wide} {
		right: 198px;
		width: 197px;
	}
`;

export const EditionDropdown: React.FC<{
	edition: Edition;
	dataLinkName: string;
}> = ({ edition, dataLinkName }) => {
	const links = [
		{
			url: '/preference/edition/uk',
			isActive: edition === 'UK',
			title: 'UK edition',
			dataLinkName: 'nav2 : topbar : edition-picker: UK',
		},
		{
			url: '/preference/edition/us',
			isActive: edition === 'US',
			title: 'US edition',
			dataLinkName: 'nav2 : topbar : edition-picker: US',
		},
		{
			url: '/preference/edition/au',
			isActive: edition === 'AU',
			title: 'Australian edition',
			dataLinkName: 'nav2 : topbar : edition-picker: AU',
		},
		{
			url: '/preference/edition/int',
			isActive: edition === 'INT',
			title: 'International edition',
			dataLinkName: 'nav2 : topbar : edition-picker: INT',
		},
	];

	// Find active link, default to UK
	const activeLink = links.find((link) => link.isActive) || links[0];

	// Remove the active link and add it back to the top of the list
	const linksToDisplay = links.filter((link) => !link.isActive);
	linksToDisplay.unshift(activeLink);

	return (
		<div css={editionDropdown}>
			<div
				css={css`
					padding-top: 7px;
				`}
			>
				<Dropdown
					label={activeLink.title}
					links={linksToDisplay}
					id="edition"
					dataLinkName={dataLinkName}
				/>
			</div>
		</div>
	);
};
