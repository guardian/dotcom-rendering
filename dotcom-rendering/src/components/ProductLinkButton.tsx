import { css } from '@emotion/react';
import {
	LinkButton,
	SvgArrowRightStraight,
} from '@guardian/source/react-components';

type ProductLinkButtonProps = {
	label: string;
	url: string;
};

const linkButtonStyles = css`
	max-width: 100%;
	height: fit-content;
	white-space: normal;
	overflow-wrap: break-word;
`;

export const ProductLinkButton = ({ label, url }: ProductLinkButtonProps) => {
	return (
		<LinkButton
			href={url}
			rel="sponsored noreferrer noopener"
			target="_blank"
			iconSide="right"
			aria-label={`Open ${label} in a new tab`}
			icon={<SvgArrowRightStraight />}
			data-ignore="global-link-styling"
			data-link-name="in body link"
			data-spacefinder-role="inline"
			cssOverrides={[linkButtonStyles]}
		>
			{label}
		</LinkButton>
	);
};
