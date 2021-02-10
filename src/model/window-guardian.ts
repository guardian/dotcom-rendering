type stage = 'DEV' | 'CODE' | 'PROD';

export interface WindowGuardianConfig {
	isDotcomRendering: boolean;
	stage: stage;
	frontendAssetsFullURL: string;
	page: {
		dcrCouldRender: boolean;
		contentType: string;
		edition: Edition;
		revisionNumber: string;
		dcrSentryDsn: string;
		sentryHost: string;
		sentryPublicApiKey: string;
		keywordIds: string;
		dfpAccountId: string;
		adUnit: string;
		showRelatedContent: boolean;
		ajaxUrl: string;
		hbImpl: object | string;
		shouldHideReaderRevenue: boolean;
	} & ConfigType;
	libs: {
		googletag: string;
	};
	switches: { [key: string]: boolean };
	tests?: { [key: string]: string };
	ophan: {
		pageViewId: string;
	};
}

const makeWindowGuardianConfig = (
	dcrDocumentData: DCRServerDocumentData,
): WindowGuardianConfig => {
	const { config } = dcrDocumentData.CAPI;
	return {
		// This indicates to the client side code that we are running a dotcom-rendering rendered page.
		isDotcomRendering: true,
		stage: config.stage,
		frontendAssetsFullURL: config.frontendAssetsFullURL,
		page: Object.assign(config, {
			dcrCouldRender: true,
			contentType: dcrDocumentData.CAPI.contentType,
			edition: dcrDocumentData.CAPI.editionId,
			revisionNumber: config.revisionNumber,
			dcrSentryDsn:
				'https://1937ab71c8804b2b8438178dfdd6468f@sentry.io/1377847',
			sentryPublicApiKey: config.sentryPublicApiKey,
			sentryHost: config.sentryHost,
			keywordIds: config.keywordIds,
			dfpAccountId: config.dfpAccountId,
			adUnit: config.adUnit,
			showRelatedContent: true,
			ajaxUrl: config.ajaxUrl,
			hbImpl: config.hbImpl,
		}),
		libs: {
			googletag: config.googletagUrl,
		},
		switches: config.switches,
		tests: config.abTests || {},
		ophan: {
			pageViewId: '',
		},
	} as WindowGuardianConfig;
};

