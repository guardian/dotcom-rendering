import { css } from '@emotion/react';
import { palette } from '@guardian/source/foundations';
import type { EditionId } from '../lib/edition';
import { editionList, getEditionFromId } from '../lib/edition';
import { getZIndex } from '../lib/getZIndex';
import { nestedOphanComponents } from '../lib/ophan-helpers';
import type { EditionLinkType } from '../model/extract-nav';
import type { DropdownLinkType } from './Dropdown.importable';
import { Dropdown } from './Dropdown.importable';
import { dropDownOverrides } from './HeaderTopBarMyAccount';

interface HeaderTopBarEditionDropdownProps {
	editionId: EditionId;
	dataLinkName: string;
	showCurrentEdition?: boolean;
}

const editionDropdownStyles = css`
	${getZIndex('editionDropdown')};
	display: flex;
	position: relative;
	:before {
		content: '';
		border-left: 1px solid ${palette.brand[600]};
		height: 24px;
	}
`;

export const HeaderTopBarEditionDropdown = ({
	editionId,
	dataLinkName,
	showCurrentEdition = true,
}: HeaderTopBarEditionDropdownProps) => {
	const editionToDropdownLink = (edition: EditionLinkType) => ({
		id: edition.editionId,
		url: edition.url,
		title: edition.longTitle,
		dataLinkName: nestedOphanComponents(
			'nav3',
			'topbar',
			`edition-picker: ${edition.editionId}`,
		),
		isActive: editionId === edition.editionId,
	});

	const activeEdition: DropdownLinkType = editionToDropdownLink(
		getEditionFromId(editionId),
	);

	const label = showCurrentEdition ? activeEdition.title : 'Edition';

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
				label={label}
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
