import { isString } from '@guardian/libs';
import type { BannerProps } from '@guardian/support-dotcom-components/dist/shared/types';
import { BasicBanner } from '../components/BasicBanner.importable';
import { BasicGutterAsk } from '../components/BasicGutterAsk.importable';
import { ConfigProvider } from '../components/ConfigContext';
import { Island } from '../components/Island';
import { DesignableBanner } from '../components/marketing/banners/designableBanner/DesignableBanner';
import {
	design,
	stringToHexColour,
} from '../components/marketing/banners/utils/storybook';
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

const Gutter = () => {
	return (
		<Island priority="feature" defer={{ until: 'visible' }}>
			<BasicGutterAsk
				variant={{
					image: {
						mainUrl:
							'https://uploads.guim.co.uk/2025/06/12/not_for_sale_bg_scaled.svg',
						altText: 'alt',
					},
					bodyCopy: [
						'The Guardian’s expert news coverage is funded by people like you, not a billionaire owner. Will you help us keep our independent journalism free and open to all today?',
					],
					cta: {
						text: 'Support us',
						baseUrl: 'https://support.theguardian.com/contribute',
					},
				}}
				enrichedUrl={'https://support.theguardian.com'}
				onCtaClick={() => {
					console.log('click');
				}}
			/>
		</Island>
	);
};

const bannerProps: BannerProps = {
	tracking: {
		ophanPageId: '',
		platformId: '',
		referrerUrl: '',
		abTestName: '',
		abTestVariant: '',
		campaignCode: '',
		componentType: 'ACQUISITIONS_ENGAGEMENT_BANNER',
	},
	bannerChannel: 'contributions',
	articleCounts: {
		for52Weeks: 0,
		forTargetedWeeks: 0,
	},
	content: {
		heading: 'Support the Guardian',
		paragraphs: ['Help us deliver independent journalism'],
		cta: {
			text: 'Support',
			baseUrl: 'https://support.theguardian.com',
		},
	},
	choiceCardsSettings: {
		choiceCards: [
			{
				product: {
					supportTier: 'Contribution',
					ratePlan: 'Monthly',
				},
				label: '£5/month',
				isDefault: false,
				benefits: [{ copy: 'Support independent journalism' }],
			},
			{
				product: {
					supportTier: 'SupporterPlus',
					ratePlan: 'Monthly',
				},
				label: '£12/month',
				isDefault: true,
				benefits: [{ copy: 'Support independent journalism' }],
			},
		],
	},
	design: {
		...design,
		visual: {
			kind: 'ChoiceCards',
			buttonColour: stringToHexColour('F1F8FC'),
		},
	},
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
	name: 'gutter' | 'banner';
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
		renderingTarget: 'Web',
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
				<h1>testing!</h1>
				{name === 'gutter' && <Gutter />}
				{/*{name === 'banner' && <StaticBanner />}*/}
				{name === 'banner' && <Banner />}
			</div>
		</ConfigProvider>,
	);

	const pageHtml = htmlPageTemplate({
		html,
		css: extractedCss,
		renderingTarget: 'Web',
		config,
		guardian,
		scriptTags,
		weAreHiring: false,
		section: 'uk',
	});
	return {
		html: pageHtml,
		prefetchScripts,
	};
};
