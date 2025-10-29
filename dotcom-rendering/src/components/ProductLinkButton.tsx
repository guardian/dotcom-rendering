import type { SerializedStyles } from '@emotion/react';
import { css } from '@emotion/react';
import type {
	ButtonPriority,
	ThemeButton,
} from '@guardian/source/react-components';
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
	priority?: ButtonPriority;
	dataComponent?: string;
};

const linkButtonStyles = css`
	height: auto;
`;

export const theme: Partial<ThemeButton> = {
	backgroundPrimary: palette('--product-button-primary-background'),
	backgroundPrimaryHover: palette(
		'--product-button-primary-background-hover',
	),
	textPrimary: palette('--product-button-primary-text'),
	textTertiary: palette('--product-button-primary-background'),
	borderTertiary: palette('--product-button-primary-background'),
};

export const ProductLinkButton = ({
	label,
	url,
	size = 'default',
	dataComponent = 'in-body-product-link-button',
	cssOverrides,
	priority = 'primary',
}: ProductLinkButtonProps) => {
	return (
		<LinkButton
			href={url}
			rel="sponsored noreferrer noopener"
			target="_blank"
			iconSide="right"
			priority={priority}
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
			data-component={dataComponent}
		>
			<span
				css={css`
					white-space: normal;
					width: 100%;
					padding: 10px 0 10px;
				`}
			>
				{label}
			</span>
		</LinkButton>
	);
};
