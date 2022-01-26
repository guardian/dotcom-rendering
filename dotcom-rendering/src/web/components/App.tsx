import React, { useState, useEffect } from 'react';
import loadable from '@loadable/component';
import { useAB } from '@guardian/ab-react';
import { tests } from '@frontend/web/experiments/ab-tests';
import { ShareCount } from '@frontend/web/components/ShareCount';
import { MostViewedFooter } from '@frontend/web/components/MostViewed/MostViewedFooter/MostViewedFooter';
import { ReaderRevenueLinks } from '@frontend/web/components/ReaderRevenueLinks';
import { SlotBodyEnd } from '@root/src/web/components/SlotBodyEnd/SlotBodyEnd';
import { ContributionSlot } from '@frontend/web/components/ContributionSlot';
import { GetMatchNav } from '@frontend/web/components/GetMatchNav';
import { StickyBottomBanner } from '@root/src/web/components/StickyBottomBanner/StickyBottomBanner';
import { SignInGateSelector } from '@root/src/web/components/SignInGate/SignInGateSelector';

import {
	getWeeklyArticleHistory,
	incrementWeeklyArticleCount,
} from '@guardian/automat-contributions';
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
import {
	HydrateOnce,
	HydrateInteractiveOnce,
} from '@frontend/web/components/HydrateOnce';
import { decideTheme } from '@root/src/web/lib/decideTheme';
import { decideDisplay } from '@root/src/web/lib/decideDisplay';
import { decideDesign } from '@root/src/web/lib/decideDesign';
import { useOnce } from '@root/src/web/lib/useOnce';

import { FocusStyleManager } from '@guardian/source-foundations';
import { ArticleDisplay, ArticleDesign, storage, log } from '@guardian/libs';
import type { ArticleFormat } from '@guardian/libs';
import { incrementAlreadyVisited } from '@root/src/web/lib/alreadyVisited';
import { incrementDailyArticleCount } from '@frontend/web/lib/dailyArticleCount';
import { hasOptedOutOfArticleCount } from '@frontend/web/lib/contributions';
import { ReaderRevenueDevUtils } from '@root/src/web/lib/readerRevenueDevUtils';
import { buildAdTargeting } from '@root/src/lib/ad-targeting';
import { getSharingUrls } from '@root/src/lib/sharing-urls';
import { updateIframeHeight } from '@root/src/web/browser/updateIframeHeight';
import { ClickToView } from '@root/src/web/components/ClickToView';
import { LabsHeader } from '@root/src/web/components/LabsHeader';
import { EmbedBlockComponent } from '@root/src/web/components/EmbedBlockComponent';
import { UnsafeEmbedBlockComponent } from '@root/src/web/components/UnsafeEmbedBlockComponent';

import type { BrazeMessagesInterface } from '@guardian/braze-components/logic';
import { OphanRecordFunction } from '@guardian/ab-core/dist/types';

import { WeeklyArticleHistory } from '@guardian/automat-contributions/dist/lib/types';

import {
	submitComponentEvent,
	OphanComponentEvent,
} from '../browser/ophan/ophan';
import { buildBrazeMessages } from '../lib/braze/buildBrazeMessages';
import { CommercialMetrics } from './CommercialMetrics';
import { GetMatchTabs } from './GetMatchTabs';

type Props = {
	CAPI: CAPIBrowserType;
	ophanRecord: OphanRecordFunction;
};

