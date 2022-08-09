import { css } from '@emotion/react';
import { focusHalo } from '@guardian/source-foundations';
import type { DCRContainerPalette } from '../../../../types/front';
import { getZIndex } from '../../../lib/getZIndex';

const fauxLinkStyles = css`
	position: absolute;
	${getZIndex('card-link')};
	top: 0;
	right: 0;
	bottom: 0;
	left: 0;
`;

const baseLinkStyles = css`
	display: flex;
	/* a tag specific styles */
	color: inherit;
	text-decoration: none;
	background-color: transparent;

	/* The whole card is one link so we card level styles here */
	width: 100%;

	/* Sometimes a headline contains it's own link so we use the
       approach described below to deal with nested links
       See: https://css-tricks.com/nested-links/ */
	:before {
		content: '';
		position: absolute;
		left: 0;
		top: 0;
		right: 0;
		bottom: 0;
	}

	:focus {
		${focusHalo};
	}
`;

type Props = {
	linkTo: string;
	containerPalette?: DCRContainerPalette;
	dataLinkName?: string;
};

export const CardLink = ({ linkTo, dataLinkName = 'article' }: Props) => {
	return (
		<a
			href={linkTo}
			css={[fauxLinkStyles, baseLinkStyles]}
			data-link-name={dataLinkName}
		/>
	);
};
