import React, { useState, useEffect, Suspense } from 'react';
import loadable from '@loadable/component';
import { useAB } from '@guardian/ab-react';
import { tests } from '@frontend/web/experiments/ab-tests';
import { ShareCount } from '@frontend/web/components/ShareCount';
import { MostViewedFooter } from '@frontend/web/components/MostViewed/MostViewedFooter/MostViewedFooter';
import { CalloutBlockComponent } from '@root/src/web/components/elements/CalloutBlockComponent';
import { ReaderRevenueLinks } from '@frontend/web/components/ReaderRevenueLinks';
import { SlotBodyEnd } from '@root/src/web/components/SlotBodyEnd/SlotBodyEnd';
import { Links } from '@frontend/web/components/Links';
import { SubNav } from '@frontend/web/components/SubNav/SubNav';
import { GetMatchNav } from '@frontend/web/components/GetMatchNav';
import { Discussion } from '@frontend/web/components/Discussion';
import { StickyBottomBanner } from '@root/src/web/components/StickyBottomBanner/StickyBottomBanner';
import { SignInGateSelector } from '@root/src/web/components/SignInGate/SignInGateSelector';

import { incrementWeeklyArticleCount } from '@guardian/automat-client';
import {
	QandaAtom,
	GuideAtom,
	ProfileAtom,
	TimelineAtom,
	ChartAtom,
	PersonalityQuizAtom,
	KnowledgeQuizAtom,
} from '@guardian/atoms-rendering';

import { AudioAtomWrapper } from '@frontend/web/components/AudioAtomWrapper';

import { Portal } from '@frontend/web/components/Portal';
import { HydrateOnce } from '@frontend/web/components/HydrateOnce';
import { Lazy } from '@frontend/web/components/Lazy';
import { Placeholder } from '@root/src/web/components/Placeholder';

import { decideTheme } from '@root/src/web/lib/decideTheme';
import { decideDisplay } from '@root/src/web/lib/decideDisplay';
import { decideDesign } from '@root/src/web/lib/decideDesign';
import { loadScript } from '@root/src/web/lib/loadScript';
import { useOnce } from '@root/src/web/lib/useOnce';
import { initPerf } from '@root/src/web/browser/initPerf';
import { getCookie } from '@root/src/web/browser/cookie';
import { getCountryCode } from '@frontend/web/lib/getCountryCode';
import { getUser } from '@root/src/web/lib/getUser';

import { FocusStyleManager } from '@guardian/src-foundations/utils';
import { Display, Design } from '@guardian/types';
import type { Format } from '@guardian/types';
import { incrementAlreadyVisited } from '@root/src/web/lib/alreadyVisited';
import { incrementDailyArticleCount } from '@frontend/web/lib/dailyArticleCount';
import { getArticleCountConsent } from '@frontend/web/lib/contributions';
import { ReaderRevenueDevUtils } from '@root/src/web/lib/readerRevenueDevUtils';
import { buildAdTargeting } from '@root/src/lib/ad-targeting';

import {
	cmp,
	onConsentChange,
	getConsentFor,
} from '@guardian/consent-management-platform';
import { injectPrivacySettingsLink } from '@root/src/web/lib/injectPrivacySettingsLink';
import { updateIframeHeight } from '@root/src/web/browser/updateIframeHeight';
import { ClickToView } from '@root/src/web/components/ClickToView';
import { DocumentBlockComponent } from '@root/src/web/components/elements/DocumentBlockComponent';
import { EmbedBlockComponent } from '@root/src/web/components/elements/EmbedBlockComponent';
import { UnsafeEmbedBlockComponent } from '@root/src/web/components/elements/UnsafeEmbedBlockComponent';
import { InstagramBlockComponent } from '@root/src/web/components/elements/InstagramBlockComponent';
import { MapEmbedBlockComponent } from '@root/src/web/components/elements/MapEmbedBlockComponent';
import { SpotifyBlockComponent } from '@root/src/web/components/elements/SpotifyBlockComponent';
import { VideoFacebookBlockComponent } from '@root/src/web/components/elements/VideoFacebookBlockComponent';
import { VineBlockComponent } from '@root/src/web/components/elements/VineBlockComponent';
import {
	StickyNavAnchor,
	StickyNavBackscroll,
} from '@root/src/web/components/Nav/StickNavTest/StickyNav';
import { BrazeMessagesInterface } from '@root/src/web/lib/braze/BrazeMessages';
import {
	submitComponentEvent,
	OphanComponentEvent,
} from '../browser/ophan/ophan';
import { trackPerformance } from '../browser/ga/ga';
import { decidePalette } from '../lib/decidePalette';
import { buildBrazeMessages } from '../lib/braze/buildBrazeMessages';

