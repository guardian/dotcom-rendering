import { render, screen } from '@testing-library/react';
import type { FEFrontCard } from '../frontend/feFront';
import { enhanceCards } from '../model/enhanceCards';
import type { BoostLevel } from '../types/content';
import type { DCRContainerType } from '../types/front';
import { ConfigProvider } from './ConfigContext';
import { FrontCard } from './FrontCard';

const response = `{
  "pressedPage": {
    "collections": [{
      "curated": [{
        "properties": {
          "isBreaking": false,
          "showKickerTag": false,
          "showByline": false,
          "isLiveBlog": false,
          "isCrossword": false,
          "webTitle": "PSG beat Barça, Rio’s grand for Liverpool and Ronaldo’s CV | Football Weekly – video",
          "editionBrandings": []
        },
        "header": {
          "isVideo": false,
          "isComment": false,
          "isGallery": false,
          "isAudio": false,
          "headline": "PSG beat Barça, Rio’s grand for Liverpool and Ronaldo’s CV | Football Weekly – video",
          "url": "/test/2026/oct/27/article-17712690",
          "hasMainVideoElement": false
        },
        "card": {
          "id": "test/2026/oct/27/article-17712690",
          "cardStyle": { "type": "DefaultCardstyle" },
          "shortUrl": "",
          "group": "3",
          "isLive": false
        },
        "discussion": {
          "isCommentable": false,
          "isClosedForComments": true
        },
        "display": {
          "isBoosted": false,
          "showBoostedHeadline": false,
          "showQuotedHeadline": false,
          "imageHide": false,
          "showLivePlayable": false,
          "showMiniNav": true,
          "miniNavData": {
            "id": "4c1bf2d9-ee4f-4d4c-829a-9bcc2c25b9fb",
            "header": {
              "headerText": "Football",
              "dotcomPath": "/football",
              "copy": "Football navigation",
              "showHeaderText": true
            },
            "format": "compact",
            "links": [{
              "linkText": "More Football",
              "dotcomPath": "/football"
            }],
            "pages": [],
            "lastUpdated": 1793031866891,
            "updatedBy": "Test editor",
            "updatedEmail": "editor@example.com"
          }
        },
        "enriched": {},
        "type": "CuratedContent"
      }]
    }]
  }
}`;

type Scenario = {
	containerType?: DCRContainerType;
	boostLevel?: BoostLevel;
	showMiniNav: boolean;
	hasData: boolean;
	expected: boolean;
};

const scenarios: Scenario[] = [
	...(['boost', 'megaboost', 'gigaboost'] as const).map((boostLevel) => ({
		containerType: 'flexible/general' as const,
		boostLevel,
		showMiniNav: true,
		hasData: true,
		expected: true,
	})),
	...([undefined, 'default'] as const).map((boostLevel) => ({
		containerType: 'flexible/general' as const,
		boostLevel,
		showMiniNav: true,
		hasData: true,
		expected: false,
	})),
	...([undefined, 'static/medium/4', 'flexible/special'] as const).map(
		(containerType) => ({
			containerType,
			boostLevel: 'boost' as const,
			showMiniNav: true,
			hasData: true,
			expected: false,
		}),
	),
	{
		containerType: 'flexible/general',
		boostLevel: 'boost',
		showMiniNav: false,
		hasData: true,
		expected: false,
	},
	{
		containerType: 'flexible/general',
		boostLevel: 'boost',
		showMiniNav: true,
		hasData: false,
		expected: false,
	},
];

describe.each(scenarios)(
	'FrontCard mini navigation: $containerType / $boostLevel / enabled=$showMiniNav / data=$hasData',
	({ containerType, boostLevel, showMiniNav, hasData, expected }) => {
		it.each([true, false])(
			'renders the mini nav with showHeaderText set to %s',
			(showHeaderText) => {
				const parsedResponse = JSON.parse(response) as {
					pressedPage: {
						collections: {
							curated: FEFrontCard[];
						}[];
					};
				};
				const [frontCard] =
					parsedResponse.pressedPage.collections[0]!.curated;
				if (!frontCard) {
					throw new Error('DCR response has no curated card');
				}

				const [enhancedCard] = enhanceCards([frontCard], {
					cardInTagPage: false,
					editionId: 'UK',
					discussionApiUrl: '',
					serverSideABTests: {},
					featureSwitches: {},
				});
				if (!enhancedCard) {
					throw new Error('DCR card could not be enhanced');
				}
				if (!enhancedCard.miniNavData) {
					throw new Error('Mini nav data is missing');
				}
				enhancedCard.miniNavData.header.showHeaderText = showHeaderText;
				enhancedCard.boostLevel = boostLevel;
				enhancedCard.showMiniNav = showMiniNav;
				if (!hasData) enhancedCard.miniNavData = undefined;

				render(
					<ConfigProvider
						value={{
							renderingTarget: 'Web',
							darkModeAvailable: false,
							assetOrigin: '/',
							editionId: 'UK',
						}}
					>
						<FrontCard
							trail={enhancedCard}
							containerType={containerType}
							imageLoading="eager"
							serverTime={1793031866891}
						/>
					</ConfigProvider>,
				);

				if (!expected) {
					expect(
						screen.queryByText('Football'),
					).not.toBeInTheDocument();
					expect(
						screen.queryByRole('link', { name: 'More Football' }),
					).not.toBeInTheDocument();
					expect(
						screen.getByText(/PSG beat Barça/),
					).toBeInTheDocument();
					return;
				}

				if (showHeaderText) {
					const header = screen.getByRole('link', {
						name: 'Football',
					});
					expect(header).toHaveAttribute('href', '/football');
					expect(header).toHaveStyle('text-decoration: underline');
				} else {
					expect(
						screen.queryByText('Football'),
					).not.toBeInTheDocument();
				}
				expect(
					screen.getByRole('link', { name: 'More Football' }),
				).toHaveAttribute('href', '/football');
				expect(screen.getByText(/PSG beat Barça/)).toBeInTheDocument();

				const miniNav = screen
					.getByRole('link', { name: 'More Football' })
					.closest('[data-component-id]');
				const navWrapper = miniNav?.parentElement;
				const cardWrapper = navWrapper?.parentElement;

				expect(cardWrapper).toHaveStyle({
					display: 'flex',
					flexDirection: 'column',
					width: '100%',
				});
				expect(cardWrapper?.firstElementChild).toBe(navWrapper);
				expect(cardWrapper).toContainElement(
					screen.getByText(/PSG beat Barça/),
				);
				expect(navWrapper).toHaveStyle({
					'--masthead-nav-link-text': 'var(--article-text)',
					'--masthead-nav-link-text-hover': 'var(--article-text)',
				});
			},
		);
	},
);
