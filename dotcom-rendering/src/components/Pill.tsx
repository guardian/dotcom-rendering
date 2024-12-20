import { css } from '@emotion/react';
import { space, textSansBold12 } from '@guardian/source/foundations';
import { cloneElement, type ReactElement } from 'react';
import { palette } from '../palette';

type IconSide = 'left' | 'right';

interface Props {
	/**
	 * Main content of pill. This can be a string or an element. eg.
	 * <time>2:35</time>
	 */
	content: string | ReactElement;
	/** Optional prefix displayed before main content with a dividing line */
	prefix?: string;
	/** Optional icon displayed before or after content */
	icon?: ReactElement;
	/** Optional icon position (icon is on the left by default) */
	iconSide?: IconSide;
}

const pillStyles = css`
	display: inline-flex;
	align-items: center;
	gap: ${space[1]}px;
	padding: 0 10px;
	border-radius: ${space[3]}px;
	${textSansBold12};
	color: ${palette('--pill-text')};
	background-color: ${palette('--pill-background')};
	svg {
		flex: none;
		margin: 0 -3px; /* Compensate for whitespace around icon */
	}
`;

const pillContentStyles = css`
	padding: ${space[1]}px 0;
`;

const pillPrefixStyles = css`
	margin-right: 2px;
	padding-right: 6px;
	border-right: 1px solid ${palette('--pill-divider')};
`;

export const Pill = ({ content, prefix, icon, iconSide = 'left' }: Props) => {
	const Icon = () =>
		icon
			? cloneElement(icon, {
					size: 'xsmall',
					theme: { fill: 'currentColor' },
			  })
			: null;

	return (
		<div css={pillStyles}>
			{iconSide === 'left' && <Icon />}
			{!!prefix && (
				<span css={[pillContentStyles, pillPrefixStyles]}>
					{prefix}
				</span>
			)}
			<span css={pillContentStyles}>{content}</span>
			{iconSide === 'right' && <Icon />}
		</div>
	);
};
