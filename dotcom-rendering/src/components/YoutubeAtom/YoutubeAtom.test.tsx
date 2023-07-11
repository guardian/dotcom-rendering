import { fireEvent, render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { consentStateCanTarget } from '../../../fixtures/manual/consentStateCanTarget';
import { YoutubeAtom } from './YoutubeAtom';

const overlayImage = [
	{
		srcSet: [
			{
				width: 500,
				src: 'https://i.guim.co.uk/img/media/4b3808707ec341629932a9d443ff5a812cf4df14/0_309_1800_1081/master/1800.jpg?width=1200&height=630&quality=85&auto=format&fit=crop&overlay-align=bottom%2Cleft&overlay-width=100p&overlay-base64=L2ltZy9zdGF0aWMvb3ZlcmxheXMvdGctZGVmYXVsdC5wbmc&enable=upscale&s=aff4b8255693eb449f13070df88e9cac',
			},
		],
	},
];

describe('YoutubeAtom', () => {
	it('Player initialises when no overlay and has consent state', () => {
		const atom = (
			<YoutubeAtom
				elementId="xyz"
				title="My Youtube video!"
				videoId="ZCvZmYlQD8"
				alt=""
				role="inline"
				adTargeting={{ disableAds: true }}
				eventEmitters={[]}
				pillar={0}
				consentState={consentStateCanTarget}
				shouldStick={false}
				isMainMedia={false}
				imaEnabled={false}
				abTestParticipations={{}}
			/>
		);
		const { getByTestId } = render(atom);
		const playerDiv = getByTestId('youtube-video-ZCvZmYlQD8-xyz');
		expect(playerDiv).toBeInTheDocument();
	});

	it('Player initialises when overlay clicked and has consent state', () => {
		const atom = (
			<YoutubeAtom
				elementId="xyz"
				title="My Youtube video!"
				videoId="ZCvZmYlQD8"
				alt=""
				role="inline"
				adTargeting={{ disableAds: true }}
				eventEmitters={[]}
				pillar={0}
				consentState={consentStateCanTarget}
				overrideImage={overlayImage}
				shouldStick={false}
				isMainMedia={false}
				imaEnabled={false}
				abTestParticipations={{}}
			/>
		);
		const { getByTestId } = render(atom);
		const overlay = getByTestId('youtube-overlay-ZCvZmYlQD8-xyz');
		expect(overlay).toBeInTheDocument();

		fireEvent.click(getByTestId('youtube-overlay-ZCvZmYlQD8-xyz'));
		expect(overlay).not.toBeInTheDocument();

		const playerDiv = getByTestId('youtube-video-ZCvZmYlQD8-xyz');
		expect(playerDiv).toBeInTheDocument();
	});

	it('player div has correct title', () => {
		const title = 'My Youtube video!';

		const atom = (
			<YoutubeAtom
				elementId="xyz"
				title="My Youtube video!"
				videoId="ZCvZmYlQD8"
				alt=""
				role="inline"
				adTargeting={{ disableAds: true }}
				eventEmitters={[]}
				pillar={0}
				consentState={consentStateCanTarget}
				shouldStick={false}
				isMainMedia={false}
				imaEnabled={false}
				abTestParticipations={{}}
			/>
		);
		const { getByTestId } = render(atom);
		const playerDiv = getByTestId('youtube-video-ZCvZmYlQD8-xyz');
		expect(playerDiv.title).toBe(title);
	});

	it('overlay has correct aria-label', () => {
		const title = 'My Youtube video!';
		const atom = (
			<YoutubeAtom
				elementId="xyz"
				title="My Youtube video!"
				videoId="ZCvZmYlQD8"
				alt=""
				role="inline"
				adTargeting={{ disableAds: true }}
				eventEmitters={[]}
				pillar={0}
				consentState={consentStateCanTarget}
				overrideImage={overlayImage}
				shouldStick={false}
				isMainMedia={false}
				imaEnabled={false}
				abTestParticipations={{}}
			/>
		);
		const { getByTestId } = render(atom);
		const overlay = getByTestId('youtube-overlay-ZCvZmYlQD8-xyz');
		const ariaLabel = overlay.getAttribute('aria-label');

		expect(ariaLabel).toBe(`Play video: ${title}`);
	});

	it('shows a placeholder if overlay is missing', () => {
		const atom = (
			<YoutubeAtom
				elementId="xyz"
				title="My Youtube video!"
				videoId="ZCvZmYlQD8"
				alt=""
				role="inline"
				adTargeting={{ disableAds: true }}
				eventEmitters={[]}
				pillar={0}
				shouldStick={false}
				isMainMedia={false}
				imaEnabled={false}
				abTestParticipations={{}}
			/>
		);
		const { getByTestId } = render(atom);
		const placeholder = getByTestId('youtube-placeholder-ZCvZmYlQD8-xyz');
		expect(placeholder).toBeInTheDocument();
	});

	it('shows an overlay if present', () => {
		const atom = (
			<YoutubeAtom
				elementId="xyz"
				title="My Youtube video!"
				videoId="ZCvZmYlQD8"
				alt=""
				role="inline"
				adTargeting={{ disableAds: true }}
				eventEmitters={[]}
				pillar={0}
				overrideImage={overlayImage}
				shouldStick={false}
				isMainMedia={false}
				imaEnabled={false}
				abTestParticipations={{}}
			/>
		);
		const { getByTestId } = render(atom);
		const overlay = getByTestId('youtube-overlay-ZCvZmYlQD8-xyz');
		expect(overlay).toBeInTheDocument();
	});

	it('hides an overlay once it is clicked', () => {
		const atom = (
			<YoutubeAtom
				elementId="xyz"
				title="My Youtube video!"
				videoId="ZCvZmYlQD8"
				alt=""
				role="inline"
				adTargeting={{ disableAds: true }}
				eventEmitters={[]}
				pillar={0}
				overrideImage={overlayImage}
				shouldStick={false}
				isMainMedia={false}
				imaEnabled={false}
				abTestParticipations={{}}
			/>
		);
		const { getByTestId } = render(atom);
		const overlay = getByTestId('youtube-overlay-ZCvZmYlQD8-xyz');
		expect(overlay).toBeInTheDocument();

		fireEvent.click(getByTestId('youtube-overlay-ZCvZmYlQD8-xyz'));
		expect(overlay).not.toBeInTheDocument();
	});

	it('when two Atoms - hides the overlay of the correct player if clicked', () => {
		const atom = (
			<>
				<YoutubeAtom
					elementId="xyz"
					title="My Youtube video!"
					videoId="ZCvZmYlQD8"
					alt=""
					role="inline"
					adTargeting={{ disableAds: true }}
					eventEmitters={[]}
					pillar={0}
					overrideImage={overlayImage}
					shouldStick={false}
					isMainMedia={false}
					imaEnabled={false}
					abTestParticipations={{}}
				/>
				<YoutubeAtom
					elementId="xyz"
					title="My Youtube video 2!"
					videoId="ZCvZmYlQD8_2"
					alt=""
					role="inline"
					adTargeting={{ disableAds: true }}
					eventEmitters={[]}
					pillar={0}
					overrideImage={overlayImage}
					shouldStick={false}
					isMainMedia={false}
					imaEnabled={false}
					abTestParticipations={{}}
				/>
			</>
		);
		const { getByTestId } = render(atom);
		const overlay1 = getByTestId('youtube-overlay-ZCvZmYlQD8-xyz');
		expect(overlay1).toBeInTheDocument();

		fireEvent.click(getByTestId('youtube-overlay-ZCvZmYlQD8-xyz'));
		expect(overlay1).not.toBeInTheDocument();

		const overlay2 = getByTestId(`youtube-overlay-ZCvZmYlQD8_2-xyz`);
		expect(overlay2).toBeInTheDocument();
	});
});
