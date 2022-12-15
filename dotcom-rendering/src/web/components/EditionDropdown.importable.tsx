import { css } from '@emotion/react';
import { brand, from } from '@guardian/source-foundations';
import { HeaderLink } from '../../types/header';
import type { EditionId } from '../lib/edition';
import { getZIndex } from '../lib/getZIndex';
import { Dropdown } from './Dropdown';

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

type Props = {
	editionId: EditionId;
	dataLinkName: string;
	isInEuropeTest: boolean;
};

export const EditionDropdown = ({
	editionId,
	dataLinkName,
	isInEuropeTest,
}: Props) => {
	const links: [HeaderLink, ...HeaderLink[]] = [
		{
			id: 'uk',
			url: '/preference/edition/uk',
			isActive: editionId === 'UK',
			title: 'UK edition',
			dataLinkName: 'nav2 : topbar : edition-picker: UK',
		},
		{
			id: 'us',
			url: '/preference/edition/us',
			isActive: editionId === 'US',
			title: 'US edition',
			dataLinkName: 'nav2 : topbar : edition-picker: US',
		},
		{
			id: 'au',
			url: '/preference/edition/au',
			isActive: editionId === 'AU',
			title: 'Australia edition',
			dataLinkName: 'nav2 : topbar : edition-picker: AU',
		},
		{
			id: 'int',
			url: '/preference/edition/int',
			isActive: editionId === 'INT',
			title: 'International edition',
			dataLinkName: 'nav2 : topbar : edition-picker: INT',
		},
	];
	if (isInEuropeTest)
		links.push({
			id: 'eur',
			url: '/preference/edition/eur',
			isActive: editionId === 'EUR',
			title: 'Europe edition',
			dataLinkName: 'nav2 : topbar : edition-picker: EUR',
		});

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
