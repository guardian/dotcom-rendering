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

const reduceSpace = css`
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
	minimisePadding = true,
	priority = 'primary',
	dataComponent = 'in-body-product-link-button',
}: ProductLinkButtonProps) => {
	const cssOverrides: SerializedStyles[] = [
		heightAutoStyle,
		...(fullwidth ? [fullWidthStyle] : []),
		...(minimisePadding ? [reduceSpace] : []),
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
			data-link-name="in body link"
			data-spacefinder-role="inline"
			size={size}
			cssOverrides={cssOverrides}
			data-component={dataComponent}
			style={
				minimisePadding
					? {
							padding: '0 10px 0 12px',
					  }
					: {}
			}
		>
			<span
				css={css`
					white-space: normal;
					padding: 4px 0 4px;
				`}
			>
				{label}
			</span>
		</LinkButton>
	);
};
