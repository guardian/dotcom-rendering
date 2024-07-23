/**
 * @file
 * This is a hard coded support ask as a test to see if it works.
 * If it does, it may become a more standard feature.
 */

import { css, ThemeProvider } from '@emotion/react';
import { palette, space, textSans15 } from '@guardian/source/foundations';
import {
	LinkButton,
	SvgArrowRightStraight,
} from '@guardian/source/react-components';
import type { Tracking } from '@guardian/support-dotcom-components/dist/shared/src/types/props/shared';
import { useEffect, useMemo, useState } from 'react';
import { submitComponentEvent } from '../client/ophan/ophan';
import { shouldHideSupportMessaging } from '../lib/contributions';
import { useAB } from '../lib/useAB';
import { useIsSignedIn } from '../lib/useAuthStatus';
import { useCountryCode } from '../lib/useCountryCode';
import { useIsInView } from '../lib/useIsInView';
import { usePageViewId } from '../lib/usePageViewId';
import { useConfig } from './ConfigContext';
import type { ReactComponent } from './marketing/lib/ReactComponent';
import {
	addRegionIdAndTrackingParamsToSupportUrl,
	createClickEventFromTracking,
	createInsertEventFromTracking,
	createViewEventFromTracking,
} from './marketing/lib/tracking';
import { TagType } from 'src/types/tag';

const baseUrl = 'https://support.theguardian.com/contribute';

// CSS Styling
// -------------------------------------------

// outer container
const stickyLeft = css`
	background: ${palette.neutral[100]};
	position: sticky;
	top: ${space[3]}px;
	width: 220px;
	margin-left: ${space[5]}px;
	margin-top: ${space[6]}px;
`;
const container = css`
	background: ${palette.neutral[100]};
	width: 220px;

	box-sizing: border-box;

	/* Auto layout */
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	padding: 0px;
	gap: ${space[1]}px;
`;

