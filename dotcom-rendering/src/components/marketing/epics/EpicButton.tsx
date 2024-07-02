/**
 * @file
 * This file was migrated from:
 * https://github.com/guardian/support-dotcom-components/blob/9c3eae7cb0b159db4a1c40679d6b37710b0bb937/packages/modules/src/modules/epics/Button.tsx
 */
import type { SerializedStyles } from '@emotion/react';
import { css } from '@emotion/react';
import { ThemeProvider } from '@emotion/react';
import type { OphanComponentEvent } from '@guardian/libs';
import { palette } from '@guardian/source/foundations';
import {
	Button as DSButton,
	LinkButton,
	SvgArrowRightStraight,
} from '@guardian/source/react-components';
import React from 'react';
import type { ReactComponent } from '../lib/ReactComponent';
import {
	OPHAN_COMPONENT_EVENT_PRIMARY_CTA,
	OPHAN_COMPONENT_EVENT_SECONDARY_CTA,
} from './utils/ophan';

// Custom theme for Button/LinkButton
// See also `tertiaryButtonOverrides` below.
const buttonStyles = {
	textPrimary: palette.neutral[7],
	backgroundPrimary: palette.brandAlt[400],
	backgroundPrimaryHover: palette.brandAlt[300],
	textSecondary: palette.neutral[7],
	backgroundSecondary: palette.neutral[93],
	backgroundSecondaryHover: palette.neutral[86],
	borderSecondary: palette.neutral[86],
};

const contributionsTheme = {
	button: buttonStyles,
	link: buttonStyles,
};

type Url = string;

type Props = {
	// Accept a function or a string;
	// A function will render a <Button>
	// A string will render a <LinkButton>
	// Both using the same interface
	// eslint-disable-next-line @typescript-eslint/ban-types
	onClickAction: Function | Url;
	submitComponentEvent?: (event: OphanComponentEvent) => void;
	children: React.ReactElement | string;
	priority?: 'primary' | 'secondary';
	showArrow?: boolean;
	isTertiary?: boolean;
	cssOverrides?: SerializedStyles;
	icon?: React.ReactElement;
};

// Overrides for tertiary button
// Unfortunatly they all need !important :(
const tertiaryButtonOverrides = css`
	/* stylelint-disable-next-line declaration-no-important */
	border: 1px solid ${palette.neutral[7]} !important;
	/* stylelint-disable-next-line declaration-no-important */
	background-color: transparent !important;

	:hover {
		/* stylelint-disable-next-line declaration-no-important */
		background-color: ${palette.neutral[86]} !important;
	}
`;

export const EpicButton: ReactComponent<Props> = (allProps: Props) => {
	const {
		onClickAction,
		submitComponentEvent,
		children,
		showArrow = false,
		priority = 'primary',
		isTertiary,
		cssOverrides,
		icon,
		...props
	} = allProps;

	const onButtonCtaClick = () => {
		if (submitComponentEvent) {
			submitComponentEvent(
				priority == 'primary'
					? OPHAN_COMPONENT_EVENT_PRIMARY_CTA
					: OPHAN_COMPONENT_EVENT_SECONDARY_CTA,
			);
		}
	};

	if (typeof onClickAction === 'string') {
		// LinkButton doesn't support 'tertiary' priority (unlike Button)
		// So we'll map that to 'primary' and apply a CSS override on both of
		// them so they get the same styles for 'tertiary' priority
		return (
			<ThemeProvider theme={contributionsTheme}>
				<LinkButton
					href={onClickAction}
					icon={icon ?? <SvgArrowRightStraight />}
					iconSide="right"
					onClick={onButtonCtaClick}
					target="_blank"
					rel="noopener noreferrer"
					priority={isTertiary ? 'primary' : priority}
					css={
						isTertiary
							? [tertiaryButtonOverrides, cssOverrides]
							: cssOverrides
					}
					{...props}
				>
					{children}
				</LinkButton>
			</ThemeProvider>
		);
	}
	return (
		<ThemeProvider theme={contributionsTheme}>
			<DSButton
				iconSide="right"
				icon={showArrow ? <SvgArrowRightStraight /> : undefined}
				onClick={(): void => onClickAction()}
				priority={isTertiary ? 'primary' : priority}
				css={
					isTertiary
						? [tertiaryButtonOverrides, cssOverrides]
						: cssOverrides
				}
				{...props}
			>
				{children}
			</DSButton>
		</ThemeProvider>
	);
};
