import type { Theme } from '@emotion/react';
import {
	brand,
	error,
	focus,
	neutral,
	success,
} from '@guardian/source-foundations';

// Themes for source components in dark mode
// These could be exported from source
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

export const darkTheme = {
	label: labelDarkTheme,
	checkbox: checkboxDarkTheme,
	textInput: textInputDarkTheme,
	select: selectDarkTheme,
	radio: radioDarkTheme,
};

const getPrefersDark = (): boolean =>
	window.matchMedia('(prefers-color-scheme: dark)').matches;

export const getTheme = (): Theme => getPrefersDark() && darkTheme;
