/* eslint-disable jsx-a11y/aria-role */

import { css } from '@emotion/react';

import { Design, Display, Pillar } from '@guardian/types';

import { images } from '@root/fixtures/generated/images';

import { LiveBlock } from './LiveBlock';

const baseBlock: Block = {
	secondaryDateLine: 'First published on Fri 19 Feb 2021 17.20 GMT',
	blockFirstPublishedDisplay: '19.30 GMT',
	blockLastUpdated: 1613763519000,
	firstPublishedDisplay: '17.20 GMT',
	lastUpdatedDisplay: '19.47 GMT',
	blockCreatedOnDisplay: '19.19 GMT',
	blockLastUpdatedDisplay: '19.38 GMT',
	firstPublished: 1613755208000,
	createdOn: 1613762399000,
	primaryDateLine: 'Fri 19 Feb 2021 19.41 GMT',
	blockCreatedOn: 1613762399000,
	blockFirstPublished: 1613763003000,
	createdOnDisplay: '19.19 GMT',
	lastUpdated: 1613764059000,
	elements: [
		{
			elementId: '4ac2fcd8-284c-4038-91a1-093811f389ba',
			_type: 'model.dotcomrendering.pageElements.TextBlockElement',
			html:
				'<p>Nasa scientists have worked for years to support this mission, and kept things going despite the ongoing coronavirus disruption. </p>',
		},
	],
	id: '60300f5f8f08ad21ea60071e',
};

const Wrapper = ({ children }: { children: React.ReactNode }) => {
	return (
		<div
			css={css`
				padding: 20px;
				max-width: 620px;
			`}
		>
			{children}
		</div>
	);
};

export default {
	component: LiveBlock,
	title: 'Components/LiveBlock',
	parameters: {
		backgrounds: {
			default: 'grey',
			values: [{ name: 'grey', value: 'lightgrey' }],
		},
	},
};

export const VideoAsSecond = () => {
	const block: Block = {
		...baseBlock,
		elements: [
			{
				elementId: '14ffdfde-113a-4270-afca-d34436dca56e',
				_type: 'model.dotcomrendering.pageElements.TextBlockElement',
				html:
					'<p>That’s it for our live coverage of Nasa’s celebratory news conference and Q&amp;A following the successful landing of the rover Perseverance on Mars. </p>',
			},
			{
				elementId: '1e877282-4d8f-45b0-8b2a-a27060dfc7f5',
				_type: 'model.dotcomrendering.pageElements.TextBlockElement',
				html: '<p>To recap:</p>',
			},
			{
				elementId: 'b48f6547-8346-416d-a8be-2e0e6e254087',
				_type: 'model.dotcomrendering.pageElements.TextBlockElement',
				html:
					'<ul> \n <li>The rover is “healthy” and undergoing systems testing.</li> \n <li>It already has beamed back stunning photos from the surface of <a href="https://www.theguardian.com/science/mars" data-component="auto-linked-tag">Mars</a> promising significant scientific discoveries ahead.</li> \n <li>The images include the first color images beamed directly from <a href="https://www.theguardian.com/science/mars" data-component="auto-linked-tag">Mars</a> as opposed to images touched up later.</li> \n <li>The rover documented its own touchdown via an ingenious system of booster rockets and a “space crane”.</li> \n <li>It landed in a “pool-table flat” crater in a prime location for searching for traces of ancient life.</li> \n <li>The wheeled rover could begin to move around its new home as early as late February.</li> \n <li>The rover’s mini helicopter could launch as early as April.</li> \n <li>Its broad mission is to stay on <a href="https://www.theguardian.com/science/mars" data-component="auto-linked-tag">Mars</a> for a couple years, gather data and harvest samples to be collected and returned to Earth on a future mission.</li> \n <li>The point is to determine whether there was life on <a href="https://www.theguardian.com/science/mars" data-component="auto-linked-tag">Mars</a> and subsidiary questions.</li> \n <li>The team at Nasa is very happy and excited, “on cloud nine” in a “weird, dreamlike state”... with lots of work ahead.</li> \n</ul>',
			},
		],
	};

	return (
		<Wrapper>
			<LiveBlock
				adTargeting={{ adUnit: '', customParams: {} }}
				format={{
					theme: Pillar.News,
					design: Design.LiveBlog,
					display: Display.Standard,
				}}
				block={block}
				pageId=""
				webTitle=""
			/>
		</Wrapper>
	);
};
VideoAsSecond.story = { name: 'with recap' };

