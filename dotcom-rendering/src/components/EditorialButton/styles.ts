import type { SerializedStyles } from '@emotion/react';
import { css } from '@emotion/react';
import type { ArticleFormat } from '@guardian/libs';
import {
	ArticleDesign,
	ArticleDisplay,
	ArticleSpecial,
	Pillar,
} from '@guardian/libs';
import {
	culture,
	labs,
	lifestyle,
	neutral,
	news,
	opinion,
	palette,
	specialReport,
	sport,
} from '@guardian/source/foundations';
import type { ButtonPriority } from '@guardian/source/react-components';

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
			switch (format.theme) {
				case Pillar.News:
					return css`
						background-color: ${news[300]};
						:hover {
							background-color: ${news[400]};
							border: 1px solid ${news[400]};
						}
					`;
				case Pillar.Culture:
					return css`
						background-color: ${culture[300]};
						:hover {
							background-color: ${culture[400]};
							border: 1px solid ${culture[400]};
						}
					`;
				case Pillar.Lifestyle:
					return css`
						background-color: ${lifestyle[300]};
						:hover {
							background-color: ${lifestyle[400]};
							border: 1px solid ${lifestyle[400]};
						}
					`;
				case Pillar.Sport:
					return css`
						background-color: ${sport[300]};
						:hover {
							background-color: ${sport[400]};
							border: 1px solid ${sport[400]};
						}
					`;
				case Pillar.Opinion:
					return css`
						background-color: ${opinion[300]};
						:hover {
							background-color: ${opinion[400]};
							border: 1px solid ${opinion[400]};
						}
					`;
				case ArticleSpecial.Labs:
					return css`
						background-color: ${labs[300]};
						:hover {
							background-color: ${labs[400]};
							border: 1px solid ${labs[400]};
						}
					`;
				case ArticleSpecial.SpecialReport:
				case ArticleSpecial.SpecialReportAlt:
					return css`
						background-color: ${specialReport[300]};
						:hover {
							background-color: ${specialReport[400]};
							border: 1px solid ${specialReport[400]};
						}
					`;
			}
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
			switch (format.theme) {
				case Pillar.News:
					return css`
						color: ${news[400]};
					`;
				case Pillar.Culture:
					return css`
						color: ${culture[400]};
					`;
				case Pillar.Lifestyle:
					return css`
						color: ${lifestyle[400]};
					`;
				case Pillar.Sport:
					return css`
						color: ${sport[400]};
					`;
				case Pillar.Opinion:
					return css`
						color: ${opinion[400]};
					`;
				case ArticleSpecial.Labs:
					return css`
						color: ${labs[400]};
					`;
				case ArticleSpecial.SpecialReport:
					return css`
						color: ${specialReport[400]};
					`;
				case ArticleSpecial.SpecialReportAlt:
					return css`
						color: ${palette.specialReportAlt[200]};
					`;
			}
	}
};
