import type { ConsentState } from '@guardian/libs';
import '@testing-library/jest-dom';
import { fireEvent, render } from '@testing-library/react';
import { ArticleDesign, ArticleDisplay, Pillar } from '../../lib/articleFormat';
import { ConfigProvider } from '../ConfigContext';
import { YoutubeAtom } from './YoutubeAtom';

const overlayImage =
	'https://i.guim.co.uk/img/media/4b3808707ec341629932a9d443ff5a812cf4df14/0_309_1800_1081/master/1800.jpg?width=1200&height=630&quality=85&auto=format&fit=crop&overlay-align=bottom%2Cleft&overlay-width=100p&overlay-base64=L2ltZy9zdGF0aWMvb3ZlcmxheXMvdGctZGVmYXVsdC5wbmc&enable=upscale&s=aff4b8255693eb449f13070df88e9cac';

const consentStateCanTarget: ConsentState = {
	tcfv2: {
		vendorConsents: { abc: false },
		addtlConsent: 'xyz',
		gdprApplies: true,
		tcString: 'YAAA',
		consents: { '1': true, '2': true },
		eventStatus: 'useractioncomplete',
	},
	canTarget: true,
	framework: 'tcfv2',
};

describe('YoutubeAtom', () => {
	it('Player initialises when no overlay and has consent state', () => {
		const atom = (
			<ConfigProvider
				value={{
					renderingTarget: 'Web',
					darkModeAvailable: false,
					assetOrigin: '/',
					editionId: 'UK',
				}}
			>
				<YoutubeAtom
					atomId="2e9e138b-0a23-4b96-a7f6-0258c0bacc8f"
					videoId="c_xtiZNDgGc"
					uniqueId="c_xtiZNDgGc-1"
					title="My Youtube video!"
					alt=""
					adTargeting={{ disableAds: true }}
					eventEmitters={[]}
					format={{
						theme: Pillar.News,
						design: ArticleDesign.Standard,
						display: ArticleDisplay.Standard,
					}}
					consentState={consentStateCanTarget}
					shouldStick={false}
					isMainMedia={false}
					abTestParticipations={{}}
					iconSizeOnDesktop="large"
					iconSizeOnMobile="large"
					hidePillOnMobile={false}
					showTextOverlay={false}
					renderingTarget="Web"
				/>
			</ConfigProvider>
		);
		const { getAllByTestId } = render(atom);
		const [playerDiv] = getAllByTestId(/^youtube-player-c_xtiZNDgGc-\d+$/);
		expect(playerDiv).toBeInTheDocument();
	});

	it('Player initialises when overlay clicked and has consent state', () => {
		const atom = (
			<ConfigProvider
				value={{
					renderingTarget: 'Web',
					darkModeAvailable: false,
					assetOrigin: '/',
					editionId: 'UK',
				}}
			>
				<YoutubeAtom
					atomId="2e9e138b-0a23-4b96-a7f6-0258c0bacc8f"
					videoId="c_xtiZNDgGc"
					uniqueId="c_xtiZNDgGc-1"
					title="My Youtube video!"
					alt=""
					adTargeting={{ disableAds: true }}
					eventEmitters={[]}
					format={{
						theme: Pillar.News,
						design: ArticleDesign.Standard,
						display: ArticleDisplay.Standard,
					}}
					consentState={consentStateCanTarget}
					image={overlayImage}
					shouldStick={false}
					isMainMedia={false}
					abTestParticipations={{}}
					iconSizeOnDesktop="large"
					iconSizeOnMobile="large"
					hidePillOnMobile={false}
					showTextOverlay={false}
					renderingTarget="Web"
				/>
			</ConfigProvider>
		);
		const { getAllByTestId } = render(atom);
		const [overlay] = getAllByTestId(/^youtube-overlay-c_xtiZNDgGc-\d+$/);
		expect(overlay).toBeInTheDocument();

		overlay && fireEvent.click(overlay);
		expect(overlay).not.toBeInTheDocument();

		const [playerDiv] = getAllByTestId(/^youtube-player-c_xtiZNDgGc-\d+$/);
		expect(playerDiv).toBeInTheDocument();
	});

	it('player div has correct title', () => {
		const title = 'My Youtube video!';

		const atom = (
			<ConfigProvider
				value={{
					renderingTarget: 'Web',
					darkModeAvailable: false,
					assetOrigin: '/',
					editionId: 'UK',
				}}
			>
				<YoutubeAtom
					atomId="2e9e138b-0a23-4b96-a7f6-0258c0bacc8f"
					videoId="c_xtiZNDgGc"
					uniqueId="c_xtiZNDgGc-1"
					title="My Youtube video!"
					alt=""
					adTargeting={{ disableAds: true }}
					eventEmitters={[]}
					format={{
						theme: Pillar.News,
						design: ArticleDesign.Standard,
						display: ArticleDisplay.Standard,
					}}
					consentState={consentStateCanTarget}
					shouldStick={false}
					isMainMedia={false}
					abTestParticipations={{}}
					iconSizeOnDesktop="large"
					iconSizeOnMobile="large"
					hidePillOnMobile={false}
					showTextOverlay={false}
					renderingTarget="Web"
				/>
			</ConfigProvider>
		);
		const { getAllByTestId } = render(atom);
		const [playerDiv] = getAllByTestId(/^youtube-player-c_xtiZNDgGc-\d+$/);
		expect(playerDiv?.title).toBe(title);
	});

	it('overlay has correct aria-label', () => {
		const title = 'My Youtube video!';

		const atom = (
			<ConfigProvider
				value={{
					renderingTarget: 'Web',
					darkModeAvailable: false,
					assetOrigin: '/',
					editionId: 'UK',
				}}
			>
				<YoutubeAtom
					atomId="2e9e138b-0a23-4b96-a7f6-0258c0bacc8f"
					videoId="c_xtiZNDgGc"
					uniqueId="c_xtiZNDgGc-1"
					title="My Youtube video!"
					alt=""
					adTargeting={{ disableAds: true }}
					eventEmitters={[]}
					format={{
						theme: Pillar.News,
						design: ArticleDesign.Standard,
						display: ArticleDisplay.Standard,
					}}
					consentState={consentStateCanTarget}
					image={overlayImage}
					shouldStick={false}
					isMainMedia={false}
					abTestParticipations={{}}
					iconSizeOnDesktop="large"
					iconSizeOnMobile="large"
					hidePillOnMobile={false}
					showTextOverlay={false}
					renderingTarget="Web"
				/>
			</ConfigProvider>
		);
		const { getAllByTestId } = render(atom);
		const [overlay] = getAllByTestId(/^youtube-overlay-c_xtiZNDgGc-\d+$/);
		const ariaLabel = overlay?.getAttribute('aria-label');

		expect(ariaLabel).toBe(`Play video: ${title}`);
	});

	it('shows a placeholder if overlay is missing', () => {
		const atom = (
			<ConfigProvider
				value={{
					renderingTarget: 'Web',
					darkModeAvailable: false,
					assetOrigin: '/',
					editionId: 'UK',
				}}
			>
				<YoutubeAtom
					atomId="2e9e138b-0a23-4b96-a7f6-0258c0bacc8f"
					videoId="c_xtiZNDgGc"
					uniqueId="c_xtiZNDgGc-1"
					title="My Youtube video!"
					alt=""
					adTargeting={{ disableAds: true }}
					eventEmitters={[]}
					format={{
						theme: Pillar.News,
						design: ArticleDesign.Standard,
						display: ArticleDisplay.Standard,
					}}
					shouldStick={false}
					isMainMedia={false}
					abTestParticipations={{}}
					iconSizeOnDesktop="large"
					iconSizeOnMobile="large"
					hidePillOnMobile={false}
					showTextOverlay={false}
					renderingTarget="Web"
				/>
			</ConfigProvider>
		);
		const { getAllByTestId } = render(atom);
		const [placeholder] = getAllByTestId(
			/^youtube-placeholder-c_xtiZNDgGc-\d+$/,
		);
		expect(placeholder).toBeInTheDocument();
	});

	it('shows an overlay if present', () => {
		const atom = (
			<ConfigProvider
				value={{
					renderingTarget: 'Web',
					darkModeAvailable: false,
					assetOrigin: '/',
					editionId: 'UK',
				}}
			>
				<YoutubeAtom
					atomId="2e9e138b-0a23-4b96-a7f6-0258c0bacc8f"
					videoId="c_xtiZNDgGc"
					uniqueId="c_xtiZNDgGc-1"
					title="My Youtube video!"
					alt=""
					adTargeting={{ disableAds: true }}
					eventEmitters={[]}
					format={{
						theme: Pillar.News,
						design: ArticleDesign.Standard,
						display: ArticleDisplay.Standard,
					}}
					image={overlayImage}
					shouldStick={false}
					isMainMedia={false}
					abTestParticipations={{}}
					iconSizeOnDesktop="large"
					iconSizeOnMobile="large"
					hidePillOnMobile={false}
					showTextOverlay={false}
					renderingTarget="Web"
				/>
			</ConfigProvider>
		);
		const { getAllByTestId } = render(atom);
		const [overlay] = getAllByTestId(/^youtube-overlay-c_xtiZNDgGc-\d+$/);
		expect(overlay).toBeInTheDocument();
	});

	it('hides an overlay once it is clicked', () => {
		const atom = (
			<ConfigProvider
				value={{
					renderingTarget: 'Web',
					darkModeAvailable: false,
					assetOrigin: '/',
					editionId: 'UK',
				}}
			>
				<YoutubeAtom
					atomId="2e9e138b-0a23-4b96-a7f6-0258c0bacc8f"
					videoId="c_xtiZNDgGc"
					uniqueId="c_xtiZNDgGc-1"
					title="My Youtube video!"
					alt=""
					adTargeting={{ disableAds: true }}
					eventEmitters={[]}
					format={{
						theme: Pillar.News,
						design: ArticleDesign.Standard,
						display: ArticleDisplay.Standard,
					}}
					image={overlayImage}
					shouldStick={false}
					isMainMedia={false}
					abTestParticipations={{}}
					iconSizeOnDesktop="large"
					iconSizeOnMobile="large"
					hidePillOnMobile={false}
					showTextOverlay={false}
					renderingTarget="Web"
				/>
			</ConfigProvider>
		);
		const { getAllByTestId } = render(atom);
		const [overlay] = getAllByTestId(/^youtube-overlay-c_xtiZNDgGc-\d+$/);
		expect(overlay).toBeInTheDocument();

		overlay && fireEvent.click(overlay);
		expect(overlay).not.toBeInTheDocument();
	});

	it('when two Atoms - hides the overlay of the correct player if clicked', () => {
		const atom = (
			<>
				<ConfigProvider
					value={{
						renderingTarget: 'Web',
						darkModeAvailable: false,
						assetOrigin: '/',
						editionId: 'UK',
					}}
				>
					<YoutubeAtom
						atomId="atom1"
						videoId="c_xtiZNDgGc"
						uniqueId="c_xtiZNDgGc-1"
						title="My Youtube video!"
						alt=""
						adTargeting={{ disableAds: true }}
						eventEmitters={[]}
						format={{
							theme: Pillar.News,
							design: ArticleDesign.Standard,
							display: ArticleDisplay.Standard,
						}}
						image={overlayImage}
						shouldStick={false}
						isMainMedia={false}
						abTestParticipations={{}}
						iconSizeOnDesktop="large"
						iconSizeOnMobile="large"
						hidePillOnMobile={false}
						showTextOverlay={false}
						renderingTarget="Web"
					/>
					<YoutubeAtom
						atomId="atom1"
						videoId="c_xtiZNDgGc"
						uniqueId="c_xtiZNDgGc-2"
						title="My Youtube video 2!"
						alt=""
						adTargeting={{ disableAds: true }}
						eventEmitters={[]}
						format={{
							theme: Pillar.News,
							design: ArticleDesign.Standard,
							display: ArticleDisplay.Standard,
						}}
						image={overlayImage}
						shouldStick={false}
						isMainMedia={false}
						abTestParticipations={{}}
						iconSizeOnDesktop="large"
						iconSizeOnMobile="large"
						hidePillOnMobile={false}
						showTextOverlay={false}
						renderingTarget="Web"
					/>
				</ConfigProvider>
			</>
		);
		const { getAllByTestId } = render(atom);
		const [overlay1, overlay2] = getAllByTestId(
			/^youtube-overlay-c_xtiZNDgGc-\d+$/,
		);
		expect(overlay1).toBeInTheDocument();

		overlay1 && fireEvent.click(overlay1);
		expect(overlay1).not.toBeInTheDocument();

		expect(overlay2).toBeInTheDocument();
	});
});
