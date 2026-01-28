import type { SerializedStyles } from '@emotion/react';
import { css } from '@emotion/react';
import type { ButtonPriority } from '@guardian/source/react-components';
import { palette } from '../../palette';

export const decideBackground = (
	priority: ButtonPriority,
): SerializedStyles => {
	switch (priority) {
		case 'primary':
		case 'secondary':
			return css`
				background-color: ${palette('--editorial-button-background')};
				:hover {
					background-color: ${palette(
						'--editorial-button-background-hover',
					)};
					border: 1px solid
						${palette('--editorial-button-border-hover')};
				}
			`;
		case 'subdued':
		case 'tertiary':
			return css`
				background-color: transparent;
			`;
	}
};

export const decideBorder = (priority: ButtonPriority): SerializedStyles => {
	switch (priority) {
		case 'primary':
		case 'secondary':
		case 'tertiary':
			return css`
				border: 1px solid ${palette('--editorial-button-background')};
			`;
		case 'subdued':
			return css`
				border: none;
			`;
	}
};

export const decideFont = (priority: ButtonPriority): SerializedStyles => {
	switch (priority) {
		case 'primary':
		case 'secondary':
			return css`
				color: ${palette('--editorial-button-text')};
			`;
		case 'subdued':
		case 'tertiary':
			return css`
				color: ${palette('--editorial-button-background')};
			`;
	}
};

export const heightAutoStyle = css`
	height: auto;
`;

export const wrapButtonTextStyle = css`
	text-wrap: balance;
	text-align: center;
	white-space: normal;
	padding: 4px 0 4px;
`;