const imageHeader = css`
	background-color: ${palette.brand[400]};
	text-align: center;
	padding: 15px 0;
	width: 220px;
	height: 132px;
`;
// contains the text and cta
const textBlock = css`
	/* Auto layout */
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	padding: ${space[2]}px;
	gap: ${space[1]}px;
`;
const bodySection = css`
	color: ${palette.neutral[0]};
	${textSans15};
	left: ${space[8]}px;
`;
const ctaSection = css`
	color: ${palette.neutral[0]};
	margin-top: ${space[3]}px;
	margin-bottom: ${space[4]}px;
`;
const cta = css`
	left: ${space[2]}px;
	min-width: 100%;
	width: 100%;
	min-height: 30px;
	height: 30px;
`;
const buttonStyles = {
	textPrimary: palette.neutral[7],
	backgroundPrimary: palette.brandAlt[400],
	backgroundPrimaryHover: palette.brandAlt[300],
};
const contributionsTheme = {
	button: buttonStyles,
	link: buttonStyles,
};
const notForSaleSvg = () => (
	<svg
		width="150"
		height="100"
		fill="none"
		aria-labelledby="rr__notForSaleBrandIcon"
	>
		<title id="rr__notForSaleBrandIcon">Not for sale</title>
		<path
			fill="#fff"
			d="M5 17V4.5l.1-.5c.3 0 .3.2.4.3L7.2 7l5.2 8.8 5.2 8.7 4.8 8.2c.3.4.6.6 1.1.6h3.7c.9 0 .9 0 .9-.9V3.6c0-.3 0-.6.4-.7l1.4-1 1.6-1c.3-.1.3-.4.2-.7 0-.2-.3-.2-.4-.2h-8.1c-.2 0-.5 0-.5.3-.1.2 0 .5.2.6l.3.2 3.4 1.7c.4.2.6.5.6 1v18c0 .1 0 .3-.2.3-.1 0-.2 0-.2-.2l-.9-1.4-5.8-9.8-6-10.3c-.2-.3-.4-.4-.8-.4H.5C.3 0 0 0 0 .3c0 .2 0 .5.3.6l.4.2 2.7.9c.4.1.7.4.7 1v26.8c0 .2-.1.4-.4.5l-3.3 2c-.4.1-.4.4-.4.7.1.4.4.3.7.3h8.1c.3 0 .6 0 .6-.3.1-.3 0-.5-.3-.7l-3.5-1.9c-.5-.2-.6-.5-.6-1V17.2ZM55.6 12.6a11.2 11.2 0 0 0-8.2-6.3 15 15 0 0 0-8.2.6c-4 1.5-6.7 4.3-7.6 8.6-.8 3.7-.3 7.2 1.4 10.6 1.8 3.7 5 5.9 9 6.4 2.7.4 5.2 0 7.7-1 2.3-.9 4.1-2.3 5.5-4.4 1.4-2.2 2-4.6 2-7.2 0-2.6-.5-5-1.6-7.3Zm-7.5 17c-.5 1.7-2.1 2.6-3.8 1.9-.8-.3-1.2-1-1.6-1.7-.8-1.4-1.1-3-1.4-4.5-.9-4.2-1.4-8.5-1.4-12.8 0-1.3 0-2.5.5-3.7.8-2 3.3-2.5 4.8-.9.5.6.8 1.3 1 2a64.6 64.6 0 0 1 2.3 15.6c0 1.3 0 2.7-.4 4ZM98.8 97.1c0-.3-.3-.3-.5-.4l-1.3-.3c-.5 0-.7-.3-.7-.8V80.2c0-1.2-.1-2.3-.5-3.4-.4-1-1-1.9-1.9-2.6-1.4-1-3-1.5-4.7-1.8-4.3-.5-8.5 0-12.6 1.3-.4 0-.5.3-.5.6v6.9c0 .1-.2.4 0 .4.3 0 .6.1.8 0l.2-.4 5.2-7.2c.5-.7 1.1-1 2-.9h.3c1 .2 1.8.6 2.3 1.5.4.7.6 1.4.7 2.2.2 2 .2 4 .2 6 0 .3-.1.5-.4.5l-3.8.8c-2 .4-4 .7-5.9 1.8a6.3 6.3 0 0 0-2.9 3.3c-.5 1.5-.5 3-.3 4.4a5.9 5.9 0 0 0 3.6 4.6c2.8 1.2 7.2.8 9.5-2.1.3-.5.4-.4.6 0a4.3 4.3 0 0 0 2.9 2.2 11.4 11.4 0 0 0 7.3-.6c.2-.1.4-.3.4-.6Zm-11.7-2c-1.6.8-3.6.3-4.2-1.8-.5-2.1-.6-4.3.1-6.5.4-1.2 1.3-2 2.6-2.1l1.6-.2c.6 0 .6 0 .6.6v9c0 .5-.2.9-.7 1ZM47 35.2l-4 .4c-1.8.3-3.5.7-5.1 1.6A7.3 7.3 0 0 0 34 44c0 1.3.2 2.5.4 3.7.1.4 0 .6-.3.8l-2 1c-.3 0-.2.3-.2.6 0 .2.3.2.5.2l1.9-.3c.3 0 .5 0 .5.4l.2 1 1 8 1 6.7.8 5.1c0 .5-.2.7-.5.8l-1.6.7c-.4.1-.4.3-.3.6 0 .3.3.3.5.3h.5l12.7-2c.3 0 .5 0 .5-.3s-.1-.5-.5-.5l-2.3-.2c-.4 0-.7-.1-.7-.6l-.6-4-1.4-9.8-1-6.8c0-.3 0-.6.5-.7l2.8-.4c1.5-.2 1.3.1 1.1-1.4 0-.4-.2-.5-.6-.5l-3.4.6c-.6 0-.7 0-.8-.6l-.6-5c-.2-1-.2-2 0-3 0-.5.2-1 .6-1.3.8-.7 1.1-.8 1.7 0l4.6 5.4c.3.3.5.4.8.3.4-.2.2-.5.2-.7l-1-6.4c0-.3-.2-.4-.4-.4H47ZM137.3 80.2a9.2 9.2 0 0 0-2.3-4 8.8 8.8 0 0 0-4.7-2.4c-3.1-.6-6.2-.5-9.2.8-2.5 1.1-4.4 3-5.5 5.5-1.8 4.5-1.7 9 0 13.4 1 2.4 2.8 4.1 5.2 5.2 3.2 1.5 6.6 1.6 10 .9 2-.5 3.8-1.4 5.3-2.8l1-1.2V95c-.2-.2-.4 0-.6 0-.6.3-1.4.5-2 .6-1.6.2-3.2.3-4.7.1-3-.4-5-2-6.1-4.8-.5-1.5-.7-3-.8-4.4 0-.7 0-.7.6-.7h13.8c.5 0 .6 0 .6-.6a17 17 0 0 0-.6-5Zm-8 4.4h-3l-3 .2c-.3 0-.5 0-.5-.4 0-2.4.1-5 1-7.3.2-.7.5-1.4 1-2 1.3-1.3 3.3-1 4 .8.6 1.3.8 2.7 1 4l.1 4c0 .5-.1.7-.5.7ZM100.5 99.2l12.7-.8c.2 0 .4 0 .4-.4 0-.2 0-.4-.4-.5l-1.7-.3c-.4-.1-.6-.3-.7-.7l-.3-4.3-.7-11-.7-11.8-.5-6.6c0-.4-.1-.5-.5-.6l-1.5.3-8.6 1.8c-.2 0-.5 0-.5.4s.2.5.5.6l2 .6c.3.1.4.3.5.7l.2 4.4 1.4 20.8.3 5.3c0 .3 0 .5-.3.6l-1.7.6c-.3.1-.5.3-.5.6.1.4.4.3.6.3ZM70.2 77H70l-.2-3c0-.3-.1-.4-.5-.5a25.7 25.7 0 0 0-11-.1 8 8 0 0 0-3.7 2.2 7.8 7.8 0 0 0-1.9 5.7c0 1.8.6 3.4 1.9 4.8a14 14 0 0 0 4 3c1.5.7 3.2 1.3 4.7 2.2 1.8 1 2.6 2.2 2 4.8-.2.9-.8 1.5-1.6 2a5 5 0 0 1-3 .3c-.4 0-.7-.2-1-.5L57 94.6l-3.2-3.8c-.3-.2-.5-.3-.8-.2-.3.1-.2.4-.2.6l.2 6.3c0 .4.2.6.6.8 1.5.4 3 .7 4.6.9 2.8.2 5.5.3 8.2-.5 1.3-.5 2.5-1 3.5-2 2.2-2.5 2.5-5.3 1.7-8.3a7.2 7.2 0 0 0-3.1-4.2c-2-1.4-4.4-2.2-6.6-3.4-1.2-.6-2.3-1.3-2.6-2.7-.4-1.6.2-3.3 1.3-4 1.1-.6 2.3-.6 3.6-.3l.3.3 1.5 2 3.2 4.2c.2.2.4.3.7.3.4-.1.3-.4.3-.7v-2.8ZM59.7 27.7c0 .8.1 1.5.3 2.2.4 2.5 1.9 4 4.2 4.6a9.8 9.8 0 0 0 9.2-1.8c.2-.2.3-.5.2-.7 0-.3-.3-.2-.5-.2-1 0-2.1 0-3.1-.3-.6-.2-1.1-.5-1.5-1-.4-.8-.4-1.7-.3-2.5l1.3-16.2c0-.7.1-.7.8-.7l3.7.4c1.2 0 1.2 0 1.3-1.2 0-.4-.1-.5-.4-.5l-4.5-.4c-.6 0-.6-.1-.6-.7l.5-5c0-.6 0-.6-.6-.6l-7.4.5c-.4 0-.5.2-.5.5l-.4 4c0 .4-.1.5-.5.6l-2.8.4c-.3.1-.4.3-.4.6s.2.4.5.4l2.4.2c.6 0 .7 0 .6.8l-.7 8.3-.8 8.3ZM96.1 44.8h.2c0-1 0-2.2.2-3.2 0-.4-.2-.5-.5-.6a5 5 0 0 0-5.2 2.2c-1 1.3-1.5 2.8-2 4.3 0 .2-.1.5-.3.4-.2 0 0-.2 0-.4l.2-5.3c.1-1.5 0-1.5-1.4-1.4l-9.2.8c-.2 0-.4 0-.4.4 0 .2 0 .5.3.6l1.8.8c.4.2.6.4.5.9l-1 19.8c0 .4-.2.5-.6.6-.6 0-1.2.2-1.7.3-.3 0-.5.2-.5.5 0 .4.3.4.6.4l5.7.4 7.6.4c.5 0 .7-.3.5-.6 0-.2-.3-.3-.4-.3l-2.3-.6c-.4 0-.6-.3-.5-.7v-1.6l.8-13c0-1 0-1 .9-1.2 2-.4 4-.3 6-.1.7 0 .7 0 .7-.7v-3.1ZM144.6 99.9c2.6 0 4.7-2 4.6-4.8 0-2.6-2-4.5-4.7-4.5s-4.7 2-4.7 4.6c0 2.7 2 4.7 4.8 4.7Z"
		/>
		<path
			fill="#fff"
			d="M5 17v12.5c0 .4.1.7.6 1 1.2.5 2.3 1.2 3.5 1.8.3.2.4.4.3.7 0 .4-.3.3-.6.3H.7c-.3 0-.6 0-.7-.3 0-.3 0-.6.4-.8l3.3-1.9c.3-.1.4-.3.4-.5V2.9c0-.5-.3-.8-.7-1L.7 1.2.3.9C0 .8 0 .5 0 .3 0 0 .3 0 .5 0h12.8c.4 0 .6.1.8.4l6 10.3 5.8 9.8.9 1.4c0 .1 0 .3.2.2.2 0 .2-.2.2-.3v-18c0-.5-.2-.8-.6-1l-3.4-1.7-.3-.2c-.3-.1-.3-.4-.2-.6 0-.3.3-.3.5-.3h8c.2 0 .5 0 .5.2 0 .3 0 .6-.2.7l-1.6 1-1.4 1c-.3.1-.4.4-.4.7v28.8c0 .9 0 .9-1 .9h-3.6c-.5 0-.8-.2-1-.6l-5-8.2-5-8.7L7.1 7 5.5 4.2c0-.1-.1-.4-.4-.3-.2 0 0 .3 0 .5V17ZM55.6 12.6a11.2 11.2 0 0 0-8.2-6.3 15 15 0 0 0-8.2.6c-4 1.5-6.7 4.3-7.6 8.6-.8 3.7-.3 7.2 1.4 10.6 1.8 3.7 5 5.9 9 6.4 2.7.4 5.2 0 7.7-1 2.3-.9 4.1-2.3 5.5-4.4 1.4-2.2 2-4.6 2-7.2 0-2.6-.5-5-1.6-7.3Zm-7.5 17c-.5 1.7-2.1 2.6-3.8 1.9-.8-.3-1.2-1-1.6-1.7-.8-1.4-1.1-3-1.4-4.5-.9-4.2-1.4-8.5-1.4-12.8 0-1.3 0-2.5.5-3.7.8-2 3.3-2.5 4.8-.9.5.6.8 1.3 1 2a64.6 64.6 0 0 1 2.3 15.6c0 1.3 0 2.7-.4 4ZM75.3 50.5c-.5-3-2-5.6-4.5-7.4-2.6-2-5.6-2.7-8.7-2.8-1 0-2 0-3 .3-4 1-6.6 3.3-8.2 7a16.3 16.3 0 0 0-1.2 8.7c.3 2.8 1.5 5.2 3.6 7.2a14.7 14.7 0 0 0 12.3 3.2c4-.8 6.8-3.3 8.5-7 1.2-3 1.7-6 1.2-9.2ZM66.5 53c-.3 2.2-.7 4.4-1.3 6.6-.5 1.7-1 3.4-2 4.9-.3.6-.7 1-1.4 1.4-1.4.5-3-.2-3.6-1.6a10 10 0 0 1-.4-3.6 67.6 67.6 0 0 1 3.5-17l1-1.4c1.3-1.4 3.7-1 4.5.8.5 1 .4 2.2.4 3.3 0 2.2-.3 4.4-.7 6.6ZM98.8 97.1c0-.3-.3-.3-.5-.4l-1.3-.3c-.5 0-.7-.3-.7-.8V80.2c0-1.2-.1-2.3-.5-3.4-.4-1-1-1.9-1.9-2.6-1.4-1-3-1.5-4.7-1.8-4.3-.5-8.5 0-12.6 1.3-.4 0-.5.3-.5.6v6.9c0 .1-.2.4 0 .4.3 0 .6.1.8 0l.2-.4 5.2-7.2c.5-.7 1.1-1 2-.9h.3c1 .2 1.8.6 2.3 1.5.4.7.6 1.4.7 2.2.2 2 .2 4 .2 6 0 .3-.1.5-.4.5l-3.8.8c-2 .4-4 .7-5.9 1.8a6.3 6.3 0 0 0-2.9 3.3c-.5 1.5-.5 3-.3 4.4a5.9 5.9 0 0 0 3.6 4.6c2.8 1.2 7.2.8 9.5-2.1.3-.5.4-.4.6 0a4.3 4.3 0 0 0 2.9 2.2 11.4 11.4 0 0 0 7.3-.6c.2-.1.4-.3.4-.6Zm-11.7-2c-1.6.8-3.6.3-4.2-1.8-.5-2.1-.6-4.3.1-6.5.4-1.2 1.3-2 2.6-2.1l1.6-.2c.6 0 .6 0 .6.6v9c0 .5-.2.9-.7 1Z"
		/>
		<path
			fill="#fff"
			d="M47 35.2h1.6c.2 0 .3.1.4.4l1 6.4c0 .2.2.5-.2.7-.3 0-.5 0-.8-.3L44.4 37c-.6-.8-1-.7-1.7 0-.4.3-.5.8-.6 1.3-.2 1-.2 2 0 3l.6 5c.1.5.2.6.8.6l3.4-.6c.4 0 .6 0 .6.5.2 1.5.4 1.2-1 1.4l-3 .4c-.4 0-.4.4-.3.7l1 6.8 1.3 9.8.6 4c0 .5.3.6.7.6l2.3.2c.4 0 .5.2.5.5 0 .4-.2.3-.5.4l-12.7 1.8h-.5c-.2 0-.5.1-.5-.2 0-.3 0-.5.3-.6l1.6-.7c.4-.1.5-.3.5-.8L37 66l-1-6.7-1-8-.2-1c0-.3-.2-.4-.5-.4l-2 .3c-.1 0-.3 0-.4-.2 0-.3-.1-.5.2-.7l2-1c.3-.1.4-.3.3-.7a21 21 0 0 1-.4-3.7c0-3 1.3-5.2 3.9-6.7 1.6-.9 3.3-1.3 5-1.6l4.1-.4ZM137.3 80.2a9.2 9.2 0 0 0-2.3-4 8.8 8.8 0 0 0-4.7-2.4c-3.1-.6-6.2-.5-9.2.8-2.5 1.1-4.4 3-5.5 5.5-1.8 4.5-1.7 9 0 13.4 1 2.4 2.8 4.1 5.2 5.2 3.2 1.5 6.6 1.6 10 .9 2-.5 3.8-1.4 5.3-2.8l1-1.2V95c-.2-.2-.4 0-.6 0-.6.3-1.4.5-2 .6-1.6.2-3.2.3-4.7.1-3-.4-5-2-6.1-4.8-.5-1.5-.7-3-.8-4.4 0-.7 0-.7.6-.7h13.8c.5 0 .6 0 .6-.6a17 17 0 0 0-.6-5Zm-8 4.4h-3l-3 .2c-.3 0-.5 0-.5-.4 0-2.4.1-5 1-7.3.2-.7.5-1.4 1-2 1.3-1.3 3.3-1 4 .8.6 1.3.8 2.7 1 4l.1 4c0 .5-.1.7-.5.7ZM100.5 99.2c-.2 0-.5.1-.6-.3 0-.3.2-.5.5-.6l1.7-.6c.3 0 .4-.3.3-.6 0-1.8-.2-3.6-.3-5.3L100.7 71l-.2-4.4c0-.4-.2-.6-.6-.7l-1.9-.6c-.3 0-.5-.2-.5-.6 0-.4.3-.4.5-.4l8.6-1.8 1.5-.3c.4 0 .5.2.5.6l.5 6.6.7 11.8.7 11 .3 4.3c0 .4.3.6.7.7l1.7.3c.3 0 .4.3.4.5 0 .3-.2.4-.4.4l-12.7.8ZM70.2 77v3c0 .2 0 .5-.3.6-.3 0-.5 0-.7-.3L66 76a224 224 0 0 1-1.8-2.3 4.5 4.5 0 0 0-3.6.3c-1.1.7-1.7 2.4-1.3 4 .3 1.4 1.4 2.1 2.6 2.7 2.2 1.2 4.5 2 6.6 3.4 1.5 1 2.7 2.4 3.1 4.2.8 3 .5 5.8-1.7 8.2-1 1-2.2 1.6-3.5 2a21 21 0 0 1-8.2.6c-1.6-.2-3-.5-4.6-1-.4 0-.5-.3-.6-.7l-.2-6.3c0-.2-.1-.5.2-.6.3 0 .5 0 .8.2l3.2 3.8c1 1.1 2 2.2 2.8 3.3.3.3.6.5 1 .5 1 .2 2 0 3-.4.8-.4 1.4-1 1.6-2 .6-2.5-.2-3.6-2-4.7-1.5-.9-3.2-1.5-4.7-2.3-1.5-.8-3-1.6-4-3a7.2 7.2 0 0 1-1.9-4.7c0-2.1.5-4 2-5.7a8 8 0 0 1 3.5-2.2c2.2-.7 4.4-.6 6.6-.5 1.5 0 3 .2 4.5.6.4 0 .5.2.5.6l.2 3ZM59.7 27.7l.8-8.3.7-8.3c0-.7 0-.8-.6-.8l-2.4-.2c-.3 0-.5 0-.5-.4 0-.3.1-.5.4-.6l2.8-.4c.4 0 .5-.2.5-.6l.4-4c0-.3.1-.5.5-.5l7.4-.5c.6 0 .6 0 .6.6l-.5 5c0 .6 0 .6.6.7l4.5.4c.3 0 .4.1.4.5 0 1.3 0 1.3-1.3 1.2l-3.7-.4c-.7 0-.7 0-.8.7L68.2 28c-.1.8-.1 1.7.3 2.4.4.6.9 1 1.5 1 1 .4 2 .4 3 .4.3 0 .5-.1.6.2 0 .2 0 .5-.2.7a9.8 9.8 0 0 1-9.2 1.9 5.5 5.5 0 0 1-4.2-4.7 13 13 0 0 1-.3-2.2ZM96.1 44.8V48c0 .7 0 .7-.7.6-2-.2-4-.3-6 .1-1 .2-.9.2-1 1.1L87.8 63v1.6c0 .4.1.6.5.7l2.3.6c.1 0 .3 0 .4.3.2.3 0 .6-.5.6l-7.6-.4-5.7-.4c-.3 0-.6 0-.6-.3 0-.4.2-.5.5-.6l1.7-.3c.4 0 .5-.2.5-.6l1.1-19.8c0-.5 0-.7-.5-.9l-1.8-.8c-.3-.1-.3-.4-.3-.6 0-.3.2-.4.4-.4l9.2-.8c1.5-.1 1.5-.1 1.4 1.4 0 1.8-.2 3.5-.3 5.3 0 .2-.1.4.1.4s.2-.2.3-.4c.5-1.5 1-3 2-4.3A5 5 0 0 1 96 41c.3 0 .5.2.5.6l-.2 3.2h-.2ZM144.6 99.9c-2.7 0-4.7-2-4.8-4.7 0-2.7 2-4.6 4.7-4.6s4.7 2 4.7 4.5c0 2.7-2 4.8-4.7 4.8Z"
		/>
	</svg>
);