export const Title = () => {
	const block: Block = {
		...baseBlock,
		title: 'Afternoon summary',
		elements: [
			{
				elementId: '14ffdfde-113a-4270-afca-d34436dca56e',
				_type: 'model.dotcomrendering.pageElements.TextBlockElement',
				html:
					'<p>That’s it for our live coverage of Nasa’s celebratory news conference and Q&amp;A following the successful landing of the rover Perseverance on Mars. </p>',
			},
			{
				elementId: '1e877282-4d8f-45b0-8b2a-a27060dfc7f5',
				_type: 'model.dotcomrendering.pageElements.TextBlockElement',
				html: '<p>To recap:</p>',
			},
			{
				elementId: 'b48f6547-8346-416d-a8be-2e0e6e254087',
				_type: 'model.dotcomrendering.pageElements.TextBlockElement',
				html:
					'<ul> \n <li>The rover is “healthy” and undergoing systems testing.</li> \n <li>It already has beamed back stunning photos from the surface of <a href="https://www.theguardian.com/science/mars" data-component="auto-linked-tag">Mars</a> promising significant scientific discoveries ahead.</li> \n <li>The images include the first color images beamed directly from <a href="https://www.theguardian.com/science/mars" data-component="auto-linked-tag">Mars</a> as opposed to images touched up later.</li> \n <li>The rover documented its own touchdown via an ingenious system of booster rockets and a “space crane”.</li> \n <li>It landed in a “pool-table flat” crater in a prime location for searching for traces of ancient life.</li> \n <li>The wheeled rover could begin to move around its new home as early as late February.</li> \n <li>The rover’s mini helicopter could launch as early as April.</li> \n <li>Its broad mission is to stay on <a href="https://www.theguardian.com/science/mars" data-component="auto-linked-tag">Mars</a> for a couple years, gather data and harvest samples to be collected and returned to Earth on a future mission.</li> \n <li>The point is to determine whether there was life on <a href="https://www.theguardian.com/science/mars" data-component="auto-linked-tag">Mars</a> and subsidiary questions.</li> \n <li>The team at Nasa is very happy and excited, “on cloud nine” in a “weird, dreamlike state”... with lots of work ahead.</li> \n</ul>',
			},
		],
	};

	return (
		<Wrapper>
			<LiveBlock
				adTargeting={{ adUnit: '', customParams: {} }}
				format={{
					theme: Pillar.News,
					design: Design.LiveBlog,
					display: Display.Standard,
				}}
				block={block}
				pageId=""
				webTitle=""
			/>
		</Wrapper>
	);
};
Title.story = { name: 'with a title' };

export const Video = () => {
	const block: Block = {
		...baseBlock,
		elements: [
			{
				elementId: '09ed82c7-d0d8-445e-81b6-d8a39a547e3c',
				_type: 'model.dotcomrendering.pageElements.TextBlockElement',
				html:
					'<p>Have you typed “<a href="https://www.google.com/search?q=perseverance&amp;oq=pers&amp;aqs=chrome.0.69i59j69i57j0l3j46j69i60j69i61.1091j0j7&amp;sourceid=chrome&amp;ie=UTF-8">perseverance</a>” into Google today? </p>',
			},
			{
				duration: 142,
				elementId: '27eac530-7088-4541-a1c5-3347a3d837fb',
				expired: false,
				mediaTitle:
					'Nasa launches Perseverance rover in mission to find evidence of life on Mars – video',
				assetId: 'XmP56yBy-18',
				_type: 'model.dotcomrendering.pageElements.YoutubeBlockElement',
				id: '60606947-4f1f-4343-9bb7-000e91502129',
				posterImage: [
					{
						url:
							'https://media.guim.co.uk/c981848745e482e03e23b2ec9402e1f5c5bee6a6/102_73_3282_1848/2000.jpg',
						width: 2000,
					},
					{
						url:
							'https://media.guim.co.uk/c981848745e482e03e23b2ec9402e1f5c5bee6a6/102_73_3282_1848/1000.jpg',
						width: 1000,
					},
					{
						url:
							'https://media.guim.co.uk/c981848745e482e03e23b2ec9402e1f5c5bee6a6/102_73_3282_1848/500.jpg',
						width: 500,
					},
					{
						url:
							'https://media.guim.co.uk/c981848745e482e03e23b2ec9402e1f5c5bee6a6/102_73_3282_1848/140.jpg',
						width: 140,
					},
					{
						url:
							'https://media.guim.co.uk/c981848745e482e03e23b2ec9402e1f5c5bee6a6/102_73_3282_1848/3282.jpg',
						width: 3282,
					},
				],
				channelId: 'UCIRYBXDze5krPDzAEOxFGVA',
			},
		],
	};
	return (
		<Wrapper>
			<LiveBlock
				adTargeting={{ adUnit: '', customParams: {} }}
				format={{
					theme: Pillar.News,
					design: Design.LiveBlog,
					display: Display.Standard,
				}}
				block={block}
				pageId=""
				webTitle=""
			/>
		</Wrapper>
	);
};
Video.story = { name: 'with a video as the second element' };

