import { css } from '@emotion/react';
import type { EditionId } from '../lib/edition';
import { editionList, getEditionFromId } from '../lib/edition';
import { getZIndex } from '../lib/getZIndex';
import { nestedOphanComponents } from '../lib/ophan-helpers';
import type { EditionLinkType } from '../model/extract-nav';
import type { DropdownLinkType } from './Dropdown';
import { Dropdown } from './Dropdown';
import { dropDownOverrides } from './HeaderTopBarMyAccount';

interface TitlepieceEditionDropdownProps {
	editionId: EditionId;
	dataLinkName: string;
	isTabletOrSmaller: boolean;
}

const editionDropdownStyles = css`
	${getZIndex('editionDropdown')};
	display: flex;
	position: relative;
`;

export const TitlepieceEditionDropdown = ({
	editionId,
	dataLinkName,
	isTabletOrSmaller,
}: TitlepieceEditionDropdownProps) => {
	const editionToDropdownLink = (edition: EditionLinkType) => ({
		id: edition.editionId,
		url: edition.url,
		title: edition.longTitle,
		dataLinkName: nestedOphanComponents(
			'nav4',
			'topbar',
			`edition-picker: ${edition.editionId}`,
		),
		isActive: editionId === edition.editionId,
	});

	const activeEdition: DropdownLinkType = editionToDropdownLink(
		getEditionFromId(editionId),
	);

	const dropdownItems: DropdownLinkType[] = editionList.map(
		editionToDropdownLink,
	);

	// Remove the active link and add it back to the top of the list
	const linksToDisplay = [
		activeEdition,
		...dropdownItems.filter(({ isActive }) => !isActive),
	];

	return (
		<div css={editionDropdownStyles}>
			<Dropdown
				// TODO: Display ID on small screens
				label={
					isTabletOrSmaller ? activeEdition.id : activeEdition.title
				}
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
