import type { Theme } from '@emotion/react';
import { text } from '@guardian/common-rendering/src/editorialPalette';
import type { ArticleFormat } from '@guardian/libs';
import {
	brand,
	error,
	focus,
	neutral,
	success,
} from '@guardian/source-foundations';
import {
	fileInputDarkTheme,
	fileInputThemeDefault,
} from '@guardian/source-react-components-development-kitchen';

const labelDarkTheme = {
	textLabel: neutral[97],
	textOptional: neutral[60],
	textSupporting: neutral[60],
	textError: error[500],
	textSuccess: success[500],
};

const checkboxDarkTheme = {
	border: neutral[60],
	borderHover: brand[500],
	borderChecked: brand[500],
	borderError: error[500],
	backgroundChecked: brand[500],
	textLabel: neutral[97],
	textLabelSupporting: neutral[60],
	textIndeterminate: neutral[60],
};

const textInputDarkTheme = {
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
};

const selectDarkTheme = {
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
};

const radioDarkTheme = {
	borderHover: focus[400],
	border: neutral[46],
	backgroundChecked: focus[400],
	textLabel: neutral[97],
	textLabelSupporting: neutral[60],
	borderError: error[500],
};

const expandingWrapperDarkTheme = {
	border: neutral[60],
	expandBackground: neutral[86],
	expandText: neutral[7],
	collapseBackground: neutral[10],
	collapseText: neutral[86],
};
const userFeedbackDarkTheme = {
	textError: error[500],
};

export const darkTheme = {
	label: labelDarkTheme,
	checkbox: checkboxDarkTheme,
	textInput: textInputDarkTheme,
	select: selectDarkTheme,
	radio: radioDarkTheme,
	expander: expandingWrapperDarkTheme,
	userFeedback: userFeedbackDarkTheme,
	...fileInputDarkTheme,
};

type LightThemeType = {
	fileInput: {
		text: string;
		supporting: string;
		primary: string;
		error: string;
	};
};

export const lightThemeOverrides = (format: ArticleFormat): LightThemeType => ({
	fileInput: {
		...fileInputThemeDefault.fileInput,
		primary: text.calloutPrimary(format),
	},
});

const getPrefersDark = (): boolean => {
	if (typeof window === 'undefined') return false;
	return window.matchMedia('(prefers-color-scheme: dark)').matches;
};

export const getTheme = (format: ArticleFormat): Theme =>
	getPrefersDark() ? darkTheme : lightThemeOverrides(format);
