import { css } from '@emotion/react';
import { from, space, textSans17 } from '@guardian/source/foundations';
import type { EditionId } from '../../../lib/edition';
import { editionList, getEditionFromId } from '../../../lib/edition';
import { getZIndex } from '../../../lib/getZIndex';
import { nestedOphanComponents } from '../../../lib/ophan-helpers';
import type { EditionLinkType } from '../../../model/extract-nav';
import { palette as themePalette } from '../../../palette';
import type { DropdownLinkType } from '../../Dropdown';
import { Dropdown } from '../../Dropdown';

interface EditionDropdownProps {
	editionId: EditionId;
	dataLinkName: string;
}

const editionDropdownStyles = css`
	${getZIndex('editionDropdown')};
	display: flex;
	/** Required to absolutely position the dropdown menu */
	position: relative;
	color: ${themePalette('--masthead-nav-link-text')};
	${textSans17}
	margin-top: ${space[1]}px;
`;

const dropDownOverrides = css`
	${textSans17}
	color: ${themePalette('--masthead-nav-link-text')};
	padding: 6px 0 0 0;
	margin-top: ${space[1]}px;

	&:not(ul):hover {
		color: ${themePalette('--masthead-nav-link-text')};
		text-decoration: underline;
	}

	&:not(button) {
		position: absolute;
		top: 32px;
		max-height: max-content;

		${from.mobileMedium} {
			right: 0;
			left: unset;
		}
	}
`;

export const EditionDropdown = ({
	editionId,
	dataLinkName,
}: EditionDropdownProps) => {
	const editionToDropdownLink = (edition: EditionLinkType) => ({
		id: edition.editionId,
		url: edition.url,
		title: edition.longTitle,
		dataLinkName: nestedOphanComponents(
			'header',
			'titlepiece',
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
				label={activeEdition.id}
				links={linksToDisplay}
				id="edition"
				dataLinkName={dataLinkName}
				cssOverrides={dropDownOverrides}
			/>
		</div>
	);
};
