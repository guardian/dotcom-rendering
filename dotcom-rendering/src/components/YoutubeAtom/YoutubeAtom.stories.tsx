import { css } from '@emotion/react';
import type { ConsentState } from '@guardian/libs';
import { ArticleDesign, ArticleDisplay, Pillar } from '@guardian/libs';
import type { Decorator, Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import type {
	ImagePositionType,
	ImageSizeType,
} from '../Card/components/ImageWrapper';
import type { Props } from './YoutubeAtom';
import { YoutubeAtom } from './YoutubeAtom';

const meta = {
	title: 'Components/Youtube Atom',
	component: YoutubeAtom,
} satisfies Meta<typeof YoutubeAtom>;

export default meta;

type Story = StoryObj<typeof meta>;

const Container: Decorator = (Story) => (
	<div
		css={css`
			width: 800px;
			margin: 24px;
		`}
	>
		<Story />
	</div>
);

const SmallContainer: Decorator = (Story) => (
	<div
		css={css`
			width: 400px;
			margin: 24px;
		`}
	>
		<Story />
	</div>
);

const OverlayAutoplayExplainer: Decorator = (Story) => (
	<>
		<p
			css={css`
				font-size: 20px;
				margin: 0 0 20px;
				width: 750px;
			`}
		>
			If you're viewing this in the composed storybook please be aware the
			autoplay functionality in the player will not work correctly.{' '}
			<span
				css={css`
					font-weight: bold;
				`}
			>
				To view the correct functionality please view this story in the
				external dotcom-rendering storybook by clicking the link in the
				sidebar.
			</span>
		</p>
		<Story />
	</>
);

const ScrollDown =
	(instructions: 'text' | 'arrow'): Decorator =>
	(Story) => (
		<div>
			{instructions === 'text' ? (
				<div>Scroll down...</div>
			) : (
				<div
					css={css`
						font-size: 36px;
					`}
				>
					⬇️
				</div>
			)}
			<div
				css={css`
					height: 1000px;
				`}
			></div>
			<Story />
			<div
				css={css`
					height: 1000px;
				`}
			></div>
		</div>
	);

const disableAds = { disableAds: true } satisfies AdTargeting;

const adTargeting = {
	adUnit: 'adUnit',
	customParams: {
		sens: 'f',
		urlkw: ['keyword1', 'keyword2'],
	},
} satisfies AdTargeting;

const consentGiven = {
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
} satisfies ConsentState;

const consentNotGiven = {
	canTarget: false,
	framework: 'tcfv2',
} satisfies ConsentState;

const adTargetingAndConsentGiven = {
	...adTargeting,
	...consentGiven,
} satisfies AdTargeting & ConsentState;

const imagePositionOnMobile: ImagePositionType = 'none';
const imageSize: ImageSizeType = 'large';

const baseConfiguration = {
	atomId: 'a2502abd-1373-45a2-b508-3e5a2ec050be',
	videoId: '-ZCvZmYlQD8',
	uniqueId: '-ZCvZmYlQD8-1',
	alt: '',
	eventEmitters: [
		// eslint-disable-next-line no-console -- check event emitters are called
		(e: unknown) => console.log(`event emitter ${String(e)} called`),
	],
	duration: 252,
	format: {
		theme: Pillar.Culture,
		design: ArticleDesign.Standard,
		display: ArticleDisplay.Standard,
	},
	height: 450,
	width: 800,
	shouldStick: false,
	isMainMedia: false,
	abTestParticipations: {},
	adTargeting: disableAds,
	imagePositionOnMobile,
	imageSize,
	consentState: consentGiven,
	renderingTarget: 'Web',
} satisfies Partial<Props>;

const NoConsent = {
	args: {
		...baseConfiguration,
		consentState: consentNotGiven,
	},
	decorators: [Container],
} satisfies Story;

export const NoOverlay = {
	args: {
		...baseConfiguration,
		title: "Rayshard Brooks: US justice system treats us like 'animals'",
	},
	decorators: [Container],
	parameters: {
		chromatic: { disableSnapshot: true },
	},
} satisfies Story;

export const WithOverrideImage = {
	args: {
		...baseConfiguration,
		videoId: '3jpXAMwRSu4',
		alt: 'Microscopic image of COVID',
		format: {
			theme: Pillar.News,
			design: ArticleDesign.Standard,
			display: ArticleDisplay.Standard,
		},
		overrideImage:
			'https://i.guim.co.uk/img/media/4b3808707ec341629932a9d443ff5a812cf4df14/0_309_1800_1081/master/1800.jpg?width=1200&height=630&quality=85&auto=format&fit=crop&overlay-align=bottom%2Cleft&overlay-width=100p&overlay-base64=L2ltZy9zdGF0aWMvb3ZlcmxheXMvdGctZGVmYXVsdC5wbmc&enable=upscale&s=aff4b8255693eb449f13070df88e9cac',
		height: undefined,
		width: undefined,
		title: 'How to stop the spread of coronavirus',
	},
	decorators: [OverlayAutoplayExplainer, Container],
} satisfies Story;

export const WithPosterImage = {
	args: {
		...baseConfiguration,
		videoId: 'N9Cgy-ke5-s',
		format: {
			theme: Pillar.Sport,
			design: ArticleDesign.Standard,
			display: ArticleDisplay.Standard,
		},
		posterImage:
			'https://media.guim.co.uk/757dd4db5818984fd600b41cdaf687668497051d/0_0_1920_1080/1920.jpg',
		videoCategory: 'documentary',
		title: 'How Donald Trump’s broken promises failed Ohio | Anywhere but Washington',
	},
	decorators: [OverlayAutoplayExplainer, Container],
} satisfies Story;

export const WithOverlayAndPosterImage = {
	args: {
		...baseConfiguration,
		videoId: WithPosterImage.args.videoId,
		format: {
			theme: Pillar.Opinion,
			design: ArticleDesign.Standard,
			display: ArticleDisplay.Standard,
		},
		posterImage: WithPosterImage.args.posterImage,
		overrideImage:
			'https://i.guim.co.uk/img/media/4b3808707ec341629932a9d443ff5a812cf4df14/0_309_1800_1081/master/1800.jpg',
		videoCategory: 'live',
		title: 'How Donald Trump’s broken promises failed Ohio',
		kicker: 'Breaking News',
		showTextOverlay: true,
	},
	decorators: [OverlayAutoplayExplainer, Container],
} satisfies Story;

export const GiveConsent = {
	args: {
		...baseConfiguration,
		...consentNotGiven,
		videoId: WithOverrideImage.args.videoId,
		alt: WithOverrideImage.args.alt,
		format: WithOverrideImage.args.format,
		title: WithOverrideImage.args.title,
		overrideImage: WithOverlayAndPosterImage.args.overrideImage,
	},
	render: function Render(args) {
		const [consented, setConsented] = useState(false);

		return (
			<>
				<button type="button" onClick={() => setConsented(true)}>
					Give consent
				</button>
				<div
					css={css`
						width: 800px;
						margin: 24px;
					`}
				>
					<YoutubeAtom
						{...args}
						consentState={consented ? consentGiven : undefined}
					/>
				</div>
			</>
		);
	},
	decorators: [OverlayAutoplayExplainer],
} satisfies Story;

export const Sticky = {
	args: {
		...baseConfiguration,
		shouldStick: true,
		isMainMedia: true,
		shouldPauseOutOfView: true,
		title: NoOverlay.args.title,
	},
	decorators: [ScrollDown('text')],
} satisfies Story;

export const StickyMainMedia = {
	args: {
		...baseConfiguration,
		shouldStick: true,
		isMainMedia: true,
		title: NoOverlay.args.title,
	},
	decorators: [ScrollDown('text')],
} satisfies Story;

/**
 * Tests duplicate YoutubeAtoms on the same page.
 * Players should play independently.
 * If another video is played any other playing video should pause.
 */
export const DuplicateVideos = {
	args: {
		...baseConfiguration,
		shouldStick: true,
		isMainMedia: undefined,
	},
	render: (args) => (
		<>
			<YoutubeAtom {...args} />
			<br />
			<YoutubeAtom {...args} uniqueId="ZCvZmYlQD8-2" />
		</>
	),
	decorators: [SmallContainer],
	parameters: {
		chromatic: { disableSnapshot: true },
	},
} satisfies Story;

/**
 * Tests multiple YoutubeAtoms on the same page.
 * If a video is playing and the user scrolls past the video the video should stick.
 * If another video is played any other playing video should pause.
 * Closing a sticky video should pause the video.
 */
export const MultipleStickyVideos = {
	args: {
		...baseConfiguration,
		shouldStick: true,
		isMainMedia: true,
		title: NoOverlay.args.title,
	},
	render: (args) => (
		<div
			css={css`
				width: 500px;
				height: 5000px;
			`}
		>
			<YoutubeAtom {...args} />
			<YoutubeAtom
				{...args}
				uniqueId="pcMiS6PW8aQ-1"
				videoId="pcMiS6PW8aQ"
			/>
			<YoutubeAtom
				{...args}
				uniqueId="3jpXAMwRSu4-1"
				videoId="3jpXAMwRSu4"
			/>
		</div>
	),
	parameters: {
		chromatic: { disableSnapshot: true },
	},
} satisfies Story;

export const PausesOffscreen = {
	args: {
		...baseConfiguration,
		isMainMedia: true,
		title: NoOverlay.args.title,
		shouldPauseOutOfView: true,
	},
	render: (args) => (
		<div>
			<div>Scroll down...</div>
			<YoutubeAtom {...args} />
			<div
				css={css`
					height: 1000px;
				`}
			></div>
			<p>It stopped playing!</p>
		</div>
	),
	parameters: {
		chromatic: { disableSnapshot: true },
	},
} satisfies Story;

/**
 * Duplicate YoutubeAtom tests but with ads enabled.
 *
 * The YouTube ads integration (IMA) only works on allow listed https domains.
 * The tests require running:
 * - DCR as normal on port 3030
 * - scripts/nginx/setup.sh to setup nginx on https://r.thegulocal.com
 *
 * The ad enabled tests are a convenience for manual testing.
 *
 */

export const NoConsentWithAds = {
	args: {
		...NoConsent.args,
		adTargeting,
	},
	parameters: {
		chromatic: { disableSnapshot: true },
	},
} satisfies Story;

export const NoOverlayWithAds = {
	args: {
		...NoOverlay.args,
		...adTargetingAndConsentGiven,
	},
	decorators: [Container],
	parameters: {
		chromatic: { disableSnapshot: true },
	},
} satisfies Story;

export const WithOverrideImageWithAds = {
	args: {
		...WithOverrideImage.args,
		...adTargetingAndConsentGiven,
		overrideImage: WithOverlayAndPosterImage.args.overrideImage,
	},
	decorators: [Container],
	parameters: {
		chromatic: { disableSnapshot: true },
	},
} satisfies Story;

export const WithPosterImageWithAds = {
	args: {
		...WithPosterImage.args,
		...adTargetingAndConsentGiven,
		videoCategory: undefined,
	},
	decorators: [Container],
	parameters: {
		chromatic: { disableSnapshot: true },
	},
} satisfies Story;

export const WithOverlayAndPosterImageWithAds = {
	args: {
		...WithOverlayAndPosterImage.args,
		...adTargetingAndConsentGiven,
		videoCategory: undefined,
		kicker: undefined,
		showTextOverlay: undefined,
	},
	decorators: [Container],
	parameters: {
		chromatic: { disableSnapshot: true },
	},
} satisfies Story;

export const GiveConsentWithAds = {
	...GiveConsent,
	args: {
		...GiveConsent.args,
		adTargeting,
	},
	decorators: [],
	parameters: {
		chromatic: { disableSnapshot: true },
	},
} satisfies Story;

export const StickyWithAds = {
	args: {
		...Sticky.args,
		...adTargetingAndConsentGiven,
		shouldPauseOutOfView: undefined,
	},
	decorators: [ScrollDown('arrow')],
	parameters: {
		chromatic: { disableSnapshot: true },
	},
} satisfies Story;

export const StickyMainMediaWithAds = {
	args: {
		...StickyMainMedia.args,
		...adTargetingAndConsentGiven,
	},
	decorators: [ScrollDown('arrow')],
	parameters: {
		chromatic: { disableSnapshot: true },
	},
} satisfies Story;

export const DuplicateVideosWithAds = {
	...DuplicateVideos,
	args: {
		...DuplicateVideos.args,
		...adTargetingAndConsentGiven,
	},
	parameters: {
		chromatic: { disableSnapshot: true },
	},
} satisfies Story;

export const MultipleStickyVideosWithAds = {
	...MultipleStickyVideos,
	args: {
		...MultipleStickyVideos.args,
		...adTargetingAndConsentGiven,
	},
	parameters: {
		chromatic: { disableSnapshot: true },
	},
} satisfies Story;
