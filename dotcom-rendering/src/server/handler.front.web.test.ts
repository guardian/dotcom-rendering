import { Switches } from '@guardian/libs';
import { FETagPageType } from '../types/tagPage';
import { getBadgeUrl } from './handler.front.web';
import { CommercialProperties } from 'src/types/commercial';
import { FooterType } from 'src/types/footer';

const tagPage: FETagPageType = {
	contents: [],
	nav: {} as FENavType,
	tags: { tags: [] },
	editionId: 'UK',
	editionLongForm: '',
	guardianBaseURL: '',
	pageId: '',
	webTitle: '',
	webURL: '',
	config: {
		avatarApiUrl: '',
		externalEmbedHost: '',
		ajaxUrl: '',
		keywords: '',
		revisionNumber: '',
		isProd: false,
		switches: {} as Switches,
		section: '',
		keywordIds: '',
		locationapiurl: '',
		sharedAdTargeting: {},
		buildNumber: '',
		abTests: {},
		pbIndexSites: [],
		ampIframeUrl: '',
		beaconUrl: '',
		userAttributesApiUrl: '',
		host: '',
		brazeApiKey: undefined,
		calloutsUrl: '',
		requiresMembershipAccess: false,
		onwardWebSocket: '',
		a9PublisherId: '',
		contentType: '',
		facebookIaAdUnitRoot: '',
		ophanEmbedJsUrl: '',
		idUrl: '',
		dcrSentryDsn: '',
		isFront: true,
		idWebAppUrl: '',
		discussionApiUrl: '',
		sentryPublicApiKey: '',
		omnitureAccount: '',
		dfpAccountId: '',
		pageId: '',
		forecastsapiurl: '',
		assetsPath: '',
		pillar: '',
		commercialBundleUrl: '',
		discussionApiClientHeader: '',
		membershipUrl: '',
		dfpHost: '',
		cardStyle: undefined,
		googletagUrl: '',
		sentryHost: '',
		shouldHideAdverts: false,
		mmaUrl: '',
		membershipAccess: '',
		isPreview: false,
		googletagJsUrl: '',
		supportUrl: '',
		edition: '',
		discussionFrontendUrl: '',
		ipsosTag: '',
		ophanJsUrl: '',
		isPaidContent: undefined,
		mobileAppsAdUnitRoot: '',
		plistaPublicApiKey: '',
		frontendAssetsFullURL: '',
		googleSearchId: '',
		allowUserGeneratedContent: false,
		dfpAdUnitRoot: '',
		idApiUrl: '',
		omnitureAmpAccount: '',
		adUnit: '',
		hasPageSkin: false,
		webTitle: '',
		stripePublicToken: '',
		googleRecaptchaSiteKey: '',
		discussionD2Uid: '',
		weatherapiurl: '',
		googleSearchUrl: '',
		optimizeEpicUrl: '',
		stage: 'CODE',
		idOAuthUrl: '',
		isSensitive: false,
		isDev: false,
		thirdPartyAppsAccount: undefined,
		avatarImagesUrl: '',
		fbAppId: '',
	},
	commercialProperties: {} as CommercialProperties,
	pageFooter: {} as FooterType,
	isAdFreeUser: false,
	forceDay: false,
};

describe('getBadgeUrl', () => {
	it('should return undefined if the first tag is not present', () => {
		expect(getBadgeUrl(tagPage)).toBeUndefined();
	});

	it('should return undefined if the references property is not present', () => {
		tagPage.tags.tags = [
			{
				properties: {
					id: '',
					tagType: '',
					webTitle: '',
				},
			},
		];
		expect(getBadgeUrl(tagPage)).toBeUndefined();
	});

	it('should return undefined if there is no pa-football-team reference', () => {
		tagPage.tags.tags = [
			{
				properties: {
					id: '',
					tagType: '',
					webTitle: '',
					references: [{ type: 'some-other-type', id: 'some-id' }],
				},
			},
		];
		expect(getBadgeUrl(tagPage)).toBeUndefined();
	});

	it('should return the correct badge URL if the pa-football-team reference is present', () => {
		tagPage.tags.tags = [
			{
				properties: {
					id: '',
					tagType: '',
					webTitle: '',
					references: [
						{
							type: 'pa-football-team',
							id: 'football/12345',
						},
					],
				},
			},
		];

		const expectedUrl =
			'https://sport.guim.co.uk/football/crests/120/12345.png';
		expect(getBadgeUrl(tagPage)).toBe(expectedUrl);
	});

	it('should handle multiple references and return the correct badge URL', () => {
		tagPage.tags.tags = [
			{
				properties: {
					id: '',
					tagType: '',
					webTitle: '',
					references: [
						{ type: 'some-other-type', id: 'some-id' },
						{
							type: 'pa-football-team',
							id: 'football/67890',
						},
					],
				},
			},
		];

		const expectedUrl =
			'https://sport.guim.co.uk/football/crests/120/67890.png';
		expect(getBadgeUrl(tagPage)).toBe(expectedUrl);
	});

	it('should handle a complex id and return the correct badge URL', () => {
		tagPage.tags.tags = [
			{
				properties: {
					id: '',
					tagType: '',
					webTitle: '',
					references: [
						{
							type: 'pa-football-team',
							id: 'football/team/abcdef',
						},
					],
				},
			},
		];
		const expectedUrl =
			'https://sport.guim.co.uk/football/crests/120/team/abcdef.png';
		expect(getBadgeUrl(tagPage)).toBe(expectedUrl);
	});
});
