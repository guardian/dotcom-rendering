import { ArticlePillar } from '@guardian/libs';
import { useState } from 'react';
import { consentStateCanTarget } from '../../../fixtures/manual/consentStateCanTarget';
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
				pillar={ArticlePillar.Culture}
				height={450}
				width={800}
				shouldStick={false}
				isMainMedia={false}
				imaEnabled={false}
				abTestParticipations={{}}
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
				pillar={ArticlePillar.Culture}
				height={450}
				width={800}
				shouldStick={false}
				isMainMedia={false}
				title="Rayshard Brooks: US justice system treats us like 'animals'"
				imaEnabled={false}
				abTestParticipations={{}}
			/>
		</div>
	);
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
				pillar={ArticlePillar.News}
				overrideImage={[
					{
						srcSet: [
							{
								width: 500,
								src: 'https://i.guim.co.uk/img/media/4b3808707ec341629932a9d443ff5a812cf4df14/0_309_1800_1081/master/1800.jpg?width=1200&height=630&quality=85&auto=format&fit=crop&overlay-align=bottom%2Cleft&overlay-width=100p&overlay-base64=L2ltZy9zdGF0aWMvb3ZlcmxheXMvdGctZGVmYXVsdC5wbmc&enable=upscale&s=aff4b8255693eb449f13070df88e9cac',
							},
						],
					},
				]}
				shouldStick={false}
				isMainMedia={false}
				title="How to stop the spread of coronavirus"
				imaEnabled={false}
				abTestParticipations={{}}
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
				pillar={ArticlePillar.Sport}
				duration={252}
				consentState={consentStateCanTarget}
				posterImage={[
					{
						srcSet: [
							{
								src: 'https://media.guim.co.uk/757dd4db5818984fd600b41cdaf687668497051d/0_0_1920_1080/1000.jpg',
								width: 1000,
							},
							{
								src: 'https://media.guim.co.uk/757dd4db5818984fd600b41cdaf687668497051d/0_0_1920_1080/500.jpg',
								width: 500,
							},
							{
								src: 'https://media.guim.co.uk/757dd4db5818984fd600b41cdaf687668497051d/0_0_1920_1080/140.jpg',
								width: 140,
							},
							{
								src: 'https://media.guim.co.uk/757dd4db5818984fd600b41cdaf687668497051d/0_0_1920_1080/1920.jpg',
								width: 1920,
							},
						],
					},
				]}
				height={450}
				width={800}
				shouldStick={false}
				isMainMedia={false}
				videoCategory="documentary"
				title="How Donald Trump’s broken promises failed Ohio | Anywhere but Washington"
				imaEnabled={false}
				abTestParticipations={{}}
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
				pillar={ArticlePillar.Opinion}
				videoCategory="live"
				overrideImage={[
					{
						srcSet: [
							{
								src: 'https://i.guim.co.uk/img/media/4b3808707ec341629932a9d443ff5a812cf4df14/0_309_1800_1081/master/1800.jpg?width=1200&height=630&quality=85&auto=format&fit=crop&overlay-align=bottom%2Cleft&overlay-width=100p&overlay-base64=L2ltZy9zdGF0aWMvb3ZlcmxheXMvdGctZGVmYXVsdC5wbmc&enable=upscale&s=aff4b8255693eb449f13070df88e9cac',
								width: 1000,
							},
						],
					},
				]}
				consentState={consentStateCanTarget}
				posterImage={[
					{
						srcSet: [
							{
								src: 'https://media.guim.co.uk/757dd4db5818984fd600b41cdaf687668497051d/0_0_1920_1080/1000.jpg',
								width: 1000,
							},
							{
								src: 'https://media.guim.co.uk/757dd4db5818984fd600b41cdaf687668497051d/0_0_1920_1080/500.jpg',
								width: 500,
							},
							{
								src: 'https://media.guim.co.uk/757dd4db5818984fd600b41cdaf687668497051d/0_0_1920_1080/140.jpg',
								width: 140,
							},
							{
								src: 'https://media.guim.co.uk/757dd4db5818984fd600b41cdaf687668497051d/0_0_1920_1080/1920.jpg',
								width: 1920,
							},
						],
					},
				]}
				height={450}
				width={800}
				shouldStick={false}
				isMainMedia={false}
				title="How Donald Trump’s broken promises failed Ohio"
				imaEnabled={false}
				abTestParticipations={{}}
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
					pillar={ArticlePillar.News}
					overrideImage={[
						{
							srcSet: [
								{
									width: 500,
									src: 'https://i.guim.co.uk/img/media/4b3808707ec341629932a9d443ff5a812cf4df14/0_309_1800_1081/master/1800.jpg?width=1200&height=630&quality=85&auto=format&fit=crop&overlay-align=bottom%2Cleft&overlay-width=100p&overlay-base64=L2ltZy9zdGF0aWMvb3ZlcmxheXMvdGctZGVmYXVsdC5wbmc&enable=upscale&s=aff4b8255693eb449f13070df88e9cac',
								},
							],
						},
					]}
					height={450}
					width={800}
					shouldStick={false}
					isMainMedia={false}
					title="How to stop the spread of coronavirus"
					imaEnabled={false}
					abTestParticipations={{}}
				/>
			</div>
		</>
	);
};

export const Sticky = (): JSX.Element => {
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
				consentState={consentStateCanTarget}
				duration={252}
				pillar={ArticlePillar.Culture}
				height={450}
				width={800}
				shouldStick={true}
				isMainMedia={true}
				title="Rayshard Brooks: US justice system treats us like 'animals'"
				imaEnabled={false}
				abTestParticipations={{}}
			/>
			<div style={{ height: '1000px' }}></div>
		</div>
	);
};

export const StickyMainMedia = (): JSX.Element => {
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
				consentState={consentStateCanTarget}
				duration={252}
				pillar={ArticlePillar.Culture}
				height={450}
				width={800}
				shouldStick={true}
				isMainMedia={true}
				title="Rayshard Brooks: US justice system treats us like 'animals'"
				imaEnabled={false}
				abTestParticipations={{}}
			/>
			<div style={{ height: '1000px' }}></div>
		</div>
	);
};

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
				pillar={ArticlePillar.Culture}
				height={450}
				width={800}
				shouldStick={true}
				imaEnabled={false}
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
				consentState={consentStateCanTarget}
				duration={252}
				pillar={ArticlePillar.Culture}
				height={450}
				width={800}
				shouldStick={true}
				imaEnabled={false}
				abTestParticipations={{}}
			/>
		</div>
	);
};

DuplicateVideos.parameters = {
	chromatic: { disableSnapshot: true },
};

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
				pillar={ArticlePillar.Culture}
				height={450}
				width={800}
				shouldStick={true}
				isMainMedia={true}
				title="Rayshard Brooks: US justice system treats us like 'animals'"
				imaEnabled={false}
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
				consentState={consentStateCanTarget}
				duration={252}
				pillar={ArticlePillar.Culture}
				height={450}
				width={800}
				shouldStick={true}
				isMainMedia={true}
				title="Rayshard Brooks: US justice system treats us like 'animals'"
				imaEnabled={false}
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
				consentState={consentStateCanTarget}
				duration={252}
				pillar={ArticlePillar.Culture}
				height={450}
				width={800}
				shouldStick={true}
				isMainMedia={true}
				title="Rayshard Brooks: US justice system treats us like 'animals'"
				imaEnabled={false}
				abTestParticipations={{}}
			/>
		</div>
	);
};

MultipleStickyVideos.parameters = {
	chromatic: { disableSnapshot: true },
};
