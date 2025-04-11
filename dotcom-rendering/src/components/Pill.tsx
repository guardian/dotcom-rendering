import { css } from '@emotion/react';
import { space, textSansBold12 } from '@guardian/source/foundations';
import { cloneElement, type ReactElement } from 'react';
import { palette } from '../palette';

type Props = {
	/**
	 * Main content of pill. This can be a string or an element. eg.
	 * <time>2:35</time>
	 */
	content: string | ReactElement<any>;
	/** Optional prefix displayed before main content with a dividing line */
	prefix?: string;
	/** Optional icon displayed before or after content */
	icon?: ReactElement<any>;
	/** Optional icon position (icon is on the left by default) */
	iconSide?: 'left' | 'right';
};

const pillStyles = css`
	height: ${space[6]}px;
	display: inline-flex;
	align-items: stretch;
	gap: ${space[1]}px;
	padding: 0 ${space[2]}px;
	border-radius: ${space[10]}px;
	${textSansBold12};
	color: ${palette('--pill-text')};
	background-color: ${palette('--pill-background')};

	svg {
		flex: none;
	}
`;

const contentStyles = css`
	display: flex;
	align-items: center;
	gap: 2px;
	line-height: 1;
`;

const prefixStyles = css`
	padding: ${space[1]}px 6px ${space[1]}px 0;
	display: flex;
	align-items: center;
	gap: ${space[1]}px;
	border-right: 1px solid ${palette('--pill-divider')};
`;

export const Pill = ({ content, prefix, icon, iconSide = 'left' }: Props) => {
	const renderedIcon =
		icon &&
		cloneElement(icon, {
			size: 'xsmall',
			theme: { fill: 'currentColor' },
		});

	return (
		<div css={pillStyles}>
			{!!prefix && <span css={prefixStyles}>{prefix}</span>}
			<span css={contentStyles}>
				{iconSide === 'left' && renderedIcon}
				{content}
				{iconSide === 'right' && renderedIcon}
			</span>
		</div>
	);
};
