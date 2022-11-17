import {
	neutral,
	error,
	success,
	focus,
} from '@guardian/source-foundations';
import {
	text,
} from '@guardian/common-rendering/src/editorialPalette';
import type { ArticleFormat } from '@guardian/libs';

const useDark = window.matchMedia('(prefers-color-scheme: dark)').matches

const calloutLightTheme = (format: ArticleFormat) => ({
	background: neutral[97],
	primary: text.calloutPrimary(format),
	text: neutral[7],
	error: error[400],
	supporting: neutral[60],
	border: neutral[86],


})
const calloutDarkTheme = (format: ArticleFormat) => ({
	background: neutral[7],
	primary: text.calloutPrimaryDark(format),
	text: neutral[86],
	error: error[500],
	supporting: neutral[60],
	border: neutral[20],

	expander: {
		expandButton: neutral[0],
		collapseButton: neutral[0],
		overlayBackground: neutral[7],
	},

	// Can we move these dark themes to source?
	label: {
		textLabel: neutral[97],
		textOptional: neutral[60],
		textSupporting: neutral[60],
		textError: error[500],
		textSuccess: success[500],
	},
	checkbox: {
		border: neutral[46],
		borderError: error[500],
		textLabel: neutral[97],
		textLabelSupporting: neutral[60],
		textIndeterminate: neutral[60],
	},
	textInput: {
		textUserInput: neutral[97],
		textLabel: neutral[97],
		textLabelOptional: neutral[46],
		textLabelSupporting: neutral[46],
		textError: neutral[97],
		textSuccess: success[400],
		backgroundInput: neutral[7],
		border: neutral[46],
		borderActive: focus[400],
		borderError: error[500],
		borderSuccess: success[500],
	},
	select: {
		textUserInput: neutral[97],
		textLabel: neutral[97],
		textLabelOptional: neutral[46],
		textLabelSupporting: neutral[46],
		textError: neutral[97],
		textSuccess: success[500],
		backgroundInput: neutral[7],
		border: neutral[46],
		borderActive: focus[400],
		borderError: error[500],
		borderSuccess: success[500],
	},
	radio: {
		borderHover: focus[400],
		border: neutral[46],
		backgroundChecked: focus[400],
		textLabel: neutral[97],
		textLabelSupporting: neutral[60],
		borderError: error[500],
	},
})

export const getTheme = (format: ArticleFormat) => useDark ? calloutDarkTheme(format) : calloutLightTheme(format)