let renderCount = 0;
export const App = ({ CAPI, ophanRecord }: Props) => {
	log('dotcom', `App.tsx render #${(renderCount += 1)}`);

	const [brazeMessages, setBrazeMessages] =
		useState<Promise<BrazeMessagesInterface>>();

	const pageViewId = window.guardian?.config?.ophan?.pageViewId;

	const componentEventHandler =
		(componentType: any, id: any, action: any) => () => {
			const componentEvent: OphanComponentEvent = {
				component: {
					componentType,
					id,
					products: [],
					labels: [],
				},
				action,
			};
			submitComponentEvent(componentEvent, ophanRecord);
		};

	const [asyncArticleCount, setAsyncArticleCount] =
		useState<Promise<WeeklyArticleHistory | undefined>>();

	// *******************************
	// ** Setup AB Test Tracking *****
	// *******************************
	const ABTestAPI = useAB();
	useEffect(() => {
		const allRunnableTests = ABTestAPI.allRunnableTests(tests);
		ABTestAPI.trackABTests(allRunnableTests);
		ABTestAPI.registerImpressionEvents(allRunnableTests);
		ABTestAPI.registerCompleteEvents(allRunnableTests);
		log('dotcom', 'AB tests initialised');
	}, [ABTestAPI]);

	useEffect(() => {
		incrementAlreadyVisited();
	}, []);

	// Log an article view using the Slot Machine client lib
	// This function must be called once per article serving.
	// We should monitor this function call to ensure it only happens within an
	// article pages when other pages are supported by DCR.
	useEffect(() => {
		const incrementArticleCountsIfConsented = async () => {
			const hasOptedOut = await hasOptedOutOfArticleCount();
			if (!hasOptedOut) {
				incrementDailyArticleCount();
				incrementWeeklyArticleCount(
					storage.local,
					CAPI.pageId,
					CAPI.config.keywordIds.split(','),
				);
			}
		};

		setAsyncArticleCount(
			incrementArticleCountsIfConsented().then(() =>
				getWeeklyArticleHistory(storage.local),
			),
		);
	}, [CAPI.pageId, CAPI.config.keywordIds]);

	// Ensure the focus state of any buttons/inputs in any of the Source
	// components are only applied when navigating via keyboard.
	// READ: https://www.theguardian.design/2a1e5182b/p/6691bb-accessibility/t/32e9fb
	useEffect(() => {
		FocusStyleManager.onlyShowFocusOnTabs();
	}, []);

	useEffect(() => {
		// Used internally only, so only import each function on demand
		const loadAndRun =
			<K extends keyof ReaderRevenueDevUtils>(key: K) =>
			(asExistingSupporter: boolean) =>
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
						console.log(
							'Error loading readerRevenueDevUtils',
							error,
						),
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

	useOnce(() => {
		setBrazeMessages(buildBrazeMessages(CAPI.config.idApiUrl));
	}, [CAPI.config.idApiUrl]);

	const display: ArticleDisplay = decideDisplay(CAPI.format);
	const design: ArticleDesign = decideDesign(CAPI.format);
	const pillar: ArticleTheme = decideTheme(CAPI.format);

	const format: ArticleFormat = {
		display,
		design,
		theme: pillar,
	};

	const adTargeting: AdTargeting = buildAdTargeting({
		isAdFreeUser: CAPI.isAdFreeUser,
		isSensitive: CAPI.config.isSensitive,
		videoDuration: CAPI.config.videoDuration,
		edition: CAPI.config.edition,
		section: CAPI.config.section,
		sharedAdTargeting: CAPI.config.sharedAdTargeting,
		adUnit: CAPI.config.adUnit,
	});

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
				return import('@frontend/web/components/YoutubeBlockComponent');
			}
			return Promise.reject();
		},
		{
			resolveComponent: (module) => module.YoutubeBlockComponent,
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
					'@frontend/web/components/InteractiveBlockComponent'
				);
			}
			return Promise.reject();
		},
		{
			resolveComponent: (module) => module.InteractiveBlockComponent,
		},
	);

	const InteractiveContentsBlockElement = loadable(
		() => {
			if (
				CAPI.elementsToHydrate.filter(
					(element) =>
						element._type ===
						'model.dotcomrendering.pageElements.InteractiveContentsBlockElement',
				).length > 0
			) {
				return import(
					'@frontend/web/components/InteractiveContentsBlockComponent'
				);
			}
			return Promise.reject();
		},
		{
			resolveComponent: (module) =>
				module.InteractiveContentsBlockComponent,
		},
	);

	const CalloutBlockComponent = loadable(
		() => {
			if (
				CAPI.elementsToHydrate.filter(
					(element) =>
						element._type ===
						'model.dotcomrendering.pageElements.CalloutBlockElement',
				).length > 0
			) {
				return import('@frontend/web/components/CalloutBlockComponent');
			}
			return Promise.reject();
		},
		{
			resolveComponent: (module) => module.CalloutBlockComponent,
		},
	);

	const DocumentBlockComponent = loadable(
		() => {
			if (
				CAPI.elementsToHydrate.filter(
					(element) =>
						element._type ===
						'model.dotcomrendering.pageElements.DocumentBlockElement',
				).length > 0
			) {
				return import(
					'@frontend/web/components/DocumentBlockComponent'
				);
			}
			return Promise.reject();
		},
		{
			resolveComponent: (module) => module.DocumentBlockComponent,
		},
	);

	const VideoFacebookBlockComponent = loadable(
		() => {
			if (
				CAPI.elementsToHydrate.filter(
					(element) =>
						element._type ===
						'model.dotcomrendering.pageElements.VideoFacebookBlockElement',
				).length > 0
			) {
				return import(
					'@frontend/web/components/VideoFacebookBlockComponent'
				);
			}
			return Promise.reject();
		},
		{
			resolveComponent: (module) => module.VideoFacebookBlockComponent,
		},
	);

	// We use this function to filter the elementsToHydrate array by a particular
	// type so that we can hydrate them. We use T to force the type and keep TS
	// content because *we* know that if _type equals a thing then the type is
	// guaranteed but TS isn't so sure and needs assurance
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
	const facebookVideos = elementsByType<VideoFacebookBlockElement>(
		CAPI.elementsToHydrate,
		'model.dotcomrendering.pageElements.VideoFacebookBlockElement',
	);
	const interactiveElements = elementsByType<InteractiveBlockElement>(
		CAPI.elementsToHydrate,
		'model.dotcomrendering.pageElements.InteractiveBlockElement',
	);
	const interactiveContentsElement =
		elementsByType<InteractiveContentsBlockElement>(
			CAPI.elementsToHydrate,
			'model.dotcomrendering.pageElements.InteractiveContentsBlockElement',
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
			{[
				CAPI.config.switches.commercialMetrics,
				window.guardian.config?.ophan !== undefined,
			].every(Boolean) && <CommercialMetrics pageViewId={pageViewId} />}
			<Portal rootId="reader-revenue-links-header">
				<ReaderRevenueLinks
					urls={CAPI.nav.readerRevenueLinks.header}
					edition={CAPI.editionId}
					dataLinkNamePrefix="nav2 : "
					inHeader={true}
					remoteHeaderEnabled={CAPI.config.remoteHeader}
					pageViewId={pageViewId}
					contributionsServiceUrl={CAPI.contributionsServiceUrl}
					ophanRecord={ophanRecord}
				/>
			</Portal>
			<HydrateOnce rootId="labs-header">
				<LabsHeader />
			</HydrateOnce>
			{CAPI.config.switches.serverShareCounts && (
				<Portal rootId="share-count-root">
					<ShareCount
						ajaxUrl={CAPI.config.ajaxUrl}
						pageId={CAPI.pageId}
						format={format}
					/>
				</Portal>
			)}
			{youTubeAtoms.map((youTubeAtom) => (
				<HydrateOnce rootId={youTubeAtom.elementId}>
					<YoutubeBlockComponent
						format={format}
						hideCaption={false}
						// eslint-disable-next-line jsx-a11y/aria-role
						role="inline"
						adTargeting={adTargeting}
						isMainMedia={false}
						id={youTubeAtom.id}
						assetId={youTubeAtom.assetId}
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
				<HydrateInteractiveOnce rootId={interactiveBlock.elementId}>
					<InteractiveBlockComponent
						url={interactiveBlock.url}
						scriptUrl={interactiveBlock.scriptUrl}
						alt={interactiveBlock.alt}
						role={interactiveBlock.role}
						caption={interactiveBlock.caption}
						format={format}
					/>
				</HydrateInteractiveOnce>
			))}
			{interactiveContentsElement.map((interactiveBlock) => (
				<HydrateOnce rootId={interactiveBlock.elementId}>
					<InteractiveContentsBlockElement
						subheadingLinks={interactiveBlock.subheadingLinks}
						endDocumentElementId={
							interactiveBlock.endDocumentElementId
						}
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
								sharingUrls={getSharingUrls(
									CAPI.pageId,
									CAPI.webTitle,
								)}
								theme={format.theme}
							/>
						)}
						{quizAtom.quizType === 'knowledge' && (
							<KnowledgeQuizAtom
								id={quizAtom.id}
								questions={quizAtom.questions}
								resultGroups={quizAtom.resultGroups}
								sharingUrls={getSharingUrls(
									CAPI.pageId,
									CAPI.webTitle,
								)}
								theme={format.theme}
							/>
						)}
					</>
				</HydrateOnce>
			))}

			{CAPI.matchUrl && (
				<Portal rootId="match-nav">
					<GetMatchNav matchUrl={CAPI.matchUrl} />
				</Portal>
			)}
			{CAPI.matchUrl && (
				<Portal rootId="match-tabs">
					<GetMatchTabs matchUrl={CAPI.matchUrl} format={format} />
				</Portal>
			)}
			{/*
				Rules for when to show <ContributionSlot />:
				1. shouldHideReaderRevenue is false ("Prevent membership/contribution appeals" is not checked in Composer)
				2. The article is not paid content
				3. The reader is not signed in
				4. An ad blocker has been detected

				Note. We specifically say isSignedIn === false so that we prevent render until the cookie has been
				checked to avoid flashing this content
			*/}

			<Portal rootId="top-right-ad-slot">
				<ContributionSlot
					shouldHideReaderRevenue={CAPI.shouldHideReaderRevenue}
					isPaidContent={CAPI.pageType.isPaidContent}
				/>
			</Portal>
			{callouts.map((callout) => (
				<HydrateOnce rootId={callout.elementId}>
					<CalloutBlockComponent callout={callout} format={format} />
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
						duration={audioAtom.duration}
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
					>
						<DocumentBlockComponent
							embedUrl={document.embedUrl}
							height={document.height}
							width={document.width}
							title={document.title}
							source={document.source}
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
						>
							<EmbedBlockComponent
								html={embed.html}
								caption={embed.caption}
							/>
						</ClickToView>
					) : (
						<ClickToView
							role={embed.role}
							isTracking={embed.isThirdPartyTracking}
							source={embed.source}
							sourceDomain={embed.sourceDomain}
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
			{facebookVideos.map((facebookVideo) => (
				<HydrateOnce rootId={facebookVideo.elementId}>
					<ClickToView
						role={facebookVideo.role}
						isTracking={facebookVideo.isThirdPartyTracking}
						source={facebookVideo.source}
						sourceDomain={facebookVideo.sourceDomain}
					>
						<VideoFacebookBlockComponent
							format={format}
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
			<Portal rootId="slot-body-end">
				<SlotBodyEnd
					contentType={CAPI.contentType}
					sectionName={CAPI.sectionName}
					sectionId={CAPI.config.section}
					shouldHideReaderRevenue={CAPI.shouldHideReaderRevenue}
					isMinuteArticle={CAPI.pageType.isMinuteArticle}
					isPaidContent={CAPI.pageType.isPaidContent}
					tags={CAPI.tags}
					contributionsServiceUrl={CAPI.contributionsServiceUrl}
					brazeMessages={brazeMessages}
					idApiUrl={CAPI.config.idApiUrl}
					stage={CAPI.stage}
					asyncArticleCount={asyncArticleCount}
				/>
			</Portal>
			<Portal rootId="sign-in-gate">
				<SignInGateSelector
					format={format}
					contentType={CAPI.contentType}
					sectionName={CAPI.sectionName}
					tags={CAPI.tags}
					isPaidContent={CAPI.pageType.isPaidContent}
					isPreview={!!CAPI.isPreview}
					host={CAPI.config.host}
					pageId={CAPI.pageId}
					idUrl={CAPI.config.idUrl}
					pageViewId={pageViewId}
				/>
			</Portal>
			<Portal rootId="most-viewed-footer">
				<MostViewedFooter
					format={format}
					sectionName={CAPI.sectionName}
					ajaxUrl={CAPI.config.ajaxUrl}
				/>
			</Portal>
			<Portal rootId="bottom-banner">
				<StickyBottomBanner
					brazeMessages={brazeMessages}
					asyncArticleCount={asyncArticleCount}
					contentType={CAPI.contentType}
					sectionName={CAPI.sectionName}
					section={CAPI.config.section}
					tags={CAPI.tags}
					isPaidContent={CAPI.pageType.isPaidContent}
					isPreview={!!CAPI.isPreview}
					shouldHideReaderRevenue={CAPI.shouldHideReaderRevenue}
					isMinuteArticle={CAPI.pageType.isMinuteArticle}
					isSensitive={CAPI.config.isSensitive}
					contributionsServiceUrl={CAPI.contributionsServiceUrl}
					idApiUrl={CAPI.config.idApiUrl}
					switches={CAPI.config.switches}
				/>
			</Portal>
		</React.StrictMode>
	);
};
