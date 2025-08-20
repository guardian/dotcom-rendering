import type { SerializedStyles } from '@emotion/react';
import { css } from '@emotion/react';
import { space } from '@guardian/source/foundations';
import type { ThemeButton } from '@guardian/source/react-components';
import {
	LinkButton,
	SvgArrowRightStraight,
} from '@guardian/source/react-components';
import { palette } from '../palette';

type ProductLinkButtonProps = {
	label: string;
	url: string;
	size?: 'default' | 'small';
	cssOverrides?: SerializedStyles;
};

const linkButtonStyles = css`
	max-width: 100%;
	height: fit-content;
	padding-top: ${space[1]}px;
	padding-bottom: ${space[1]}px;
	white-space: normal;
	overflow-wrap: break-word;
`;

export const theme: Partial<ThemeButton> = {
	backgroundPrimary: palette('--product-button-primary-background'),
	backgroundPrimaryHover: palette(
		'--product-button-primary-background-hover',
	),
};

export const ProductLinkButton = ({
	label,
	url,
	size = 'default',
	cssOverrides,
}: ProductLinkButtonProps) => {
	return (
		<LinkButton
			href={url}
			rel="sponsored noreferrer noopener"
			target="_blank"
			iconSide="right"
			aria-label={`Open ${label} in a new tab`}
			icon={<SvgArrowRightStraight />}
			theme={theme}
			data-ignore="global-link-styling"
			data-link-name="in body link"
			data-spacefinder-role="inline"
			size={size}
			cssOverrides={[
				linkButtonStyles,
				...(cssOverrides ? [cssOverrides] : []),
			]}
		>
			{label}
		</LinkButton>
	);
};
