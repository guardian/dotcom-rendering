import type { SerializedStyles } from '@emotion/react';
import { css } from '@emotion/react';
import { neutral } from '@guardian/source/foundations';
import type { ButtonPriority } from '@guardian/source/react-components';
import { ArticleDesign, ArticleDisplay, Pillar } from '../../lib/format';
import type { ArticleFormat } from '../../lib/format';
import { palette } from '../../palette';

export const defaultFormat = {
	display: ArticleDisplay.Standard,
	design: ArticleDesign.Standard,
	theme: Pillar.News,
};

const WHITE = neutral[100];

export const decideBackground = (
	format: ArticleFormat,
	priority: ButtonPriority,
): SerializedStyles => {
	switch (priority) {
		case 'primary':
		case 'secondary':
			return css`
				background-color: palette('--editorial-button-background');
				:hover {
					background-color: palette(
						'--editorial-button-background-hover'
					);
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

export const decideBorder = (
	format: ArticleFormat,
	priority: ButtonPriority,
): SerializedStyles => {
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

export const decideFont = (
	format: ArticleFormat,
	priority: ButtonPriority,
): SerializedStyles => {
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
