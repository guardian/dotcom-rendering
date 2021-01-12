import React, { useEffect } from 'react';

import { breakpoints } from '@guardian/src-foundations/mq';

import { makeGuardianBrowserCAPI } from '@root/src/model/window-guardian';

import { PrintShop } from '@root/fixtures/PrintShop';

import { NAV } from '@root/fixtures/NAV';

import { HydrateApp } from '@root/src/web/components/HydrateApp';
import { embedIframe } from '@root/src/web/browser/embedIframe/embedIframe';
import { mockRESTCalls } from '@root/src/web/lib/mockRESTCalls';

import { DecideLayout } from '@root/src/web/layouts/DecideLayout';

mockRESTCalls();

export default {
	title: 'Examples/PrintShop',
	parameters: {
		chromatic: { viewports: [1300], delay: 800, diffThreshold: 0.2 },
	},
};

// HydratedLayout is used here to simulated the hydration that happens after we init react on
// the client. We need a separate component so that we can make use of useEffect to ensure
// the hydrate step only runs once the dom has been rendered.
const HydratedLayout = ({ ServerCAPI }: { ServerCAPI: CAPIType }) => {
	useEffect(() => {
		const CAPI = makeGuardianBrowserCAPI(ServerCAPI);
		HydrateApp({ CAPI, NAV });
		embedIframe();
	}, [ServerCAPI]);
	return <DecideLayout CAPI={ServerCAPI} NAV={NAV} />;
};

export const PrintShopStory = () => {
	const ServerCAPI = PrintShop;
	return <HydratedLayout ServerCAPI={ServerCAPI} />;
};
PrintShopStory.story = {
	name: 'PrintShop',
	// Set the viewports in Chromatic to capture this story at each breakpoint
	chromatic: {
		viewports: [
			breakpoints.mobile,
			breakpoints.mobileMedium,
			breakpoints.phablet,
			breakpoints.tablet,
			breakpoints.desktop,
			breakpoints.leftCol,
			breakpoints.wide,
		],
	},
};
