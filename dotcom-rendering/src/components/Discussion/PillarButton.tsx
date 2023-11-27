import { css } from '@emotion/react';
import type { ArticleFormat } from '@guardian/libs';
import { ArticleSpecial, Pillar } from '@guardian/libs';
import {
	palette as sourcePalette,
	textSans,
} from '@guardian/source-foundations';
import { Button } from '@guardian/source-react-components';
import { decidePalette } from '../../lib/decidePalette';

type Props = {
	format: ArticleFormat;
	onClick?: () => void | Promise<void>;
	children: string;
	type?: 'submit';
	priority?: 'primary' | 'secondary' | 'subdued';
	icon?: JSX.Element;
	iconSide?: 'left' | 'right';
	linkName: string;
	size?: 'xsmall' | 'small' | 'default';
};

// Why this abstraction? To solve an issue where when we use the 800 key in `palette typescript throws errors. Most
// likely caused by the fact labs only uses 300 & 400 so the union is restricted
const dark = (format: ArticleFormat): string => {
	switch (format.theme) {
		case Pillar.Culture:
			return '#FBF6EF';
		case Pillar.Opinion:
			return '#FEF9F5';
		case Pillar.Lifestyle:
			return '#FEEEF7';
		case Pillar.Sport:
			return '#F1F8FC';
		case Pillar.News:
		case ArticleSpecial.SpecialReport:
		case ArticleSpecial.Labs:
		default:
			return '#FFF4F2';
	}
};

const buttonOverrides = (
	format: ArticleFormat,
	priority: 'primary' | 'secondary' | 'subdued',
) => {
	switch (priority) {
		case 'primary':
			return css`
				button {
					${textSans.small({ fontWeight: 'bold' })}
					background-color: ${decidePalette(format).background
						.discussionPillarButton};
					color: ${sourcePalette.neutral[100]};

					:hover {
						background-color: ${decidePalette(format)
							.discussionGeneric};
					}
				}
			`;

		case 'secondary':
			return css`
				button {
					${textSans.small({ fontWeight: 'bold' })}
					background-color: transparent;
					border: 1px solid ${decidePalette(format).discussionGeneric};
					color: ${decidePalette(format).discussionGeneric};

					:hover {
						background-color: ${dark(format)};
					}
				}
			`;
		case 'subdued':
			return css`
				button {
					${textSans.small({ fontWeight: 'bold' })}
					background-color: transparent;
					color: ${decidePalette(format).discussionGeneric};
					border-radius: 0;
				}
			`;
	}
};

export const PillarButton = ({
	format,
	onClick,
	type,
	priority = 'primary',
	children,
	icon,
	iconSide,
	linkName,
	size = 'default',
}: Props) => (
	<div css={buttonOverrides(format, priority)}>
		<Button
			priority={priority}
			size={size}
			onClick={onClick}
			type={type}
			icon={icon}
			iconSide={iconSide}
			data-link-name={linkName}
		>
			{children}
		</Button>
	</div>
);
