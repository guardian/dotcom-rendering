import type { SerializedStyles } from '@emotion/react';
import { css } from '@emotion/react';
import type {
	ButtonPriority,
	ThemeButton,
} from '@guardian/source/react-components';
import { LinkButton } from '@guardian/source/react-components';
import { palette } from '../../palette';
import { heightAutoStyle, wrapButtonTextStyle } from './styles';
import { getPropsForLinkUrl } from './utils';

type ProductLinkButtonProps = {
	label: string;
	url: string;
	size?: 'default' | 'small';
	fullwidth?: boolean;
	fullWidthText?: boolean;
	priority?: ButtonPriority;
	minimisePadding?: boolean;
	dataComponent?: string;
};

const fullWidthStyle = css`
	width: 100%;
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
	fullWidthText = false,
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
			{...getPropsForLinkUrl(label)}
			href={url}
			rel="sponsored noreferrer noopener"
			priority={priority}
			theme={theme}
			data-component={dataComponent}
			data-ignore="global-link-styling"
			data-link-name={`product link button ${priority}`}
			data-spacefinder-role="inline"
			size={size}
			cssOverrides={cssOverrides}
		>
			<span
				style={fullWidthText ? { width: '100%' } : {}}
				css={wrapButtonTextStyle}
			>
				{label}
			</span>
		</LinkButton>
	);
};
