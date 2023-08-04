import { css } from '@emotion/react';
import { brand } from '@guardian/source-foundations';
import type { EditionId } from '../lib/edition.ts';
import { getEditionFromId, getEditions } from '../lib/edition.ts';
import { getZIndex } from '../lib/getZIndex.ts';
import { nestedOphanComponents } from '../lib/ophan-helpers.ts';
import type { EditionLinkType } from '../model/extract-nav.ts';
import type { DropdownLinkType } from './Dropdown.tsx';
import { Dropdown } from './Dropdown.tsx';
import { dropDownOverrides } from './HeaderTopBarMyAccount.tsx';

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

	const dropdownItems: DropdownLinkType[] = getEditions(isInEuropeTest).map(
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
				label={activeEdition.title}
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
