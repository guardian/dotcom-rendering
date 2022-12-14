import { css } from '@emotion/react';
import { brand } from '@guardian/source-foundations';
import { HeaderLink } from '../../types/header';
import type { EditionId } from '../lib/edition';
import { getZIndex } from '../lib/getZIndex';
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
	const links: [HeaderLink, HeaderLink, HeaderLink, HeaderLink] = [
		{
			id: 'uk',
			url: '/preference/edition/uk',
			isActive: editionId === 'UK',
			title: 'UK edition',
			dataLinkName: 'nav3 : topbar : edition-picker: UK',
		},
		{
			id: 'us',
			url: '/preference/edition/us',
			isActive: editionId === 'US',
			title: 'US edition',
			dataLinkName: 'nav3 : topbar : edition-picker: US',
		},
		{
			id: 'au',
			url: '/preference/edition/au',
			isActive: editionId === 'AU',
			title: 'Australia edition',
			dataLinkName: 'nav3 : topbar : edition-picker: AU',
		},
		{
			id: 'int',
			url: '/preference/edition/int',
			isActive: editionId === 'INT',
			title: 'International edition',
			dataLinkName: 'nav3 : topbar : edition-picker: INT',
		},
		...(isInEuropeTest
			? [
					{
						id: 'eur',
						url: '/preference/edition/eur',
						isActive: editionId === 'EUR',
						title: 'Europe edition',
						dataLinkName: 'nav3 : topbar : edition-picker: EUR',
					},
			  ]
			: []),
	];

	// Find active link, default to UK
	const activeLink = links.find((link) => link.isActive) || links[0];

	// Remove the active link and add it back to the top of the list
	const linksToDisplay = links.filter((link) => !link.isActive);
	linksToDisplay.unshift(activeLink);

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
