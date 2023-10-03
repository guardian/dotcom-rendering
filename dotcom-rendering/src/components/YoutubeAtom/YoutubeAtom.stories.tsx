import type { ConsentState } from '@guardian/consent-management-platform/dist/types';
import { ArticleDesign, ArticleDisplay, Pillar } from '@guardian/libs';
import { useState } from 'react';
import { YoutubeAtom } from './YoutubeAtom';

export default {
	title: 'YoutubeAtom',
	component: YoutubeAtom,
};

const containerStyle = { width: '800px', margin: '24px' };
const containerStyleSmall = { width: '400px', margin: '24px' };
const explainerStyle = {
	fontSize: '20px',
	margin: '0 0 20px',
	width: '750px',
};
const boldStyle = { fontWeight: 'bold' };

const OverlayAutoplayExplainer = () => (
	<p style={explainerStyle}>
		If you're viewing this in the composed storybook please be aware the
		autoplay functionality in the player will not work correctly.{' '}
		<span style={boldStyle}>
			To view the correct functionality please view this story in the
			external atoms-rendering storybook by clicking the link in the
			sidebar.
		</span>
	</p>
);

const adTargeting: AdTargeting = {
	disableAds: true,
};

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

const overrideImage =
	'https://i.guim.co.uk/img/media/4b3808707ec341629932a9d443ff5a812cf4df14/0_309_1800_1081/master/1800.jpg';
const posterImage =
	'https://media.guim.co.uk/757dd4db5818984fd600b41cdaf687668497051d/0_0_1920_1080/1920.jpg';

export const NoConsent = (): JSX.Element => {
	return (
		<div style={containerStyle}>
			<YoutubeAtom
				elementId="xyz"
				videoId="-ZCvZmYlQD8"
				alt=""
				role="inline"
				eventEmitters={[
					(e) => console.log(`analytics event ${e} called`),
				]}
				duration={252}
				format={{
					theme: Pillar.Culture,
					design: ArticleDesign.Standard,
					display: ArticleDisplay.Standard,
				}}
				height={450}
				width={800}
				shouldStick={false}
				isMainMedia={false}
				imaEnabled={false}
				abTestParticipations={{}}
				adTargeting={adTargeting}
			/>
		</div>
	);
};

export const NoOverlay = (): JSX.Element => {
	return (
		<div style={containerStyle}>
			<YoutubeAtom
				elementId="xyz"
				videoId="-ZCvZmYlQD8"
				alt=""
				role="inline"
				eventEmitters={[
					(e) => console.log(`analytics event ${e} called`),
				]}
				consentState={consentStateCanTarget}
				duration={252}
				format={{
					theme: Pillar.Culture,
					design: ArticleDesign.Standard,
					display: ArticleDisplay.Standard,
				}}
				height={450}
				width={800}
				shouldStick={false}
				isMainMedia={false}
				title="Rayshard Brooks: US justice system treats us like 'animals'"
				imaEnabled={false}
				abTestParticipations={{}}
				adTargeting={adTargeting}
			/>
		</div>
	);
};

NoOverlay.parameters = {
	chromatic: { disableSnapshot: true },
};

export const WithOverrideImage = (): JSX.Element => {
	return (
		<div style={containerStyle}>
			<OverlayAutoplayExplainer />
			<YoutubeAtom
				elementId="xyz"
				videoId="3jpXAMwRSu4"
				alt="Microscopic image of COVID"
				role="inline"
				eventEmitters={[
					(e) => console.log(`analytics event ${e} called`),
				]}
				duration={252}
				consentState={consentStateCanTarget}
				format={{
					theme: Pillar.News,
					design: ArticleDesign.Standard,
					display: ArticleDisplay.Standard,
				}}
				overrideImage={
					'https://i.guim.co.uk/img/media/4b3808707ec341629932a9d443ff5a812cf4df14/0_309_1800_1081/master/1800.jpg?width=1200&height=630&quality=85&auto=format&fit=crop&overlay-align=bottom%2Cleft&overlay-width=100p&overlay-base64=L2ltZy9zdGF0aWMvb3ZlcmxheXMvdGctZGVmYXVsdC5wbmc&enable=upscale&s=aff4b8255693eb449f13070df88e9cac'
				}
				shouldStick={false}
				isMainMedia={false}
				title="How to stop the spread of coronavirus"
				imaEnabled={false}
				abTestParticipations={{}}
				adTargeting={adTargeting}
			/>
		</div>
	);
};

