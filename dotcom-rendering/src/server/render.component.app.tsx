import { isString } from '@guardian/libs';
import type { BannerProps } from '@guardian/support-dotcom-components/dist/shared/types';
import { BasicBanner } from '../components/BasicBanner.importable';
import { ConfigProvider } from '../components/ConfigContext';
import { Island } from '../components/Island';
import { DesignableBanner } from '../components/marketing/banners/designableBanner/DesignableBanner';
import {
	design,
	props,
	stringToHexColour,
} from '../components/marketing/banners/utils/storybook';
import { choiceCardsSettings } from '../components/marketing/lib/storybook';
import {
	ASSET_ORIGIN,
	generateScriptTags,
	getModulesBuild,
	getPathFromManifest,
} from '../lib/assets';
import { renderToStringWithEmotion } from '../lib/emotion';
import { polyfillIO } from '../lib/polyfill.io';
import { createGuardian } from '../model/guardian';
import type { Config } from '../types/configContext';
import { htmlPageTemplate } from './htmlPageTemplate';

const bannerProps: BannerProps = {
	...props,
	design: {
		...design,
		visual: {
			kind: 'ChoiceCards',
			buttonColour: stringToHexColour('F1F8FC'),
		},
	},
	choiceCardsSettings,
};

// Purely server rendered, not interactive
const StaticBanner = () => {
	return <DesignableBanner {...bannerProps} />;
};

// Client rendered, interactive
const Banner = () => {
	return (
		<Island priority="feature" defer={{ until: 'visible' }}>
			<BasicBanner {...bannerProps} />
		</Island>
	);
};

interface Props {
	name: 'banner' | 'static-banner';
}
export const renderComponent = ({
	name,
}: Props): { html: string; prefetchScripts: string[] } => {
	const guardian = createGuardian({
		abTests: {},
		adUnit: '',
		ajaxUrl: '',
		dfpAccountId: '',
		editionId: 'UK',
		frontendAssetsFullURL: '',
		googletagUrl: '',
		revisionNumber: '',
		sentryHost: '',
		sentryPublicApiKey: '',
		serverSideABTests: {},
		stage: 'DEV',
		switches: {},
	});
	const config = {
		renderingTarget: 'Apps',
		darkModeAvailable: false,
		assetOrigin: ASSET_ORIGIN,
		editionId: 'UK',
	} satisfies Config;

	const build = getModulesBuild({ tests: {}, switches: {} });
	const prefetchScripts = [
		polyfillIO,
		getPathFromManifest(build, 'frameworks.js'),
		getPathFromManifest(build, 'index.js'),
	].filter(isString);
	const scriptTags = generateScriptTags(prefetchScripts);

	const { html, extractedCss } = renderToStringWithEmotion(
		<ConfigProvider value={config}>
			<div>
				{name === 'static-banner' && <StaticBanner />}
				{name === 'banner' && <Banner />}
			</div>
		</ConfigProvider>,
	);

	const pageHtml = htmlPageTemplate({
		html,
		css: extractedCss,
		renderingTarget: 'Apps',
		config,
		guardian,
		scriptTags,
		weAreHiring: false,
	});
	return {
		html: pageHtml,
		prefetchScripts,
	};
};
