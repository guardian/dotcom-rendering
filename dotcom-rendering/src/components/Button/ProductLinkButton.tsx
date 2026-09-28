import type { SerializedStyles } from '@emotion/react';
import { css } from '@emotion/react';
import type {
	ButtonPriority,
	ThemeButton,
} from '@guardian/source/react-components';
import { LinkButton } from '@guardian/source/react-components';
import { SKIMLINK_REL } from '../../lib/affiliateLinksUtils';
import { palette } from '../../palette';
import {
	createAccessibleProductLabel,
	createStrikeThroughProductLabel,
	rewriteLabelWithLatestPrice,
} from './productUtils';
import { heightAutoStyle, wrapButtonTextStyle } from './styles';
import { getPropsForLinkUrl } from './utils';
import { AffiliateProductPrice } from '../../types/content';

type ProductLinkButtonProps = {
	label: string;
	url: string;
	latestPrice?: AffiliateProductPrice;
	size?: 'default' | 'small';
	fullwidth?: boolean;
	fullWidthText?: boolean;
	priority?: ButtonPriority;
	minimisePadding?: boolean;
	dataComponent?: string;
	xCustComponentId?: string;
	themeOverrides?: Partial<ThemeButton>;
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

const strikeThroughStyle = css`
	s {
		font-weight: normal;
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
	latestPrice,
	size = 'default',
	fullwidth = false,
	minimisePadding = false,
	fullWidthText = false,
	priority = 'primary',
	dataComponent,
	xCustComponentId,
	themeOverrides,
}: ProductLinkButtonProps) => {
	const cssOverrides: SerializedStyles[] = [
		heightAutoStyle,
		...(fullwidth ? [fullWidthStyle] : []),
		...(minimisePadding ? [minimisePaddingStyle] : []),
	];

	const labelWithLatestPrice = rewriteLabelWithLatestPrice(
		latestPrice,
		label,
	);

	return (
		<LinkButton
			{...getPropsForLinkUrl(
				createAccessibleProductLabel(labelWithLatestPrice),
			)}
			href={url}
			rel={SKIMLINK_REL}
			priority={priority}
			theme={{ ...theme, ...themeOverrides }}
			data-component={dataComponent}
			data-ignore="global-link-styling"
			data-link-name={`product link button ${priority}`}
			data-spacefinder-role="inline"
			size={size}
			cssOverrides={cssOverrides}
			data-x-cust-component-id={xCustComponentId}
		>
			<span
				style={fullWidthText ? { width: '100%' } : {}}
				css={[wrapButtonTextStyle, strikeThroughStyle]}
			>
				{createStrikeThroughProductLabel(labelWithLatestPrice)}
			</span>
		</LinkButton>
	);
};