export const WithPosterImage = (): JSX.Element => {
	return (
		<div style={containerStyle}>
			<OverlayAutoplayExplainer />
			<YoutubeAtom
				elementId="xyz"
				videoId="N9Cgy-ke5-s"
				alt=""
				role="inline"
				eventEmitters={[
					(e) => console.log(`analytics event ${e} called`),
				]}
				format={{
					theme: Pillar.Sport,
					design: ArticleDesign.Standard,
					display: ArticleDisplay.Standard,
				}}
				duration={252}
				consentState={consentStateCanTarget}
				posterImage={
					'https://media.guim.co.uk/757dd4db5818984fd600b41cdaf687668497051d/0_0_1920_1080/1920.jpg'
				}
				height={450}
				width={800}
				shouldStick={false}
				isMainMedia={false}
				videoCategory="documentary"
				title="How Donald Trump’s broken promises failed Ohio | Anywhere but Washington"
				imaEnabled={false}
				abTestParticipations={{}}
				adTargeting={adTargeting}
			/>
		</div>
	);
};

export const WithOverlayAndPosterImage = (): JSX.Element => {
	return (
		<div style={containerStyle}>
			<OverlayAutoplayExplainer />
			<YoutubeAtom
				elementId="xyz"
				videoId="N9Cgy-ke5-s"
				alt=""
				role="inline"
				eventEmitters={[
					(e) => console.log(`analytics event ${e} called`),
				]}
				duration={252}
				format={{
					theme: Pillar.Opinion,
					design: ArticleDesign.Standard,
					display: ArticleDisplay.Standard,
				}}
				videoCategory="live"
				overrideImage={overrideImage}
				consentState={consentStateCanTarget}
				posterImage={posterImage}
				height={450}
				width={800}
				shouldStick={false}
				isMainMedia={false}
				title="How Donald Trump’s broken promises failed Ohio"
				imaEnabled={false}
				abTestParticipations={{}}
				adTargeting={adTargeting}
				kicker="Breaking News"
				showTextOverlay={true}
			/>
		</div>
	);
};

export const GiveConsent = (): JSX.Element => {
	const [consented, setConsented] = useState(false);
	return (
		<>
			<OverlayAutoplayExplainer />
			<button onClick={() => setConsented(true)}>Give consent</button>
			<div style={containerStyle}>
				<YoutubeAtom
					elementId="xyz"
					videoId="3jpXAMwRSu4"
					alt="Microscopic image of COVID"
					role="inline"
					eventEmitters={[
						(e) => console.log(`analytics event ${e} called`),
					]}
					consentState={consented ? consentStateCanTarget : undefined}
					duration={252}
					format={{
						theme: Pillar.News,
						design: ArticleDesign.Standard,
						display: ArticleDisplay.Standard,
					}}
					overrideImage={overrideImage}
					height={450}
					width={800}
					shouldStick={false}
					isMainMedia={false}
					title="How to stop the spread of coronavirus"
					imaEnabled={false}
					abTestParticipations={{}}
					adTargeting={adTargeting}
				/>
			</div>
		</>
	);
};

export const Sticky = (): JSX.Element => {
	return (
		<div>
			<div>Scroll down...</div>
			<div style={{ height: '1000px' }}></div>
			<YoutubeAtom
				elementId="xyz"
				videoId="-ZCvZmYlQD8"
				alt=""
				role="inline"
				eventEmitters={[
					(e) => console.log(`analytics event ${e} called`),
				]}
				consentState={consentStateCanTarget}
				duration={252}
				format={{
					theme: Pillar.Culture,
					design: ArticleDesign.Standard,
					display: ArticleDisplay.Standard,
				}}
				height={450}
				width={800}
				shouldStick={true}
				isMainMedia={true}
				title="Rayshard Brooks: US justice system treats us like 'animals'"
				imaEnabled={false}
				abTestParticipations={{}}
				adTargeting={adTargeting}
				shouldPauseOutOfView={true}
			/>
			<div style={{ height: '1000px' }}></div>
		</div>
	);
};

