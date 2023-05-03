import { css } from '@emotion/react';
import { brand } from '@guardian/source-foundations';
import type { EditionLinkType } from '../../model/extract-nav';
import type { EditionId } from '../lib/edition';
import { getEditionFromId, getEditions } from '../lib/edition';
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
	const editionToDropdownLink = (edition: EditionLinkType) => ({
		id: edition.editionId,
		url: edition.url,
		title: edition.longTitle,
		dataLinkName: `nav3 : topbar : edition-picker: ${edition.editionId}`,
		isActive: editionId === edition.editionId,
	});

	const ukEdition: DropdownLinkType = editionToDropdownLink(
		getEditionFromId('UK'),
	);

	const dropdownItems: DropdownLinkType[] = getEditions(isInEuropeTest).map(
		editionToDropdownLink,
	);

	// Find active link, default to UK
	const activeLink: DropdownLinkType =
		dropdownItems.find(({ isActive }) => isActive) ?? ukEdition;

	// Remove the active link and add it back to the top of the list
	const linksToDisplay = [
		activeLink,
		...dropdownItems.filter(({ isActive }) => !isActive),
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
