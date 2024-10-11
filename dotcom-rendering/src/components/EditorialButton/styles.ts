import type { SerializedStyles } from '@emotion/react';
import { css } from '@emotion/react';
import { neutral } from '@guardian/source/foundations';
import type { ButtonPriority } from '@guardian/source/react-components';
import { palette } from '../../palette';

const WHITE = neutral[100];

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
				border: 1px solid currentColor;
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
				color: ${WHITE};
			`;
		case 'subdued':
		case 'tertiary':
			return css`
				color: ${palette('--editorial-button-text')};
			`;
	}
};
