import { css } from '@emotion/react';
import { from, palette, space } from '@guardian/source/foundations';
import { Hide } from '@guardian/source/react-components';
import type { EditionId } from '../../../lib/edition';
import { editionList, getEditionFromId } from '../../../lib/edition';
import { getZIndex } from '../../../lib/getZIndex';
import { nestedOphanComponents } from '../../../lib/ophan-helpers';
import type { EditionLinkType } from '../../../model/extract-nav';
import type { DropdownLinkType } from '../../Dropdown';
import { Dropdown } from '../../Dropdown';

interface TitlepieceEditionDropdownProps {
	editionId: EditionId;
	dataLinkName: string;
}

const editionDropdownStyles = css`
	${getZIndex('editionDropdown')};
	display: flex;
	position: relative;
`;

const dropDownOverrides = css`
	color: ${palette.neutral[100]};
	padding: 0;
	margin-top: ${space[1]}px;
	font-size: 1rem;
	&:not(ul):hover {
		color: ${palette.neutral[100]};
		text-decoration: underline;
	}
	${from.tablet} {
		right: 0;
	}
`;

export const TitlepieceEditionDropdown = ({
	editionId,
	dataLinkName,
}: TitlepieceEditionDropdownProps) => {
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
			<Hide until="desktop">
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
			</Hide>
			<Hide from="desktop">
				<Dropdown
					label={activeEdition.id}
					links={linksToDisplay}
					id="edition"
					dataLinkName={dataLinkName}
					cssOverrides={css`
						${dropDownOverrides};
						padding-top: 6px;
					`}
				/>
			</Hide>
		</div>
	);
};
