import type { SerializedStyles } from '@emotion/react';
import { css } from '@emotion/react';
import type { ThemeButton } from '@guardian/source/react-components';
import {
	LinkButton,
	SvgArrowRightStraight,
} from '@guardian/source/react-components';
import { palette } from '../palette';

type LinkElementButtonProps = {
	label: string;
	url: string;
	size?: 'default' | 'small';
	fullwidth?: boolean;
	fullWidthText?: boolean;
	linkType: 'StandardButton' | 'ProductButton';
	priority?: 'Primary' | 'Tertiary';
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

const productTheme: Partial<ThemeButton> = {
	backgroundPrimary: palette('--product-button-primary-background'),
	backgroundPrimaryHover: palette(
		'--product-button-primary-background-hover',
	),
	textPrimary: palette('--product-button-primary-text'),
	textTertiary: palette('--product-button-primary-background'),
	borderTertiary: palette('--product-button-primary-background'),
};

const standardTheme: Partial<ThemeButton> = {
	backgroundPrimary: palette('--standard-button-primary-background'),
	backgroundPrimaryHover: palette(
		'--standard-button-primary-background-hover',
	),
	textPrimary: palette('--standard-button-primary-text'),
	textTertiary: palette('--standard-button-primary-background'),
	borderTertiary: palette('--standard-button-primary-background'),
};

const LinkTypePriorityToButtonPriority = {
	Primary: 'primary',
	Tertiary: 'tertiary',
} as const;

const linkTypeToTheme = {
	ProductButton: productTheme,
	StandardButton: standardTheme,
} as const;

export const LinkElementButton = ({
	label,
	url,
	size = 'default',
	fullwidth = false,
	minimisePadding = false,
	fullWidthText = false,
	priority = 'Primary',
	linkType,
	dataComponent,
}: LinkElementButtonProps) => {
	const cssOverrides: SerializedStyles[] = [
		heightAutoStyle,
		...(fullwidth ? [fullWidthStyle] : []),
		...(minimisePadding ? [minimisePaddingStyle] : []),
	];

	const isInternal = new URL(url).hostname.endsWith('theguardian.com');
	const targetProps = isInternal
		? {}
		: {
				target: '_blank',
				'aria-label': `Open ${label} in a new tab`,
				icon: <SvgArrowRightStraight />,
		  };

	return (
		<LinkButton
			href={url}
			rel="sponsored noreferrer noopener"
			iconSide="right"
			priority={LinkTypePriorityToButtonPriority[priority]}
			theme={linkTypeToTheme[linkType]}
			data-ignore="global-link-styling"
			data-component={dataComponent}
			data-link-name={`product link button ${priority}`}
			data-spacefinder-role="inline"
			size={size}
			cssOverrides={cssOverrides}
			{...targetProps}
		>
			<span
				style={fullWidthText ? { width: '100%' } : {}}
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
