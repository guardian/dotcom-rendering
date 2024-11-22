import { css } from '@emotion/react';
import {
	from,
	space,
	textSans14,
	textSans17,
	until,
} from '@guardian/source/foundations';
import type { EditionId } from '../../../lib/edition';
import { editionList, getEditionFromId } from '../../../lib/edition';
import { getZIndex } from '../../../lib/getZIndex';
import { nestedOphanComponents } from '../../../lib/ophan-helpers';
import type { EditionLinkType } from '../../../model/extract-nav';
import { palette as themePalette } from '../../../palette';
import type { DropdownLinkType } from '../../Dropdown.importable';
import { Dropdown } from '../../Dropdown.importable';

interface EditionDropdownProps {
	editionId: EditionId;
	dataLinkName: string;
	showCurrentEdition?: boolean;
	showSlimNav?: boolean;
}

const editionDropdownStyles = css`
	z-index: ${getZIndex('mastheadEditionDropdown')};
	display: flex;
	/** Required to absolutely position the dropdown menu */
	position: relative;
	color: ${themePalette('--masthead-nav-link-text')};
	${textSans17}
	margin-top: ${space[1]}px;

	ul {
		position: absolute;
		left: 0;
		right: unset;
		max-height: unset;
		min-width: 200px;

		${from.mobileMedium} {
			left: unset;
			right: 0;
		}
	}
`;

const slimNavEditionDropdownOverrides = css`
	${until.tablet} {
		ul {
			position: absolute;
			left: 0;
			right: unset;
			top: ${space[6]}px;
			max-height: unset;
			min-width: 200px;
		}
	}
`;

const dropDownOverrides = (showSlimNav: boolean) => css`
	${textSans14}
	${from.leftCol} {
		${textSans17}
	}
	color: ${themePalette('--masthead-nav-link-text')};
	padding: 6px 0 0 0;
	margin-top: ${space[1]}px;

	&:not(ul):hover {
		color: ${themePalette('--masthead-nav-link-text')};
		text-decoration: underline;
	}

	${showSlimNav &&
	css`
		padding: 0;
		margin-top: 0;
	`}
`;

export const EditionDropdown = ({
	editionId,
	dataLinkName,
	showCurrentEdition = true,
	showSlimNav = false,
}: EditionDropdownProps) => {
	const editionToDropdownLink = (edition: EditionLinkType) => ({
		id: edition.editionId,
		url: edition.url,
		title: edition.longTitle,
		shortTitle: edition.shortTitle,
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

	const label = showCurrentEdition
		? activeEdition.shortTitle ?? activeEdition.id
		: 'Edition';

	return (
		<div
			css={[
				editionDropdownStyles,
				showSlimNav && slimNavEditionDropdownOverrides,
			]}
		>
			<Dropdown
				label={label}
				links={linksToDisplay}
				id="masthead-edition"
				dataLinkName={dataLinkName}
				cssOverrides={dropDownOverrides(showSlimNav)}
			/>
		</div>
	);
};