export const makeGuardianBrowserCAPI = (CAPI: CAPIType): CAPIBrowserType => {
	// For some elements it is important to keep thier index in the `elements` array

	const blockElementWithIndex = <T extends CAPIElement>(
		blocks: { elements: CAPIElement[] }[],
		blockElementType: CAPIElement['_type'],
		indexName: string,
	): T[] => {
		return blocks[0].elements.reduce(
			(acc: T[], element: CAPIElement, index: number) => {
				if (element._type === blockElementType) {
					acc.push({
						...element,
						[indexName]: index,
					} as T);
				}
				return acc;
			},
			[] as T[],
		);
	};

	const thirdPartyTrackingElementsOnly = <
		T extends ThirdPartyEmbeddedContent
	>(
		elements: T[],
	): T[] => {
		return elements.filter((element) => element.isThirdPartyTracking);
	};

	/* Kept for posteriy...for now anyway!
    const richLinksWithIndex: RichLinkBlockElement[] = CAPI.blocks[0].elements.reduce(
        (acc, element, index: number) => {
            if (
                element._type ===
                'model.dotcomrendering.pageElements.RichLinkBlockElement'
            ) {
                acc.push({
                    ...element,
                    richLinkIndex: index,
                } as RichLinkBlockElement);
            }
            return acc;
        },
        [] as RichLinkBlockElement[],
    );
*/

	return {
		designType: CAPI.designType,
		pillar: CAPI.pillar,
		config: {
			frontendAssetsFullURL: CAPI.config.frontendAssetsFullURL,
			isDev: process.env.NODE_ENV !== 'production',
			ajaxUrl: CAPI.config.ajaxUrl,
			shortUrlId: CAPI.config.shortUrlId,
			pageId: CAPI.config.pageId,
			isPaidContent: !!CAPI.config.isPaidContent,
			showRelatedContent: CAPI.config.showRelatedContent,
			keywordIds: CAPI.config.keywordIds,
			ampIframeUrl: CAPI.config.ampIframeUrl,

			// switches
			switches: CAPI.config.switches,
			abTests: CAPI.config.abTests,
			slotBodyEnd: CAPI.config.switches.slotBodyEnd,
			ampPrebid: CAPI.config.switches.ampPrebid,
			permutive: CAPI.config.switches.permutive,
			enableSentryReporting: CAPI.config.switches.enableSentryReporting,
			enableDiscussionSwitch: CAPI.config.switches.enableDiscussionSwitch,
			remoteBanner: CAPI.config.switches.remoteBanner,
			ausMoment2020Header: CAPI.config.switches.ausMoment2020Header,

			// used by lib/ad-targeting.ts
			isSensitive: CAPI.config.isSensitive,
			videoDuration: CAPI.config.videoDuration,
			edition: CAPI.config.edition,
			section: CAPI.config.section,
			sharedAdTargeting: CAPI.config.sharedAdTargeting, // missing type definition
			adUnit: CAPI.config.adUnit,
			discussionApiUrl: CAPI.config.discussionApiUrl,
			discussionD2Uid: CAPI.config.discussionD2Uid,
			discussionApiClientHeader: CAPI.config.discussionApiClientHeader,
			idApiUrl: CAPI.config.idApiUrl,

			dcrSentryDsn: CAPI.config.dcrSentryDsn,

			// used by sign in gate
			host: CAPI.config.host,
			idUrl: CAPI.config.idUrl,
		},
		richLinks: blockElementWithIndex(
			CAPI.blocks,
			'model.dotcomrendering.pageElements.RichLinkBlockElement',
			'richLinkIndex',
		),
		editionId: CAPI.editionId,
		editionLongForm: CAPI.editionLongForm,
		contentType: CAPI.contentType,
		sectionName: CAPI.sectionName,
		shouldHideReaderRevenue: CAPI.shouldHideReaderRevenue,
		pageType: {
			isMinuteArticle: CAPI.pageType.isMinuteArticle,
			isPaidContent: CAPI.pageType.isPaidContent,
			hasShowcaseMainElement: CAPI.pageType.hasShowcaseMainElement,
		},
		hasRelated: CAPI.hasRelated,
		hasStoryPackage: CAPI.hasStoryPackage,
		shouldHideAds: CAPI.shouldHideAds,
		isAdFreeUser: CAPI.isAdFreeUser,
		pageId: CAPI.pageId,
		tags: CAPI.tags,
		isCommentable: CAPI.isCommentable,
		nav: {
			readerRevenueLinks: {
				footer: CAPI.nav.readerRevenueLinks.footer,
				header: CAPI.nav.readerRevenueLinks.header,
			},
		},
		contributionsServiceUrl: CAPI.contributionsServiceUrl,
		isImmersive: CAPI.isImmersive,
		isPhotoEssay: CAPI.config.isPhotoEssay,
		isSpecialReport: CAPI.isSpecialReport,
		matchUrl: CAPI.matchUrl,
		callouts: blockElementWithIndex(
			CAPI.blocks,
			'model.dotcomrendering.pageElements.CalloutBlockElement',
			'calloutIndex',
		),
		qandaAtoms: blockElementWithIndex(
			CAPI.blocks,
			'model.dotcomrendering.pageElements.QABlockElement',
			'qandaIndex',
		),
		guideAtoms: blockElementWithIndex(
			CAPI.blocks,
			'model.dotcomrendering.pageElements.GuideAtomBlockElement',
			'guideIndex',
		),
		profileAtoms: blockElementWithIndex(
			CAPI.blocks,
			'model.dotcomrendering.pageElements.ProfileAtomBlockElement',
			'profileIndex',
		),
		timelineAtoms: blockElementWithIndex(
			CAPI.blocks,
			'model.dotcomrendering.pageElements.TimelineBlockElement',
			'timelineIndex',
		),
		chartAtoms: blockElementWithIndex(
			CAPI.blocks,
			'model.dotcomrendering.pageElements.ChartAtomBlockElement',
			'chartIndex',
		),
		audioAtoms: blockElementWithIndex(
			CAPI.blocks,
			'model.dotcomrendering.pageElements.AudioAtomBlockElement',
			'audioIndex',
		),
		quizAtoms: blockElementWithIndex(
			CAPI.blocks,
			'model.dotcomrendering.pageElements.QuizAtomBlockElement',
			'quizIndex',
		),
		youtubeBlockElement: blockElementWithIndex(
			CAPI.blocks,
			'model.dotcomrendering.pageElements.YoutubeBlockElement',
			'youtubeIndex',
		),
		youtubeMainMediaBlockElement: CAPI.mainMediaElements.reduce(
			(
				acc: CAPIElement[],
				cur: CAPIElement,
				index: number,
			): YoutubeBlockElement[] => {
				if (
					cur._type ===
					'model.dotcomrendering.pageElements.YoutubeBlockElement'
				) {
					acc.push({
						...cur,
						youtubeIndex: index,
					});
				}
				return acc as YoutubeBlockElement[];
			},
			[] as YoutubeBlockElement[],
		),
		documentBlockElements: thirdPartyTrackingElementsOnly(
			blockElementWithIndex(
				CAPI.blocks,
				'model.dotcomrendering.pageElements.DocumentBlockElement',
				'documentIndex',
			),
		),
		embedBlockElements: thirdPartyTrackingElementsOnly(
			blockElementWithIndex(
				CAPI.blocks,
				'model.dotcomrendering.pageElements.EmbedBlockElement',
				'embedIndex',
			),
		),
		instagramBlockElements: thirdPartyTrackingElementsOnly(
			blockElementWithIndex(
				CAPI.blocks,
				'model.dotcomrendering.pageElements.InstagramBlockElement',
				'instagramIndex',
			),
		),
		mapBlockElements: thirdPartyTrackingElementsOnly(
			blockElementWithIndex(
				CAPI.blocks,
				'model.dotcomrendering.pageElements.MapBlockElement',
				'mapIndex',
			),
		),
		pullquoteBlockElements: thirdPartyTrackingElementsOnly(
			blockElementWithIndex(
				CAPI.blocks,
				'model.dotcomrendering.pageElements.PullquoteBlockElement',
				'pullquoteIndex',
			),
		),
		spotifyBlockElements: thirdPartyTrackingElementsOnly(
			blockElementWithIndex(
				CAPI.blocks,
				'model.dotcomrendering.pageElements.SpotifyBlockElement',
				'spotifyIndex',
			),
		),
		videoFacebookBlockElements: thirdPartyTrackingElementsOnly(
			blockElementWithIndex(
				CAPI.blocks,
				'model.dotcomrendering.pageElements.VideoFacebookBlockElement',
				'videoFacebookIndex',
			),
		),
	};
};