export const StickyMainMedia = (): JSX.Element => {
	return (
		<div>
			<div>Scroll down...</div>
			<div style={{ height: '1000px' }}></div>
			<YoutubeAtom
				elementId="xyz"
				videoId="-ZCvZmYlQD8"
				alt=""
				role="inline"
				eventEmitters={[
					(e) => console.log(`analytics event ${e} called`),
				]}
				consentState={consentStateCanTarget}
				duration={252}
				format={{
					theme: Pillar.Culture,
					design: ArticleDesign.Standard,
					display: ArticleDisplay.Standard,
				}}
				height={450}
				width={800}
				shouldStick={true}
				isMainMedia={true}
				title="Rayshard Brooks: US justice system treats us like 'animals'"
				imaEnabled={false}
				abTestParticipations={{}}
				adTargeting={adTargeting}
			/>
			<div style={{ height: '1000px' }}></div>
		</div>
	);
};

/**
 * Tests duplicate YoutubeAtoms on the same page.
 * Players should play independently.
 * If another video is played any other playing video should pause.
 */
export const DuplicateVideos = (): JSX.Element => {
	return (
		<div style={containerStyleSmall}>
			<YoutubeAtom
				elementId="xyz"
				videoId="-ZCvZmYlQD8"
				alt=""
				role="inline"
				eventEmitters={[
					(e) => console.log(`analytics event ${e} called`),
				]}
				consentState={consentStateCanTarget}
				duration={252}
				format={{
					theme: Pillar.Culture,
					design: ArticleDesign.Standard,
					display: ArticleDisplay.Standard,
				}}
				height={450}
				width={800}
				shouldStick={true}
				imaEnabled={false}
				abTestParticipations={{}}
				adTargeting={adTargeting}
			/>
			<br />
			<YoutubeAtom
				elementId="xyz2"
				videoId="-ZCvZmYlQD8"
				alt=""
				role="inline"
				eventEmitters={[
					(e) => console.log(`analytics event ${e} called`),
				]}
				consentState={consentStateCanTarget}
				duration={252}
				format={{
					theme: Pillar.Culture,
					design: ArticleDesign.Standard,
					display: ArticleDisplay.Standard,
				}}
				height={450}
				width={800}
				shouldStick={true}
				imaEnabled={false}
				abTestParticipations={{}}
				adTargeting={adTargeting}
			/>
		</div>
	);
};

DuplicateVideos.parameters = {
	chromatic: { disableSnapshot: true },
};

/**
 * Tests multiple YoutubeAtoms on the same page.
 * If a video is playing and the user scrolls past the video the video should stick.
 * If another video is played any other playing video should pause.
 * Closing a sticky video should pause the video.
 */
export const MultipleStickyVideos = (): JSX.Element => {
	return (
		<div style={{ width: '500px', height: '5000px' }}>
			<YoutubeAtom
				elementId="xyz"
				videoId="-ZCvZmYlQD8"
				alt=""
				role="inline"
				eventEmitters={[
					(e) => console.log(`analytics event ${e} called`),
				]}
				consentState={consentStateCanTarget}
				duration={252}
				format={{
					theme: Pillar.Culture,
					design: ArticleDesign.Standard,
					display: ArticleDisplay.Standard,
				}}
				height={450}
				width={800}
				shouldStick={true}
				isMainMedia={true}
				title="Rayshard Brooks: US justice system treats us like 'animals'"
				imaEnabled={false}
				abTestParticipations={{}}
				adTargeting={adTargeting}
			/>
			<YoutubeAtom
				elementId="xyz-2"
				videoId="pcMiS6PW8aQ"
				alt=""
				role="inline"
				eventEmitters={[
					(e) => console.log(`analytics event ${e} called`),
				]}
				consentState={consentStateCanTarget}
				duration={252}
				format={{
					theme: Pillar.Culture,
					design: ArticleDesign.Standard,
					display: ArticleDisplay.Standard,
				}}
				height={450}
				width={800}
				shouldStick={true}
				isMainMedia={true}
				title="Rayshard Brooks: US justice system treats us like 'animals'"
				imaEnabled={false}
				abTestParticipations={{}}
				adTargeting={adTargeting}
			/>
			<YoutubeAtom
				elementId="xyu"
				videoId="3jpXAMwRSu4"
				alt=""
				role="inline"
				eventEmitters={[
					(e) => console.log(`analytics event ${e} called`),
				]}
				consentState={consentStateCanTarget}
				duration={252}
				format={{
					theme: Pillar.Culture,
					design: ArticleDesign.Standard,
					display: ArticleDisplay.Standard,
				}}
				height={450}
				width={800}
				shouldStick={true}
				isMainMedia={true}
				title="Rayshard Brooks: US justice system treats us like 'animals'"
				imaEnabled={false}
				abTestParticipations={{}}
				adTargeting={adTargeting}
			/>
		</div>
	);
};

