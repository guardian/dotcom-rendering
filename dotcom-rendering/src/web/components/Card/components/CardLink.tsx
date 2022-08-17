import { css } from '@emotion/react';
import { focusHalo } from '@guardian/source-foundations';
import type { DCRContainerPalette } from '../../../../types/front';

const fauxLinkStyles = css`
	text-decoration: none;
	a&:focus {
		/*
			remove focus styling for <a> tag because it's applied to the
			:before pseudo-element instead.
		*/
		box-shadow: none;
	}
	:before {
		position: absolute;
		content: '';
		top: 0;
		right: 0;
		bottom: 0;
		left: 0;
		background-color: transparent;
	}
	:focus:before {
		${focusHalo};
	}
`;

type Props = {
	linkTo: string;
	containerPalette?: DCRContainerPalette;
	dataLinkName?: string;
	children: React.ReactNode;
};

export const CardLink = ({
	linkTo,
	dataLinkName = 'article',
	children,
}: Props) => {
	return (
		<a href={linkTo} css={fauxLinkStyles} data-link-name={dataLinkName}>
			{children}
		</a>
	);
};