export const RichLink = () => {
	const block: Block = {
		...baseBlock,
		elements: [
			{
				elementId: 'ae950f92-bc9b-4725-bac2-94fce86d8191',
				_type: 'model.dotcomrendering.pageElements.TextBlockElement',
				html:
					'<p>Now that Perseverance persevered through the “seven minutes of terror” – a new era of space exploration has officially begun. </p>',
			},
			{
				elementId: 'b49c134e-54d6-4445-a3fe-bb52a1370375',
				role: 'thumbnail',
				prefix: 'Related: ',
				_type:
					'model.dotcomrendering.pageElements.RichLinkBlockElement',
				text: 'Ireland election: latest results',
				url:
					'https://www.theguardian.com/world/2020/feb/10/ireland-election-latest-results-live-sinn-fein-fine-gael-fianna-fail',
			},
		],
	};
	return (
		<Wrapper>
			<LiveBlock
				adTargeting={{ adUnit: '', customParams: {} }}
				format={{
					theme: Pillar.News,
					design: Design.LiveBlog,
					display: Display.Standard,
				}}
				block={block}
				pageId=""
				webTitle=""
			/>
		</Wrapper>
	);
};
RichLink.story = { name: 'with a rich link being forced inline' };

export const FirstImage = () => {
	const block: Block = {
		...baseBlock,
		elements: [
			{
				...images[0],
				role: 'inline',
			},
		],
	};
	return (
		<Wrapper>
			<LiveBlock
				adTargeting={{ adUnit: '', customParams: {} }}
				format={{
					theme: Pillar.News,
					design: Design.LiveBlog,
					display: Display.Standard,
				}}
				block={block}
				pageId=""
				webTitle=""
			/>
		</Wrapper>
	);
};
FirstImage.story = { name: 'with an image as the first element' };

export const ImaheAndTitle = () => {
	const block: Block = {
		...baseBlock,
		title: 'Afternoon summary',
		elements: [
			{
				...images[0],
				role: 'inline',
			},
		],
	};
	return (
		<Wrapper>
			<LiveBlock
				adTargeting={{ adUnit: '', customParams: {} }}
				format={{
					theme: Pillar.News,
					design: Design.LiveBlog,
					display: Display.Standard,
				}}
				block={block}
				pageId=""
				webTitle=""
			/>
		</Wrapper>
	);
};
ImaheAndTitle.story = { name: 'with only a title and an image' };

export const Updated = () => {
	const publishedDate: number = baseBlock.blockFirstPublished || 999999;
	const block: Block = {
		...baseBlock,
		blockFirstPublished: publishedDate,
		blockLastUpdated: publishedDate + 1000,
	};
	return (
		<Wrapper>
			<LiveBlock
				adTargeting={{ adUnit: '', customParams: {} }}
				format={{
					theme: Pillar.News,
					design: Design.LiveBlog,
					display: Display.Standard,
				}}
				block={block}
				pageId=""
				webTitle=""
			/>
		</Wrapper>
	);
};
Updated.story = {
	name: 'with updated time showing',
};