export interface WindowGuardian {
	// The app contains only data that we require for app hydration
	// NOTE: there is a divergence between DCRBrowserDocumentData and DCRServerDocumentData
	// for perfomance reasons
	app: {
		data: DCRBrowserDocumentData;
		cssIDs: string[];
	};

	// The 'config' attribute is derived from DCRServerDocumentData and contains
	// all the data that, for legacy reasons, for instance compatibility
	// with the frontend commercial stack, or other scripts, we want to find
	// at window.guardian.config
	config: WindowGuardianConfig;
	polyfilled: boolean;
	adBlockers: any;
	modules: {
		sentry: {
			reportError: (error: Error, feature: string) => void;
		};
	};
}

export const makeWindowGuardian = (
	dcrDocumentData: DCRServerDocumentData,
	cssIDs: string[],
): WindowGuardian => {
	return {
		app: {
			cssIDs,
			data: {
				...dcrDocumentData,
				NAV: {
					subNavSections: dcrDocumentData.NAV.subNavSections,
					currentNavLink: dcrDocumentData.NAV.currentNavLink,
				},
				CAPI: makeGuardianBrowserCAPI(dcrDocumentData.CAPI),
			},
		},
		config: makeWindowGuardianConfig(dcrDocumentData),
		polyfilled: false,
		adBlockers: {
			active: undefined,
			onDetect: [],
		},
		modules: {
			sentry: {
				reportError: () => null,
			},
		},
	};
};