// internal component
interface StickyLiveblogAskProps {
	url: string;
	onCtaClick: () => void;
}

export const StickyLiveblogAsk: ReactComponent<StickyLiveblogAskProps> = ({
	url,
	onCtaClick,
}: StickyLiveblogAskProps) => (
	<div css={container}>
		<div css={imageHeader}>{notForSaleSvg()}</div>
		<div css={textBlock}>
			<div css={bodySection}>
				The Guardian’s expert news coverage is funded by people like
				you, not a billionaire owner. Will you help us keep our
				independent journalism free and open to all today?
			</div>
			<div css={ctaSection}>
				<ThemeProvider theme={contributionsTheme}>
					<LinkButton
						href={url}
						icon={<SvgArrowRightStraight />}
						iconSide="right"
						onClick={onCtaClick}
						target="_blank"
						rel="noopener noreferrer"
						priority={'primary'}
						cssOverrides={cta}
					>
						Support us
					</LinkButton>
				</ThemeProvider>
			</div>
		</div>
	</div>
);

// StickyLiveblogAskWrapper to allow us to create story
interface StickyLiveblogAskWrapperProps {
	referrerUrl: string;
	shouldHideReaderRevenueOnArticle: boolean;
	tags: TagType[];
}

const whatAmI = 'sticky-liveblog-ask';