MultipleStickyVideos.parameters = {
	chromatic: { disableSnapshot: true },
};

export const PausesOffscreen = (): JSX.Element => {
	return (
		<div>
			<div>Scroll down...</div>
			<YoutubeAtom
				elementId="xyz"
				videoId="-ZCvZmYlQD8"
				alt=""
				role="inline"
				eventEmitters={[
					(e) => console.log(`analytics event ${e} called`),
				]}
				consentState={consentStateCanTarget}
				duration={252}
				format={{
					theme: Pillar.Culture,
					design: ArticleDesign.Standard,
					display: ArticleDisplay.Standard,
				}}
				height={450}
				width={800}
				shouldStick={false}
				isMainMedia={true}
				title="Rayshard Brooks: US justice system treats us like 'animals'"
				imaEnabled={false}
				abTestParticipations={{}}
				adTargeting={adTargeting}
				shouldPauseOutOfView={true}
			/>
			<div style={{ height: '1000px' }}></div>
			<p>It stopped playing!</p>
		</div>
	);
};

PausesOffscreen.parameters = {
	chromatic: { disableSnapshot: true },
};

export const NoConsentWithIma = (): JSX.Element => {
	return (
		<div style={containerStyle}>
			<YoutubeAtom
				elementId="xyz"
				videoId="-ZCvZmYlQD8"
				alt=""
				role="inline"
				eventEmitters={[
					(e) => console.log(`analytics event ${e} called`),
				]}
				adTargeting={adTargeting}
				duration={252}
				format={{
					theme: Pillar.Culture,
					design: ArticleDesign.Standard,
					display: ArticleDisplay.Standard,
				}}
				height={450}
				width={800}
				shouldStick={false}
				isMainMedia={false}
				imaEnabled={true}
				abTestParticipations={{}}
			/>
		</div>
	);
};

export const AdFreeWithIma = (): JSX.Element => {
	return (
		<div style={containerStyle}>
			<YoutubeAtom
				elementId="xyz"
				videoId="-ZCvZmYlQD8"
				alt=""
				role="inline"
				eventEmitters={[
					(e) => console.log(`analytics event ${e} called`),
				]}
				adTargeting={{ disableAds: true }}
				consentState={consentStateCanTarget}
				duration={252}
				format={{
					theme: Pillar.Culture,
					design: ArticleDesign.Standard,
					display: ArticleDisplay.Standard,
				}}
				height={450}
				width={800}
				shouldStick={false}
				isMainMedia={false}
				imaEnabled={true}
				abTestParticipations={{}}
			/>
		</div>
	);
};

export const NoOverlayWithIma = (): JSX.Element => {
	return (
		<div style={containerStyle}>
			<YoutubeAtom
				elementId="xyz"
				videoId="-ZCvZmYlQD8"
				alt=""
				role="inline"
				eventEmitters={[
					(e) => console.log(`analytics event ${e} called`),
				]}
				adTargeting={adTargeting}
				consentState={consentStateCanTarget}
				duration={252}
				format={{
					theme: Pillar.Culture,
					design: ArticleDesign.Standard,
					display: ArticleDisplay.Standard,
				}}
				height={450}
				width={800}
				shouldStick={false}
				isMainMedia={false}
				title="Rayshard Brooks: US justice system treats us like 'animals'"
				imaEnabled={true}
				abTestParticipations={{}}
			/>
		</div>
	);
};

export const WithOverrideImageWithIma = (): JSX.Element => {
	return (
		<div style={containerStyle}>
			<YoutubeAtom
				elementId="xyz"
				videoId="3jpXAMwRSu4"
				alt="Microscopic image of COVID"
				role="inline"
				eventEmitters={[
					(e) => console.log(`analytics event ${e} called`),
				]}
				duration={252}
				adTargeting={adTargeting}
				consentState={consentStateCanTarget}
				format={{
					theme: Pillar.News,
					design: ArticleDesign.Standard,
					display: ArticleDisplay.Standard,
				}}
				overrideImage={overrideImage}
				shouldStick={false}
				isMainMedia={false}
				title="How to stop the spread of coronavirus"
				imaEnabled={true}
				abTestParticipations={{}}
			/>
		</div>
	);
};

