import { css } from '@emotion/react';
import { getZIndex } from '../../../lib/getZIndex';

const fauxLinkStyles = css`
	position: absolute;
	z-index: ${getZIndex('card-link')};
	opacity: 0;
	top: 0;
	right: 0;
	bottom: 0;
	left: 0;
`;

type Props = {
	linkTo: string;
	dataLinkName?: string;
};

export const CardLink = ({ linkTo, dataLinkName = 'article' }: Props) => (
	<a href={linkTo} css={fauxLinkStyles} data-link-name={dataLinkName}>
		{linkTo}
	</a>
);
