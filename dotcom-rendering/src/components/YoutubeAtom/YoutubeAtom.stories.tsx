import { css } from '@emotion/react';
import { ArticleDesign, ArticleDisplay, Pillar } from '@guardian/libs';
import type { Decorator, Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
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

export const NoConsent = {
	args: {
		index: 123,
		videoId: '-ZCvZmYlQD8',
		alt: '',
		eventEmitters: [(e) => console.log(`analytics event ${e} called`)],
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
		enableIma: false,
		abTestParticipations: {},
		adTargeting: {
			disableAds: true,
		},
		imagePositionOnMobile: 'none',
		imageSize: 'large',
	},
	decorators: [Container],
} satisfies Story;

export const NoOverlay = {
	args: {
		...NoConsent.args,
		consentState: {
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
		},
		title: "Rayshard Brooks: US justice system treats us like 'animals'",
	},
	decorators: [Container],
	parameters: {
		chromatic: { disableSnapshot: true },
	},
} satisfies Story;

export const WithOverrideImage = {
	args: {
		...NoConsent.args,
		consentState: NoOverlay.args.consentState,
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
		...NoConsent.args,
		consentState: NoOverlay.args.consentState,
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
		...NoConsent.args,
		consentState: NoOverlay.args.consentState,
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
		...NoConsent.args,
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
				<button onClick={() => setConsented(true)}>Give consent</button>
				<div
					css={css`
						width: 800px;
						margin: 24px;
					`}
				>
					<YoutubeAtom
						{...args}
						consentState={
							consented ? NoOverlay.args.consentState : undefined
						}
					/>
				</div>
			</>
		);
	},
	decorators: [OverlayAutoplayExplainer],
} satisfies Story;

export const Sticky = {
	args: {
		...NoConsent.args,
		consentState: NoOverlay.args.consentState,
		shouldStick: true,
		isMainMedia: true,
		shouldPauseOutOfView: true,
		title: NoOverlay.args.title,
	},
	decorators: [ScrollDown('text')],
} satisfies Story;

export const StickyMainMedia = {
	args: {
		...NoConsent.args,
		consentState: NoOverlay.args.consentState,
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
		...NoConsent.args,
		consentState: NoOverlay.args.consentState,
		shouldStick: true,
		isMainMedia: undefined,
	},
	render: (args) => (
		<>
			<YoutubeAtom {...args} />
			<br />
			<YoutubeAtom {...args} index={345} />
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
		...NoConsent.args,
		consentState: NoOverlay.args.consentState,
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
			<YoutubeAtom {...args} index={456} videoId="pcMiS6PW8aQ" />
			<YoutubeAtom {...args} index={789} videoId="3jpXAMwRSu4" />
		</div>
	),
	parameters: {
		chromatic: { disableSnapshot: true },
	},
} satisfies Story;

export const PausesOffscreen = {
	args: {
		...NoConsent.args,
		consentState: NoOverlay.args.consentState,
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

export const NoConsentWithIma = {
	...NoConsent,
	args: {
		...NoConsent.args,
		enableIma: true,
	},
} satisfies Story;

export const AdFreeWithIma = {
	args: {
		...NoConsent.args,
		consentState: NoOverlay.args.consentState,
		enableIma: true,
	},
	decorators: [Container],
} satisfies Story;

export const NoOverlayWithIma = {
	args: {
		...NoOverlay.args,
		enableIma: true,
	},
	decorators: [Container],
} satisfies Story;

export const WithOverrideImageWithIma = {
	args: {
		...WithOverrideImage.args,
		overrideImage: WithOverlayAndPosterImage.args.overrideImage,
		enableIma: true,
	},
	decorators: [Container],
} satisfies Story;

export const WithPosterImageWithIma = {
	args: {
		...WithPosterImage.args,
		enableIma: true,
		videoCategory: undefined,
	},
	decorators: [Container],
} satisfies Story;

export const WithOverlayAndPosterImageWithIma = {
	args: {
		...WithOverlayAndPosterImage.args,
		enableIma: true,
		videoCategory: undefined,
		kicker: undefined,
		showTextOverlay: undefined,
	},
	decorators: [Container],
} satisfies Story;

export const GiveConsentWithIma = {
	...GiveConsent,
	args: {
		...GiveConsent.args,
		enableIma: true,
	},
	decorators: [],
} satisfies Story;

export const StickyWithIma = {
	args: {
		...Sticky.args,
		enableIma: true,
		shouldPauseOutOfView: undefined,
	},
	decorators: [ScrollDown('arrow')],
} satisfies Story;

export const StickyMainMediaWithIma = {
	args: {
		...StickyMainMedia.args,
		enableIma: true,
	},
	decorators: [ScrollDown('arrow')],
} satisfies Story;

export const DuplicateVideosWithIma = {
	...DuplicateVideos,
	args: {
		...DuplicateVideos.args,
		enableIma: true,
	},
	parameters: undefined,
} satisfies Story;

export const MultipleStickyVideosWithIma = {
	...MultipleStickyVideos,
	args: {
		...MultipleStickyVideos.args,
		enableIma: true,
	},
} satisfies Story;
