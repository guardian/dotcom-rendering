import { css } from '@emotion/react';
import { getZIndex } from '../../../lib/getZIndex';

const fauxLinkStyles = css`
	position: absolute;
	${getZIndex('card-link')};
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
	// eslint-disable-next-line -- we’ve got an empty link floating: see #4798
	<a href={linkTo} css={fauxLinkStyles} data-link-name={dataLinkName} />
);