export const WithPosterImageWithIma = (): JSX.Element => {
	return (
		<div style={containerStyle}>
			<YoutubeAtom
				elementId="xyz"
				videoId="N9Cgy-ke5-s"
				alt=""
				role="inline"
				eventEmitters={[
					(e) => console.log(`analytics event ${e} called`),
				]}
				format={{
					theme: Pillar.Sport,
					design: ArticleDesign.Standard,
					display: ArticleDisplay.Standard,
				}}
				duration={252}
				adTargeting={adTargeting}
				consentState={consentStateCanTarget}
				posterImage={posterImage}
				height={450}
				width={800}
				shouldStick={false}
				isMainMedia={false}
				title="How Donald Trump’s broken promises failed Ohio | Anywhere but Washington"
				imaEnabled={true}
				abTestParticipations={{}}
			/>
		</div>
	);
};

export const WithOverlayAndPosterImageWithIma = (): JSX.Element => {
	return (
		<div style={containerStyle}>
			<YoutubeAtom
				elementId="xyz"
				videoId="N9Cgy-ke5-s"
				alt=""
				role="inline"
				eventEmitters={[
					(e) => console.log(`analytics event ${e} called`),
				]}
				duration={252}
				format={{
					theme: Pillar.Opinion,
					design: ArticleDesign.Standard,
					display: ArticleDisplay.Standard,
				}}
				overrideImage={overrideImage}
				adTargeting={adTargeting}
				consentState={consentStateCanTarget}
				posterImage={posterImage}
				height={450}
				width={800}
				shouldStick={false}
				isMainMedia={false}
				title="How Donald Trump’s broken promises failed Ohio"
				imaEnabled={true}
				abTestParticipations={{}}
			/>
		</div>
	);
};

export const GiveConsentWithIma = (): JSX.Element => {
	const [consented, setConsented] = useState(false);
	return (
		<>
			<button onClick={() => setConsented(true)}>Give consent</button>
			<div style={containerStyle}>
				<YoutubeAtom
					elementId="xyz"
					videoId="3jpXAMwRSu4"
					alt="Microscopic image of COVID"
					role="inline"
					eventEmitters={[
						(e) => console.log(`analytics event ${e} called`),
					]}
					adTargeting={adTargeting}
					consentState={consented ? consentStateCanTarget : undefined}
					duration={252}
					format={{
						theme: Pillar.News,
						design: ArticleDesign.Standard,
						display: ArticleDisplay.Standard,
					}}
					overrideImage={overrideImage}
					height={450}
					width={800}
					shouldStick={false}
					isMainMedia={false}
					title="How to stop the spread of coronavirus"
					imaEnabled={true}
					abTestParticipations={{}}
				/>
			</div>
		</>
	);
};

export const StickyWithIma = (): JSX.Element => {
	return (
		<div>
			<div style={{ fontSize: '36px' }}>⬇️</div>
			<div style={{ height: '1000px' }}></div>
			<YoutubeAtom
				elementId="xyz"
				videoId="-ZCvZmYlQD8"
				alt=""
				role="inline"
				eventEmitters={[
					(e) => console.log(`analytics event ${e} called`),
				]}
				adTargeting={adTargeting}
				consentState={consentStateCanTarget}
				duration={252}
				format={{
					theme: Pillar.Culture,
					design: ArticleDesign.Standard,
					display: ArticleDisplay.Standard,
				}}
				height={450}
				width={800}
				shouldStick={true}
				isMainMedia={true}
				title="Rayshard Brooks: US justice system treats us like 'animals'"
				imaEnabled={true}
				abTestParticipations={{}}
			/>
			<div style={{ height: '1000px' }}></div>
		</div>
	);
};