export const StickyLiveblogAskWrapper: ReactComponent<
	StickyLiveblogAskWrapperProps
> = ({ referrerUrl, shouldHideReaderRevenueOnArticle, tags }) => {
	const { renderingTarget } = useConfig();
	const countryCode = useCountryCode(whatAmI);
	const pageViewId = usePageViewId(renderingTarget);

	// should we show ourselves?
	const [showSupportMessagingForUser, setShowSupportMessaging] =
		useState<boolean>(false);
	const isSignedIn = useIsSignedIn();

	useEffect(() => {
		if (isSignedIn !== 'Pending') {
			setShowSupportMessaging(
				shouldHideSupportMessaging(isSignedIn) === false,
			);
		}
	}, [isSignedIn]);

	const ABTestAPI = useAB()?.api;

	const getVariant = (): 'control' | 'variant' | 'not-in-test' => {
		if (ABTestAPI?.isUserInVariant('StickyLiveBlogAskTest', 'variant')) {
			return 'variant';
		} else if (
			ABTestAPI?.isUserInVariant('StickyLiveBlogAskTest', 'control')
		) {
			return 'control';
		}
		return 'not-in-test';
	};

	const variantName = getVariant();
	const userIsInTest = variantName !== 'not-in-test';

	// tracking
	const tracking: Tracking = useMemo(() => {
		return {
			ophanPageId: pageViewId ?? '',
			platformId: 'GUARDIAN_WEB',
			clientName: 'dcr',
			referrerUrl,
			// message tests
			abTestName: whatAmI,
			abTestVariant: variantName,
			campaignCode: whatAmI,
			componentType: 'ACQUISITIONS_OTHER',
		};
	}, [pageViewId, referrerUrl, variantName]);

	const urlWithRegionAndTracking = addRegionIdAndTrackingParamsToSupportUrl(
		baseUrl,
		tracking,
		undefined,
		countryCode,
	);

	// ophan tracking
	const [hasBeenSeen, setNode] = useIsInView({
		debounce: true,
	});

	// send event regardless of variant or control
	// but only where they *could* see the component.
	useEffect(() => {
		if (
			userIsInTest &&
			showSupportMessagingForUser &&
			!shouldHideReaderRevenueOnArticle
		) {
			// For ophan
			void submitComponentEvent(
				createInsertEventFromTracking(tracking, tracking.campaignCode),
				renderingTarget,
			);
		}
	}, [
		tracking,
		renderingTarget,
		showSupportMessagingForUser,
		shouldHideReaderRevenueOnArticle,
		userIsInTest,
	]);

	// capture where it has been displayed (is variant).
	useEffect(() => {
		if (userIsInTest && hasBeenSeen) {
			// For ophan
			void submitComponentEvent(
				createViewEventFromTracking(tracking, tracking.campaignCode),
				renderingTarget,
			);
		}
	}, [hasBeenSeen, tracking, renderingTarget, userIsInTest]);

	const onCtaClick = () => {
		void submitComponentEvent(
			createClickEventFromTracking(tracking, tracking.campaignCode),
			renderingTarget,
		);
	};

	// TODO: 'some' doesn't like underlying array to change
	// I think tags are added as the blog is added to... will this cause an issue?
	const shouldHideBasedOnTags = tags.some((a) => {
		a.id === 'sport/olympic-games-2024';
	});

	const canShow =
		variantName === 'variant' &&
		showSupportMessagingForUser &&
		!shouldHideReaderRevenueOnArticle &&
		!shouldHideBasedOnTags;

	return (
		<>
			{canShow && (
				<div css={stickyLeft} ref={setNode}>
					<StickyLiveblogAsk
						url={urlWithRegionAndTracking}
						onCtaClick={onCtaClick}
					/>
				</div>
			)}
		</>
	);
};