// *******************************
// ****** Dynamic imports ********
// *******************************

const EditionDropdown = loadable(
	() => import('@frontend/web/components/EditionDropdown'),
	{
		resolveComponent: (module) => module.EditionDropdown,
	},
);

const MostViewedRightWrapper = React.lazy(() => {
	const { start, end } = initPerf('MostViewedRightWrapper');
	start();
	return import(
		/* webpackChunkName: "MostViewedRightWrapper" */ '@frontend/web/components/MostViewed/MostViewedRight/MostViewedRightWrapper'
	).then((module) => {
		end();
		return { default: module.MostViewedRightWrapper };
	});
});
const OnwardsUpper = React.lazy(() => {
	const { start, end } = initPerf('OnwardsUpper');
	start();
	return import(
		/* webpackChunkName: "OnwardsUpper" */ '@frontend/web/components/Onwards/OnwardsUpper'
	).then((module) => {
		end();
		return { default: module.OnwardsUpper };
	});
});
const OnwardsLower = React.lazy(() => {
	const { start, end } = initPerf('OnwardsLower');
	start();
	return import(
		/* webpackChunkName: "OnwardsLower" */ '@frontend/web/components/Onwards/OnwardsLower'
	).then((module) => {
		end();
		return { default: module.OnwardsLower };
	});
});
const GetMatchStats = React.lazy(() => {
	const { start, end } = initPerf('GetMatchStats');
	start();
	return import(
		/* webpackChunkName: "GetMatchStats" */ '@frontend/web/components/GetMatchStats'
	).then((module) => {
		end();
		return { default: module.GetMatchStats };
	});
});

type Props = {
	CAPI: CAPIBrowserType;
	NAV: BrowserNavType;
};

const componentEventHandler = (
	componentType: any,
	id: any,
	action: any,
) => () => {
	const componentEvent: OphanComponentEvent = {
		component: {
			componentType,
			id,
			products: [],
			labels: [],
		},
		action,
	};
	submitComponentEvent(componentEvent);
};

