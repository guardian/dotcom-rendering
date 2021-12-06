import { useEffect } from 'react';

import {
	makeGuardianBrowserCAPI,
	makeGuardianBrowserNav,
} from '@root/src/model/window-guardian';

import { decideTheme } from '@root/src/web/lib/decideTheme';
import { decideDisplay } from '@root/src/web/lib/decideDisplay';
import { decideDesign } from '@root/src/web/lib/decideDesign';

import { Article } from '@root/fixtures/generated/articles/Article';

import { BootReact } from '@root/src/web/components/BootReact';
import { embedIframe } from '@root/src/web/browser/embedIframe/embedIframe';
import { mockRESTCalls } from '@root/src/web/lib/mockRESTCalls';

import { extractNAV } from '@root/src/model/extract-nav';
import { fireAndResetHydrationState } from '@root/src/web/components/HydrateOnce';
import { DecideLayout } from './DecideLayout';

mockRESTCalls();

export default {
	title: 'Layouts/InteractiveImmersive',
	parameters: {
		chromatic: { viewports: [1300], delay: 800, diffThreshold: 0.2 },
	},
};

const convertToInteractiveImmersive = (CAPI: CAPIType) => {
	return {
		...CAPI,
		format: {
			...CAPI.format,
			display: 'ImmersiveDisplay' as CAPIDisplay,
			design: 'InteractiveDesign' as CAPIDesign,
		},
	};
};

// HydratedLayout is used here to simulated the hydration that happens after we init react on
// the client. We need a separate component so that we can make use of useEffect to ensure
// the hydrate step only runs once the dom has been rendered.
const HydratedLayout = ({ ServerCAPI }: { ServerCAPI: CAPIType }) => {
	fireAndResetHydrationState();
	const NAV = extractNAV(ServerCAPI.nav);
	const format: ArticleFormat = {
		display: decideDisplay(ServerCAPI.format),
		design: decideDesign(ServerCAPI.format),
		theme: decideTheme(ServerCAPI.format),
	};

	useEffect(() => {
		const CAPI = makeGuardianBrowserCAPI(ServerCAPI);
		BootReact({ CAPI, NAV: makeGuardianBrowserNav(NAV) });
		embedIframe().catch((e) =>
			console.error(`HydratedLayout embedIframe - error: ${e}`),
		);
	}, [ServerCAPI, NAV]);
	return <DecideLayout CAPI={ServerCAPI} NAV={NAV} format={format} />;
};

export const ArticleStory = (): React.ReactNode => {
	const ServerCAPI = convertToInteractiveImmersive(Article);
	return <HydratedLayout ServerCAPI={ServerCAPI} />;
};
ArticleStory.story = { name: 'Article' };