export const StickyMainMediaWithIma = (): JSX.Element => {
	return (
		<div>
			<div style={{ fontSize: '36px' }}>⬇️</div>
			<div style={{ height: '1000px' }}></div>
			<YoutubeAtom
				elementId="xyz"
				videoId="-ZCvZmYlQD8"
				alt=""
				role="inline"
				eventEmitters={[
					(e) => console.log(`analytics event ${e} called`),
				]}
				adTargeting={adTargeting}
				consentState={consentStateCanTarget}
				duration={252}
				format={{
					theme: Pillar.Culture,
					design: ArticleDesign.Standard,
					display: ArticleDisplay.Standard,
				}}
				height={450}
				width={800}
				shouldStick={true}
				isMainMedia={true}
				title="Rayshard Brooks: US justice system treats us like 'animals'"
				imaEnabled={true}
				abTestParticipations={{}}
			/>
			<div style={{ height: '1000px' }}></div>
		</div>
	);
};

export const DuplicateVideosWithIma = (): JSX.Element => {
	return (
		<div style={containerStyleSmall}>
			<YoutubeAtom
				elementId="xyz"
				videoId="-ZCvZmYlQD8"
				alt=""
				role="inline"
				eventEmitters={[
					(e) => console.log(`analytics event ${e} called`),
				]}
				adTargeting={adTargeting}
				consentState={consentStateCanTarget}
				duration={252}
				format={{
					theme: Pillar.Culture,
					design: ArticleDesign.Standard,
					display: ArticleDisplay.Standard,
				}}
				height={450}
				width={800}
				shouldStick={true}
				imaEnabled={true}
				abTestParticipations={{}}
			/>
			<br />
			<YoutubeAtom
				elementId="xyz2"
				videoId="-ZCvZmYlQD8"
				alt=""
				role="inline"
				eventEmitters={[
					(e) => console.log(`analytics event ${e} called`),
				]}
				adTargeting={adTargeting}
				consentState={consentStateCanTarget}
				duration={252}
				format={{
					theme: Pillar.Culture,
					design: ArticleDesign.Standard,
					display: ArticleDisplay.Standard,
				}}
				height={450}
				width={800}
				shouldStick={true}
				imaEnabled={true}
				abTestParticipations={{}}
			/>
		</div>
	);
};

DuplicateVideos.parameters = {
	chromatic: { disableSnapshot: true },
};

export const MultipleStickyVideosWithIma = (): JSX.Element => {
	return (
		<div style={{ width: '500px', height: '5000px' }}>
			<YoutubeAtom
				elementId="xyz"
				videoId="-ZCvZmYlQD8"
				alt=""
				role="inline"
				eventEmitters={[
					(e) => console.log(`analytics event ${e} called`),
				]}
				adTargeting={adTargeting}
				consentState={consentStateCanTarget}
				duration={252}
				format={{
					theme: Pillar.Culture,
					design: ArticleDesign.Standard,
					display: ArticleDisplay.Standard,
				}}
				height={450}
				width={800}
				shouldStick={true}
				isMainMedia={true}
				title="Rayshard Brooks: US justice system treats us like 'animals'"
				imaEnabled={true}
				abTestParticipations={{}}
			/>
			<YoutubeAtom
				elementId="xyz-2"
				videoId="pcMiS6PW8aQ"
				alt=""
				role="inline"
				eventEmitters={[
					(e) => console.log(`analytics event ${e} called`),
				]}
				adTargeting={adTargeting}
				consentState={consentStateCanTarget}
				duration={252}
				format={{
					theme: Pillar.Culture,
					design: ArticleDesign.Standard,
					display: ArticleDisplay.Standard,
				}}
				height={450}
				width={800}
				shouldStick={true}
				isMainMedia={true}
				title="Rayshard Brooks: US justice system treats us like 'animals'"
				imaEnabled={true}
				abTestParticipations={{}}
			/>
			<YoutubeAtom
				elementId="xyu"
				videoId="3jpXAMwRSu4"
				alt=""
				role="inline"
				eventEmitters={[
					(e) => console.log(`analytics event ${e} called`),
				]}
				adTargeting={adTargeting}
				consentState={consentStateCanTarget}
				duration={252}
				format={{
					theme: Pillar.Culture,
					design: ArticleDesign.Standard,
					display: ArticleDisplay.Standard,
				}}
				height={450}
				width={800}
				shouldStick={true}
				isMainMedia={true}
				title="Rayshard Brooks: US justice system treats us like 'animals'"
				imaEnabled={true}
				abTestParticipations={{}}
			/>
		</div>
	);
};

MultipleStickyVideosWithIma.parameters = {
	chromatic: { disableSnapshot: true },
};
