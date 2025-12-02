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
	fullwidth?: boolean;
	priority?: ButtonPriority;
	dataComponent?: string;
	minimisePadding?: boolean;
};

const fullWidthStyle = css`
	width: 100%;
`;

const heightAutoStyle = css`
	height: auto;
`;

const minimisePaddingStyle = css`
	padding: 0 10px 0 12px;
	& .src-button-space {
		width: 8px;
	}
	> svg {
		margin-left: -2px;
	}
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
	fullwidth = false,
	minimisePadding = false,
	priority = 'primary',
	dataComponent,
}: ProductLinkButtonProps) => {
	const cssOverrides: SerializedStyles[] = [
		heightAutoStyle,
		...(fullwidth ? [fullWidthStyle] : []),
		...(minimisePadding ? [minimisePaddingStyle] : []),
	];

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
			data-component={dataComponent}
			data-link-name={`product link button ${priority}`}
			data-spacefinder-role="inline"
			size={size}
			cssOverrides={cssOverrides}
		>
			<span
				css={css`
					text-wrap: balance;
					text-align: center;
					white-space: normal;
					padding: 4px 0 4px;
				`}
			>
				{label}
			</span>
		</LinkButton>
	);
};
