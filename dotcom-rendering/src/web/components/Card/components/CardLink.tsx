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
	background-color: transparent;

	opacity: 0;
	text-indent: 200%;
	overflow: hidden;

	:focus {
		${focusHalo};
	}
`;

type Props = {
	linkTo: string;
	headlineText: string;
	containerPalette?: DCRContainerPalette;
	dataLinkName?: string;
};

export const CardLink = ({
	linkTo,
	headlineText,
	dataLinkName = 'article',
}: Props) => {
	return (
		<a href={linkTo} css={fauxLinkStyles} data-link-name={dataLinkName}>
			{headlineText}
		</a>
	);
};
