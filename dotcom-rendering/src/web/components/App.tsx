import React, { useState, useEffect } from 'react';

import { log } from '@guardian/libs';
import type { ArticleFormat } from '@guardian/libs';
import type { BrazeMessagesInterface } from '@guardian/braze-components/logic';
import { ReaderRevenueLinks } from './ReaderRevenueLinks';
import { SlotBodyEnd } from './SlotBodyEnd/SlotBodyEnd';
import { StickyBottomBanner } from './StickyBottomBanner/StickyBottomBanner';
import { SignInGateSelector } from './SignInGate/SignInGateSelector';

import { AudioAtomWrapper } from './AudioAtomWrapper';

import { Portal } from './Portal';
import { HydrateOnce } from './HydrateOnce';
import { decideTheme } from '../lib/decideTheme';
import { decideFormat } from '../lib/decideFormat';
import { useOnce } from '../lib/useOnce';

import { incrementAlreadyVisited } from '../lib/alreadyVisited';
import { ReaderRevenueDevUtils } from '../lib/readerRevenueDevUtils';

import { buildBrazeMessages } from '../lib/braze/buildBrazeMessages';
import { getOphanRecordFunction } from '../browser/ophan/ophan';
import { Lazy } from './Lazy';

type Props = {
	CAPI: CAPIBrowserType;
};

let renderCount = 0;
export const App = ({ CAPI }: Props) => {
	log('dotcom', `App.tsx render #${(renderCount += 1)}`);

	const [brazeMessages, setBrazeMessages] =
		useState<Promise<BrazeMessagesInterface>>();

	const pageViewId = window.guardian?.config?.ophan?.pageViewId;

	const ophanRecord = getOphanRecordFunction();

	useEffect(() => {
		incrementAlreadyVisited();
	}, []);

	useEffect(() => {
		// Used internally only, so only import each function on demand
		const loadAndRun =
			<K extends keyof ReaderRevenueDevUtils>(key: K) =>
			(asExistingSupporter: boolean) =>
				import(
					/* webpackChunkName: "readerRevenueDevUtils" */ '../lib/readerRevenueDevUtils'
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

	const pillar: ArticleTheme = decideTheme(CAPI.format);

	const format: ArticleFormat = decideFormat(CAPI.format);

	// We use this function to filter the elementsToHydrate array by a particular
	// type so that we can hydrate them. We use T to force the type and keep TS
	// content because *we* know that if _type equals a thing then the type is
	// guaranteed but TS isn't so sure and needs assurance
	const elementsByType = <T extends CAPIElement>(
		elements: CAPIElement[],
		type: T['_type'],
	): T[] => elements.filter((element) => element._type === type) as T[];

	const audioAtoms = elementsByType<AudioAtomBlockElement>(
		CAPI.elementsToHydrate,
		'model.dotcomrendering.pageElements.AudioAtomBlockElement',
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
					remoteHeaderEnabled={CAPI.config.remoteHeader}
					pageViewId={pageViewId}
					contributionsServiceUrl={CAPI.contributionsServiceUrl}
					ophanRecord={ophanRecord}
				/>
			</Portal>
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
					pageId={CAPI.pageId}
					keywordsId={CAPI.config.keywordIds}
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
			<Portal rootId="reader-revenue-links-footer">
				<Lazy margin={300}>
					<ReaderRevenueLinks
						urls={CAPI.nav.readerRevenueLinks.footer}
						edition={CAPI.editionId}
						dataLinkNamePrefix="footer : "
						inHeader={false}
						remoteHeaderEnabled={false}
						pageViewId={pageViewId}
						contributionsServiceUrl={CAPI.contributionsServiceUrl}
						ophanRecord={ophanRecord}
					/>
				</Lazy>
			</Portal>
			<Portal rootId="bottom-banner">
				<StickyBottomBanner
					brazeMessages={brazeMessages}
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
					pageId={CAPI.pageId}
					keywordsId={CAPI.config.keywordIds}
				/>
			</Portal>
		</React.StrictMode>
	);
};