export const App = ({ CAPI, NAV }: Props) => {
	const [isSignedIn, setIsSignedIn] = useState<boolean>();
	const [user, setUser] = useState<UserProfile | null>();
	const [countryCode, setCountryCode] = useState<string>();
	// This is an async version of the countryCode state value defined above.
	// This can be used where you've got logic which depends on countryCode but
	// don't want to block on it becoming available, as you would with the
	// non-async version (this is the case in the banner picker where some
	// banners need countryCode but we don't want to block all banners from
	// executing their canShow logic until countryCode is available):
	const [asyncCountryCode, setAsyncCountryCode] = useState<
		Promise<string | void>
	>();

	const [brazeMessages, setBrazeMessages] = useState<
		Promise<BrazeMessagesInterface>
	>();

	const pageViewId = window.guardian?.config?.ophan?.pageViewId;

	// *******************************
	// ** Setup AB Test Tracking *****
	// *******************************
	const ABTestAPI = useAB();
	useEffect(() => {
		const allRunnableTests = ABTestAPI.allRunnableTests(tests);
		ABTestAPI.trackABTests(allRunnableTests);
		ABTestAPI.registerImpressionEvents(allRunnableTests);
		ABTestAPI.registerCompleteEvents(allRunnableTests);
	}, [ABTestAPI]);

	useEffect(() => {
		setIsSignedIn(!!getCookie('GU_U'));
	}, []);

	useOnce(() => {
		// useOnce means this code will only run once isSignedIn is defined, and only
		// run one time
		if (isSignedIn) {
			getUser(CAPI.config.discussionApiUrl)
				.then((theUser) => {
					if (theUser) setUser(theUser);
				})
				.catch((e) => console.error(`getUser - error: ${e}`));
		} else {
			setUser(null);
		}
	}, [isSignedIn, CAPI.config.discussionApiUrl]);

	useEffect(() => {
		const callFetch = () => {
			const countryCodePromise = getCountryCode();
			setAsyncCountryCode(countryCodePromise);
			countryCodePromise
				.then((cc) => setCountryCode(cc || ''))
				.catch((e) =>
					console.error(`countryCodePromise - error: ${e}`),
				);
		};
		callFetch();
	}, []);

	useEffect(() => {
		incrementAlreadyVisited();
	}, []);

	// Log an article view using the Slot Machine client lib
	// This function must be called once per article serving.
	// We should monitor this function call to ensure it only happens within an
	// article pages when other pages are supported by DCR.
	useEffect(() => {
		const incrementArticleCountsIfConsented = async () => {
			if (await getArticleCountConsent()) {
				incrementDailyArticleCount();
				incrementWeeklyArticleCount();
			}
		};
		incrementArticleCountsIfConsented().catch((e) =>
			console.error(`incrementArticleCountsIfConsented - error: ${e}`),
		);
	}, []);

	// Ensure the focus state of any buttons/inputs in any of the Source
	// components are only applied when navigating via keyboard.
	// READ: https://www.theguardian.design/2a1e5182b/p/6691bb-accessibility/t/32e9fb
	useEffect(() => {
		FocusStyleManager.onlyShowFocusOnTabs();
	}, []);

	useEffect(() => {
		// Used internally only, so only import each function on demand
		const loadAndRun = <K extends keyof ReaderRevenueDevUtils>(key: K) => (
			asExistingSupporter: boolean,
		) =>
			import(
				/* webpackChunkName: "readerRevenueDevUtils" */ '@frontend/web/lib/readerRevenueDevUtils'
			)
				.then((utils) =>
					utils[key](
						asExistingSupporter,
						CAPI.shouldHideReaderRevenue,
					),
				)
				/* eslint-disable no-console */
				.catch((error) =>
					console.log('Error loading readerRevenueDevUtils', error),
				);
		/* eslint-enable no-console */

		if (window && window.guardian) {
			window.guardian.readerRevenue = {
				changeGeolocation: loadAndRun('changeGeolocation'),
				showMeTheEpic: loadAndRun('showMeTheEpic'),
				showMeTheBanner: loadAndRun('showMeTheBanner'),
				showNextVariant: loadAndRun('showNextVariant'),
				showPreviousVariant: loadAndRun('showPreviousVariant'),
			};
		}
	}, [CAPI.shouldHideReaderRevenue]);

	// kick off the CMP...
	useEffect(() => {
		// the UI is injected automatically into the page,
		// and is not a react component, so it's
		// handled in here.
		if (CAPI.config.switches.consentManagement && countryCode) {
			const pubData = {
				platform: 'next-gen',
				browserId: getCookie('bwid') || undefined,
				pageViewId,
			};
			injectPrivacySettingsLink(); // manually updates the footer DOM because it's not hydrated

			// keep this in sync with CONSENT_TIMING in static/src/javascripts/boot.js in frontend
			// mark: CONSENT_TIMING
			let recordedConsentTime = false;
			onConsentChange(() => {
				if (!recordedConsentTime) {
					recordedConsentTime = true;
					cmp.willShowPrivacyMessage()
						.then((willShow) => {
							trackPerformance(
								'consent',
								'acquired',
								willShow ? 'new' : 'existing',
							);
						})
						.catch((e) =>
							console.error(
								`CMP willShowPrivacyMessage - error: ${e}`,
							),
						);
				}
			});

			cmp.init({
				country: countryCode,
				pubData,
			});
		}
	}, [countryCode, CAPI.config.switches.consentManagement, pageViewId]);

	// ************************
	// *   Google Analytics   *
	// ************************
	useEffect(() => {
		onConsentChange((state: any) => {
			const consentGiven = getConsentFor('google-analytics', state);
			if (consentGiven) {
				Promise.all([
					loadScript('https://www.google-analytics.com/analytics.js'),
					loadScript(window.guardian.gaPath),
				]).catch((e) => console.error(`GA - error: ${e}`));
			} else {
				// We should never be able to directly set things to the global window object.
				// But in this case we want to stub things for testing, so it's ok to ignore this rule
				// @ts-ignore
				window.ga = null;
			}
		});
	}, []);

	useOnce(() => {
		setBrazeMessages(
			buildBrazeMessages(isSignedIn as boolean, CAPI.config.idApiUrl),
		);
	}, [isSignedIn, CAPI.config.idApiUrl]);

	const display: Display = decideDisplay(CAPI);
	const design: Design = decideDesign({
		designType: CAPI.designType,
		tags: CAPI.tags,
		isLiveBlog: CAPI.isLiveBlog,
		isLive: CAPI.isLive,
	});
	const pillar = decideTheme({
		pillar: CAPI.pillar,
		design,
		isSpecialReport: CAPI.isSpecialReport,
	});
	const format: Format = {
		display,
		design,
		theme: pillar,
	};
	const palette = decidePalette(format);

	const adTargeting: AdTargeting = buildAdTargeting(CAPI.config);

	// sticky nav test status
	const inStickyNavBackscroll = ABTestAPI.isUserInVariant(
		'StickyNavTest',
		'sticky-nav-backscroll',
	);
	const inStickyNavAnchor = ABTestAPI.isUserInVariant(
		'StickyNavTest',
		'sticky-nav-anchor',
	);

	// There are docs on loadable in ./docs/loadable-components.md
	const YoutubeBlockComponent = loadable(
		() => {
			if (
				CAPI.elementsToHydrate.filter(
					(element) =>
						element._type ===
						'model.dotcomrendering.pageElements.YoutubeBlockElement',
				).length > 0
			) {
				return import(
					'@frontend/web/components/elements/YoutubeBlockComponent'
				);
			}
			return Promise.reject();
		},
		{
			resolveComponent: (module) => module.YoutubeBlockComponent,
		},
	);

	const RichLinkComponent = loadable(
		() => {
			if (
				CAPI.elementsToHydrate.filter(
					(element) =>
						element._type ===
						'model.dotcomrendering.pageElements.RichLinkBlockElement',
				).length > 0
			) {
				return import(
					'@frontend/web/components/elements/RichLinkComponent'
				);
			}
			return Promise.reject();
		},
		{
			resolveComponent: (module) => module.RichLinkComponent,
		},
	);

	const InteractiveBlockComponent = loadable(
		() => {
			if (
				CAPI.elementsToHydrate.filter(
					(element) =>
						element._type ===
						'model.dotcomrendering.pageElements.InteractiveBlockElement',
				).length > 0
			) {
				return import(
					'@frontend/web/components/elements/InteractiveBlockComponent'
				);
			}
			return Promise.reject();
		},
		{
			resolveComponent: (module) => module.InteractiveBlockComponent,
		},
	);

	// We use this function to filter the elementsToHydrate array by a particular
	// type so that we can hydrate them. We use T to force the type and keep TS
	// content because *we* know that if _type equals a thing then the type is
	// guarenteed but TS isn't so sure and needs assurance
	const elementsByType = <T extends CAPIElement>(
		elements: CAPIElement[],
		type: string,
	): T[] => elements.filter((element) => element._type === type) as T[];

	const youTubeAtoms = elementsByType<YoutubeBlockElement>(
		CAPI.elementsToHydrate,
		'model.dotcomrendering.pageElements.YoutubeBlockElement',
	);
	const quizAtoms = elementsByType<QuizAtomBlockElement>(
		CAPI.elementsToHydrate,
		'model.dotcomrendering.pageElements.QuizAtomBlockElement',
	);
	const callouts = elementsByType<CalloutBlockElement>(
		CAPI.elementsToHydrate,
		'model.dotcomrendering.pageElements.CalloutBlockElement',
	);
	const chartAtoms = elementsByType<ChartAtomBlockElement>(
		CAPI.elementsToHydrate,
		'model.dotcomrendering.pageElements.ChartAtomBlockElement',
	);
	const audioAtoms = elementsByType<AudioAtomBlockElement>(
		CAPI.elementsToHydrate,
		'model.dotcomrendering.pageElements.AudioAtomBlockElement',
	);
	const qandaAtoms = elementsByType<QABlockElement>(
		CAPI.elementsToHydrate,
		'model.dotcomrendering.pageElements.QABlockElement',
	);
	const guideAtoms = elementsByType<GuideAtomBlockElement>(
		CAPI.elementsToHydrate,
		'model.dotcomrendering.pageElements.GuideAtomBlockElement',
	);
	const profileAtoms = elementsByType<ProfileAtomBlockElement>(
		CAPI.elementsToHydrate,
		'model.dotcomrendering.pageElements.ProfileAtomBlockElement',
	);
	const timelineAtoms = elementsByType<TimelineBlockElement>(
		CAPI.elementsToHydrate,
		'model.dotcomrendering.pageElements.TimelineBlockElement',
	);
	const documents = elementsByType<DocumentBlockElement>(
		CAPI.elementsToHydrate,
		'model.dotcomrendering.pageElements.DocumentBlockElement',
	);
	const embeds = elementsByType<EmbedBlockElement>(
		CAPI.elementsToHydrate,
		'model.dotcomrendering.pageElements.EmbedBlockElement',
	);
	const instas = elementsByType<InstagramBlockElement>(
		CAPI.elementsToHydrate,
		'model.dotcomrendering.pageElements.InstagramBlockElement',
	);
	const maps = elementsByType<MapBlockElement>(
		CAPI.elementsToHydrate,
		'model.dotcomrendering.pageElements.MapBlockElement',
	);
	const spotifies = elementsByType<SpotifyBlockElement>(
		CAPI.elementsToHydrate,
		'model.dotcomrendering.pageElements.SpotifyBlockElement',
	);
	const facebookVideos = elementsByType<VideoFacebookBlockElement>(
		CAPI.elementsToHydrate,
		'model.dotcomrendering.pageElements.VideoFacebookBlockElement',
	);
	const vines = elementsByType<VineBlockElement>(
		CAPI.elementsToHydrate,
		'model.dotcomrendering.pageElements.VineBlockElement',
	);
	const richLinks = elementsByType<RichLinkBlockElement>(
		CAPI.elementsToHydrate,
		'model.dotcomrendering.pageElements.RichLinkBlockElement',
	);
	const interactiveElements = elementsByType<InteractiveBlockElement>(
		CAPI.elementsToHydrate,
		'model.dotcomrendering.pageElements.InteractiveBlockElement',
	);

	return (
		// Do you need to HydrateOnce or do you want a Portal?
		//
		// HydrateOnce: If your component is server rendered and you're hydrating it with
		// more data or making it interactive on the client and you do not need to access
		// global application state.
		//
		// Portal: If your component is not server rendered but a pure client-side component
		// and/or you want to access global application state, you want to use a Portal.
		//
		// Note: Both require a 'root' element that needs to be server rendered.
		<React.StrictMode>
			<Portal rootId="reader-revenue-links-header">
				<ReaderRevenueLinks
					urls={CAPI.nav.readerRevenueLinks.header}
					edition={CAPI.editionId}
					dataLinkNamePrefix="nav2 : "
					inHeader={true}
				/>
			</Portal>
			<HydrateOnce rootId="links-root" waitFor={[user]}>
				<Links
					giftingURL={CAPI.nav.readerRevenueLinks.header.gifting}
					userId={user ? user.userId : undefined}
					idUrl={CAPI.config.idUrl}
					mmaUrl={CAPI.config.mmaUrl}
				/>
			</HydrateOnce>
			<HydrateOnce rootId="edition-root">
				<EditionDropdown
					edition={CAPI.editionId}
					dataLinkName="nav2 : topbar : edition-picker: toggle"
				/>
			</HydrateOnce>
			<Portal rootId="share-count-root">
				<ShareCount
					ajaxUrl={CAPI.config.ajaxUrl}
					pageId={CAPI.pageId}
				/>
			</Portal>
			{youTubeAtoms.map((youTubeAtom) => (
				<HydrateOnce rootId={youTubeAtom.elementId}>
					<YoutubeBlockComponent
						format={format}
						palette={palette}
						hideCaption={false}
						// eslint-disable-next-line jsx-a11y/aria-role
						role="inline"
						adTargeting={adTargeting}
						isMainMedia={false}
						id={youTubeAtom.id}
						assetId={youTubeAtom.assetId}
						channelId={youTubeAtom.channelId}
						expired={youTubeAtom.expired}
						overrideImage={youTubeAtom.overrideImage}
						posterImage={youTubeAtom.posterImage}
						duration={youTubeAtom.duration}
						mediaTitle={youTubeAtom.mediaTitle}
						altText={youTubeAtom.altText}
					/>
				</HydrateOnce>
			))}
			{interactiveElements.map((interactiveBlock) => (
				<HydrateOnce rootId={interactiveBlock.elementId}>
					<InteractiveBlockComponent
						url={interactiveBlock.url}
						scriptUrl={interactiveBlock.scriptUrl}
						alt={interactiveBlock.alt}
						role={interactiveBlock.role}
					/>
				</HydrateOnce>
			))}
			{quizAtoms.map((quizAtom) => (
				<HydrateOnce rootId={quizAtom.elementId}>
					<>
						{quizAtom.quizType === 'personality' && (
							<PersonalityQuizAtom
								id={quizAtom.id}
								questions={quizAtom.questions}
								resultBuckets={quizAtom.resultBuckets}
							/>
						)}
						{quizAtom.quizType === 'knowledge' && (
							<KnowledgeQuizAtom
								id={quizAtom.id}
								questions={quizAtom.questions}
							/>
						)}
					</>
				</HydrateOnce>
			))}

			{inStickyNavBackscroll && (
				<Portal rootId="sticky-nav-root">
					<StickyNavBackscroll
						capiData={CAPI}
						navData={NAV}
						format={format}
						palette={palette}
					/>
				</Portal>
			)}

			{inStickyNavAnchor && (
				<Portal rootId="sticky-nav-root">
					<StickyNavAnchor
						capiData={CAPI}
						navData={NAV}
						format={format}
						palette={palette}
					/>
				</Portal>
			)}

			{NAV.subNavSections && (
				<HydrateOnce rootId="sub-nav-root">
					<>
						<SubNav
							subNavSections={NAV.subNavSections}
							currentNavLink={NAV.currentNavLink}
							palette={palette}
						/>
					</>
				</HydrateOnce>
			)}
			{CAPI.matchUrl && (
				<Portal rootId="match-nav">
					<GetMatchNav matchUrl={CAPI.matchUrl} />
				</Portal>
			)}
			{richLinks.map((richLink, index) => (
				<Portal rootId={richLink.elementId}>
					<RichLinkComponent
						element={richLink}
						pillar={pillar}
						ajaxEndpoint={CAPI.config.ajaxUrl}
						richLinkIndex={index}
					/>
				</Portal>
			))}
			{callouts.map((callout) => (
				<HydrateOnce rootId={callout.elementId}>
					<CalloutBlockComponent
						callout={callout}
						palette={palette}
					/>
				</HydrateOnce>
			))}
			{chartAtoms.map((chartAtom) => (
				<HydrateOnce rootId={chartAtom.elementId}>
					<ChartAtom id={chartAtom.id} html={chartAtom.html} />
				</HydrateOnce>
			))}
			{audioAtoms.map((audioAtom) => (
				<HydrateOnce rootId={audioAtom.elementId}>
					<AudioAtomWrapper
						id={audioAtom.id}
						trackUrl={audioAtom.trackUrl}
						kicker={audioAtom.kicker}
						title={audioAtom.title}
						pillar={pillar}
						contentIsNotSensitive={!CAPI.config.isSensitive}
						aCastisEnabled={CAPI.config.switches.acast}
						readerCanBeShownAds={!CAPI.isAdFreeUser}
					/>
				</HydrateOnce>
			))}
			{qandaAtoms.map((qandaAtom) => (
				<HydrateOnce rootId={qandaAtom.elementId}>
					<QandaAtom
						id={qandaAtom.id}
						title={qandaAtom.title}
						html={qandaAtom.html}
						image={qandaAtom.img}
						credit={qandaAtom.credit}
						pillar={pillar}
						likeHandler={componentEventHandler(
							'QANDA_ATOM',
							qandaAtom.id,
							'LIKE',
						)}
						dislikeHandler={componentEventHandler(
							'QANDA_ATOM',
							qandaAtom.id,
							'DISLIKE',
						)}
						expandCallback={componentEventHandler(
							'QANDA_ATOM',
							qandaAtom.id,
							'EXPAND',
						)}
					/>
				</HydrateOnce>
			))}
			{guideAtoms.map((guideAtom) => (
				<HydrateOnce rootId={guideAtom.elementId}>
					<GuideAtom
						id={guideAtom.id}
						title={guideAtom.title}
						html={guideAtom.html}
						image={guideAtom.img}
						credit={guideAtom.credit}
						pillar={pillar}
						likeHandler={componentEventHandler(
							'GUIDE_ATOM',
							guideAtom.id,
							'LIKE',
						)}
						dislikeHandler={componentEventHandler(
							'GUIDE_ATOM',
							guideAtom.id,
							'DISLIKE',
						)}
						expandCallback={componentEventHandler(
							'GUIDE_ATOM',
							guideAtom.id,
							'EXPAND',
						)}
					/>
				</HydrateOnce>
			))}
			{profileAtoms.map((profileAtom) => (
				<HydrateOnce rootId={profileAtom.elementId}>
					<ProfileAtom
						id={profileAtom.id}
						title={profileAtom.title}
						html={profileAtom.html}
						image={profileAtom.img}
						credit={profileAtom.credit}
						pillar={pillar}
						likeHandler={componentEventHandler(
							'PROFILE_ATOM',
							profileAtom.id,
							'LIKE',
						)}
						dislikeHandler={componentEventHandler(
							'PROFILE_ATOM',
							profileAtom.id,
							'DISLIKE',
						)}
						expandCallback={componentEventHandler(
							'PROFILE_ATOM',
							profileAtom.id,
							'EXPAND',
						)}
					/>
				</HydrateOnce>
			))}
			{timelineAtoms.map((timelineAtom) => (
				<HydrateOnce rootId={timelineAtom.elementId}>
					<TimelineAtom
						id={timelineAtom.id}
						title={timelineAtom.title}
						events={timelineAtom.events}
						description={timelineAtom.description}
						pillar={pillar}
						likeHandler={componentEventHandler(
							'TIMELINE_ATOM',
							timelineAtom.id,
							'LIKE',
						)}
						dislikeHandler={componentEventHandler(
							'TIMELINE_ATOM',
							timelineAtom.id,
							'DISLIKE',
						)}
						expandCallback={componentEventHandler(
							'TIMELINE_ATOM',
							timelineAtom.id,
							'EXPAND',
						)}
					/>
				</HydrateOnce>
			))}
			{documents.map((document) => (
				<HydrateOnce rootId={document.elementId}>
					<ClickToView
						role={document.role}
						isTracking={document.isThirdPartyTracking}
						source={document.source}
						sourceDomain={document.sourceDomain}
						abTests={CAPI.config.abTests}
					>
						<DocumentBlockComponent
							embedUrl={document.embedUrl}
							height={document.height}
							width={document.width}
							title={document.title}
						/>
					</ClickToView>
				</HydrateOnce>
			))}
			{embeds.map((embed, index) => (
				<HydrateOnce rootId={embed.elementId}>
					{embed.safe ? (
						<ClickToView
							role={embed.role}
							isTracking={embed.isThirdPartyTracking}
							source={embed.source}
							sourceDomain={embed.sourceDomain}
							abTests={CAPI.config.abTests}
						>
							<EmbedBlockComponent
								html={embed.html}
								alt={embed.alt}
							/>
						</ClickToView>
					) : (
						<ClickToView
							role={embed.role}
							isTracking={embed.isThirdPartyTracking}
							source={embed.source}
							sourceDomain={embed.sourceDomain}
							abTests={CAPI.config.abTests}
							onAccept={() =>
								updateIframeHeight(
									`iframe[name="unsafe-embed-${index}"]`,
								)
							}
						>
							<UnsafeEmbedBlockComponent
								key={embed.elementId}
								html={embed.html}
								alt={embed.alt || ''}
								index={index}
							/>
						</ClickToView>
					)}
				</HydrateOnce>
			))}
			{instas.map((insta, index) => (
				<HydrateOnce rootId={insta.elementId}>
					<ClickToView
						role={insta.role}
						isTracking={insta.isThirdPartyTracking}
						source={insta.source}
						sourceDomain={insta.sourceDomain}
						abTests={CAPI.config.abTests}
						onAccept={() =>
							updateIframeHeight(
								`iframe[name="instagram-embed-${index}"]`,
							)
						}
					>
						<InstagramBlockComponent
							element={insta}
							index={index}
						/>
					</ClickToView>
				</HydrateOnce>
			))}
			{maps.map((map) => (
				<HydrateOnce rootId={map.elementId}>
					<ClickToView
						role={map.role}
						isTracking={map.isThirdPartyTracking}
						source={map.source}
						sourceDomain={map.sourceDomain}
						abTests={CAPI.config.abTests}
					>
						<MapEmbedBlockComponent
							format={format}
							palette={palette}
							embedUrl={map.embedUrl}
							height={map.height}
							width={map.width}
							caption={map.caption}
							credit={map.source}
							title={map.title}
						/>
					</ClickToView>
				</HydrateOnce>
			))}
			{spotifies.map((spotify) => (
				<HydrateOnce rootId={spotify.elementId}>
					<ClickToView
						role={spotify.role}
						isTracking={spotify.isThirdPartyTracking}
						source={spotify.source}
						sourceDomain={spotify.sourceDomain}
						abTests={CAPI.config.abTests}
					>
						<SpotifyBlockComponent
							embedUrl={spotify.embedUrl}
							height={spotify.height}
							width={spotify.width}
							title={spotify.title}
							format={format}
							palette={palette}
							caption={spotify.caption}
							credit="Spotify"
						/>
					</ClickToView>
				</HydrateOnce>
			))}
			{facebookVideos.map((facebookVideo) => (
				<HydrateOnce rootId={facebookVideo.elementId}>
					<ClickToView
						role={facebookVideo.role}
						isTracking={facebookVideo.isThirdPartyTracking}
						source={facebookVideo.source}
						sourceDomain={facebookVideo.sourceDomain}
						abTests={CAPI.config.abTests}
					>
						<VideoFacebookBlockComponent
							format={format}
							palette={palette}
							embedUrl={facebookVideo.embedUrl}
							height={facebookVideo.height}
							width={facebookVideo.width}
							caption={facebookVideo.caption}
							credit={facebookVideo.caption}
							title={facebookVideo.caption}
						/>
					</ClickToView>
				</HydrateOnce>
			))}
			{vines.map((vine) => (
				<HydrateOnce rootId={vine.elementId}>
					<ClickToView
						// No role given by CAPI
						// eslint-disable-next-line jsx-a11y/aria-role
						role="inline"
						isTracking={vine.isThirdPartyTracking}
						source={vine.source}
						sourceDomain={vine.sourceDomain}
						abTests={CAPI.config.abTests}
					>
						<VineBlockComponent element={vine} />
					</ClickToView>
				</HydrateOnce>
			))}
			<Portal rootId="most-viewed-right">
				<Lazy margin={100}>
					<Suspense fallback={<></>}>
						<MostViewedRightWrapper pillar={pillar} />
					</Suspense>
				</Lazy>
			</Portal>
			{CAPI.matchUrl && (
				<Portal rootId="match-stats">
					<Lazy margin={300}>
						<Suspense fallback={<Placeholder height={800} />}>
							<GetMatchStats matchUrl={CAPI.matchUrl} />
						</Suspense>
					</Lazy>
				</Portal>
			)}
			<Portal rootId="slot-body-end">
				<SlotBodyEnd
					isSignedIn={isSignedIn}
					countryCode={countryCode}
					contentType={CAPI.contentType}
					sectionName={CAPI.sectionName}
					shouldHideReaderRevenue={CAPI.shouldHideReaderRevenue}
					isMinuteArticle={CAPI.pageType.isMinuteArticle}
					isPaidContent={CAPI.pageType.isPaidContent}
					tags={CAPI.tags}
					contributionsServiceUrl={CAPI.contributionsServiceUrl}
					brazeMessages={brazeMessages}
				/>
			</Portal>
			<Portal
				rootId={
					isSignedIn
						? 'onwards-upper-whensignedin'
						: 'onwards-upper-whensignedout'
				}
			>
				<Lazy margin={300}>
					<Suspense fallback={<></>}>
						<OnwardsUpper
							ajaxUrl={CAPI.config.ajaxUrl}
							hasRelated={CAPI.hasRelated}
							hasStoryPackage={CAPI.hasStoryPackage}
							isAdFreeUser={CAPI.isAdFreeUser}
							pageId={CAPI.pageId}
							isPaidContent={CAPI.config.isPaidContent || false}
							showRelatedContent={CAPI.config.showRelatedContent}
							keywordIds={CAPI.config.keywordIds}
							contentType={CAPI.contentType}
							tags={CAPI.tags}
							edition={CAPI.editionId}
							format={format}
						/>
					</Suspense>
				</Lazy>
			</Portal>
			<Portal
				rootId={
					isSignedIn
						? 'onwards-lower-whensignedin'
						: 'onwards-lower-whensignedout'
				}
			>
				<Lazy margin={300}>
					<Suspense fallback={<></>}>
						<OnwardsLower
							ajaxUrl={CAPI.config.ajaxUrl}
							hasStoryPackage={CAPI.hasStoryPackage}
							tags={CAPI.tags}
							format={format}
						/>
					</Suspense>
				</Lazy>
			</Portal>
			<Portal rootId="sign-in-gate">
				<SignInGateSelector isSignedIn={isSignedIn} CAPI={CAPI} />
			</Portal>
			<HydrateOnce rootId="comments" waitFor={[user]}>
				<Discussion
					discussionApiUrl={CAPI.config.discussionApiUrl}
					shortUrlId={CAPI.config.shortUrlId}
					isCommentable={CAPI.isCommentable}
					pillar={pillar}
					palette={palette}
					user={user || undefined}
					discussionD2Uid={CAPI.config.discussionD2Uid}
					discussionApiClientHeader={
						CAPI.config.discussionApiClientHeader
					}
					enableDiscussionSwitch={CAPI.config.enableDiscussionSwitch}
					isAdFreeUser={CAPI.isAdFreeUser}
					shouldHideAds={CAPI.shouldHideAds}
					beingHydrated={true}
					display={display}
				/>
			</HydrateOnce>
			<Portal rootId="most-viewed-footer">
				<MostViewedFooter
					palette={palette}
					sectionName={CAPI.sectionName}
					ajaxUrl={CAPI.config.ajaxUrl}
					display={display}
				/>
			</Portal>
			<Portal rootId="reader-revenue-links-footer">
				<Lazy margin={300}>
					<ReaderRevenueLinks
						urls={CAPI.nav.readerRevenueLinks.footer}
						edition={CAPI.editionId}
						dataLinkNamePrefix="footer : "
						inHeader={false}
					/>
				</Lazy>
			</Portal>
			<Portal rootId="bottom-banner">
				<StickyBottomBanner
					isSignedIn={isSignedIn}
					asyncCountryCode={asyncCountryCode}
					CAPI={CAPI}
					brazeMessages={brazeMessages}
				/>
			</Portal>
		</React.StrictMode>
	);
};
