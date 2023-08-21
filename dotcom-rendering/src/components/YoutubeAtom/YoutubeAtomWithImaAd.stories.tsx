import { ArticlePillar } from '@guardian/libs';
import { useState } from 'react';
import { consentStateCanTarget } from '../../../fixtures/manual/consentStateCanTarget';
import { YoutubeAtom } from './YoutubeAtom';

export default {
	title: 'YoutubeAtomWithImaAd',
	component: YoutubeAtom,
};

const containerStyle = { width: '800px', margin: '24px' };
const containerStyleSmall = { width: '400px', margin: '24px' };
const adTargeting = {
	customParams: {
		at: 'fixed-puppies',
	},
	adUnit: '/59666047/theguardian.com/news/article/ng',
};

export const NoConsent = () => {
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
				pillar={ArticlePillar.Culture}
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

export const AdFree = () => {
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
				pillar={ArticlePillar.Culture}
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

export const NoOverlay = () => {
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
				pillar={ArticlePillar.Culture}
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

export const WithOverrideImage = () => {
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
				imaEnabled={true}
				abTestParticipations={{}}
			/>
		</div>
	);
};

export const WithPosterImage = () => {
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
				pillar={ArticlePillar.Sport}
				duration={252}
				adTargeting={adTargeting}
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
				title="How Donald Trump’s broken promises failed Ohio | Anywhere but Washington"
				imaEnabled={true}
				abTestParticipations={{}}
			/>
		</div>
	);
};

export const WithOverlayAndPosterImage = () => {
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
				pillar={ArticlePillar.Opinion}
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
				adTargeting={adTargeting}
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
				imaEnabled={true}
				abTestParticipations={{}}
			/>
		</div>
	);
};

export const GiveConsent = () => {
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
					imaEnabled={true}
					abTestParticipations={{}}
				/>
			</div>
		</>
	);
};

export const Sticky = () => {
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
				pillar={ArticlePillar.Culture}
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

export const StickyMainMedia = () => {
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
				pillar={ArticlePillar.Culture}
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

export const DuplicateVideos = () => {
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
				pillar={ArticlePillar.Culture}
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
				pillar={ArticlePillar.Culture}
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

export const MultipleStickyVideos = () => {
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
				pillar={ArticlePillar.Culture}
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
				pillar={ArticlePillar.Culture}
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
				pillar={ArticlePillar.Culture}
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

MultipleStickyVideos.parameters = {
	chromatic: { disableSnapshot: true },
};
