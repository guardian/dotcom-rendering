import { css } from '@emotion/react';
import { brand } from '@guardian/source-foundations';
import type { EditionId } from '../lib/edition';
import { getZIndex } from '../lib/getZIndex';
import type { DropdownLinkType } from './Dropdown';
import { Dropdown } from './Dropdown';
import { dropDownOverrides } from './HeaderTopBarMyAccount';

interface HeaderTopBarEditionDropdownProps {
	editionId: EditionId;
	dataLinkName: string;
	isInEuropeTest: boolean;
}

const editionDropdownStyles = css`
	${getZIndex('editionDropdown')};
	display: flex;
	position: relative;
	:before {
		content: '';
		border-left: 1px solid ${brand[600]};
		height: 24px;
	}
`;

export const HeaderTopBarEditionDropdown = ({
	editionId,
	dataLinkName,
	isInEuropeTest,
}: HeaderTopBarEditionDropdownProps) => {
	const ukEdition: DropdownLinkType = {
		id: 'uk',
		url: '/preference/edition/uk',
		title: 'UK edition',
		dataLinkName: 'nav3 : topbar : edition-picker: UK',
	};

	const links: DropdownLinkType[] = [
		ukEdition,
		{
			id: 'us',
			url: '/preference/edition/us',
			title: 'US edition',
			dataLinkName: 'nav3 : topbar : edition-picker: US',
		},
		{
			id: 'au',
			url: '/preference/edition/au',
			title: 'Australia edition',
			dataLinkName: 'nav3 : topbar : edition-picker: AU',
		},
		{
			id: 'int',
			url: '/preference/edition/int',
			title: 'International edition',
			dataLinkName: 'nav3 : topbar : edition-picker: INT',
		},
		...(isInEuropeTest
			? [
					{
						id: 'eur',
						url: '/preference/edition/eur',
						title: 'Europe edition',
						dataLinkName: 'nav3 : topbar : edition-picker: EUR',
					},
			  ]
			: []),
	].map((link) =>
		link.id.toUpperCase() === editionId
			? { ...link, isActive: true }
			: link,
	);

	// Find active link, default to UK
	const activeLink = links.find(({ isActive }) => isActive) ?? {
		...ukEdition,
		isActive: true,
	};

	// Remove the active link and add it back to the top of the list
	const linksToDisplay = [
		activeLink,
		...links.filter(({ isActive }) => !isActive),
	];

	return (
		<div css={editionDropdownStyles}>
			<Dropdown
				label={activeLink.title}
				links={linksToDisplay}
				id="edition"
				dataLinkName={dataLinkName}
				cssOverrides={css`
					${dropDownOverrides};
					padding-top: 6px;
				`}
			/>
		</div>
	);
};
