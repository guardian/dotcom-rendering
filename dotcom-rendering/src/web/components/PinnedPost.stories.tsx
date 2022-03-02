/* eslint-disable jsx-a11y/aria-role */

import { css } from '@emotion/react';
import { from, breakpoints } from '@guardian/source-foundations';
import { ArticleDesign, ArticleDisplay, ArticlePillar } from '@guardian/libs';
import { PinnedPost } from './PinnedPost.importable';

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
			html: '<p>Nasa scientists have worked for years to support this mission, and kept things going despite the ongoing coronavirus disruption. </p>',
		},
	],
	id: '60300f5f8f08ad21ea60071e',
};

const Wrapper = ({ children }: { children: React.ReactNode }) => {
	return (
		<div
			css={css`
				padding: 20px;
				max-width: 700px;
				${from.tablet} {
					width: 700px;
				}
			`}
		>
			{children}
		</div>
	);
};

export default {
	component: PinnedPost,
	title: 'Components/PinnedPost',
	parameters: {
		backgrounds: {
			default: 'grey',
			values: [{ name: 'grey', value: 'lightgrey' }],
		},
		chromatic: {
			viewports: [
				breakpoints.mobile,
				breakpoints.tablet,
				breakpoints.wide,
			],
		},
	},
};

export const Expandable = () => {
	const block: Block = {
		...baseBlock,
		elements: [
			{
				elementId: '14ffdfde-113a-4270-afca-d34436dca56e',
				_type: 'model.dotcomrendering.pageElements.TextBlockElement',
				html: '<p>That’s it for our live coverage of Nasa’s celebratory news conference and Q&amp;A following the successful landing of the rover Perseverance on Mars. </p>',
			},
			{
				elementId: '1e877282-4d8f-45b0-8b2a-a27060dfc7f5',
				_type: 'model.dotcomrendering.pageElements.TextBlockElement',
				html: '<p>To recap:</p>',
			},
			{
				elementId: 'b48f6547-8346-416d-a8be-2e0e6e254087',
				_type: 'model.dotcomrendering.pageElements.TextBlockElement',
				html: '<ul> \n <li>The rover is “healthy” and undergoing systems testing.</li> \n <li>It already has beamed back stunning photos from the surface of <a href="https://www.theguardian.com/science/mars" data-component="auto-linked-tag">Mars</a> promising significant scientific discoveries ahead.</li> \n <li>The images include the first color images beamed directly from <a href="https://www.theguardian.com/science/mars" data-component="auto-linked-tag">Mars</a> as opposed to images touched up later.</li> \n <li>The rover documented its own touchdown via an ingenious system of booster rockets and a “space crane”.</li> \n <li>It landed in a “pool-table flat” crater in a prime location for searching for traces of ancient life.</li> \n <li>The wheeled rover could begin to move around its new home as early as late February.</li> \n <li>The rover’s mini helicopter could launch as early as April.</li> \n <li>Its broad mission is to stay on <a href="https://www.theguardian.com/science/mars" data-component="auto-linked-tag">Mars</a> for a couple years, gather data and harvest samples to be collected and returned to Earth on a future mission.</li> \n <li>The point is to determine whether there was life on <a href="https://www.theguardian.com/science/mars" data-component="auto-linked-tag">Mars</a> and subsidiary questions.</li> \n <li>The team at Nasa is very happy and excited, “on cloud nine” in a “weird, dreamlike state”... with lots of work ahead.</li> \n<li>The rover is “healthy” and undergoing systems testing.</li> \n <li>It already has beamed back stunning photos from the surface of <a href="https://www.theguardian.com/science/mars" data-component="auto-linked-tag">Mars</a> promising significant scientific discoveries ahead.</li> \n <li>The images include the first color images beamed directly from <a href="https://www.theguardian.com/science/mars" data-component="auto-linked-tag">Mars</a> as opposed to images touched up later.</li> \n <li>The rover documented its own touchdown via an ingenious system of booster rockets and a “space crane”.</li> \n <li>It landed in a “pool-table flat” crater in a prime location for searching for traces of ancient life.</li> \n <li>The wheeled rover could begin to move around its new home as early as late February.</li> \n <li>The rover’s mini helicopter could launch as early as April.</li> \n <li>Its broad mission is to stay on <a href="https://www.theguardian.com/science/mars" data-component="auto-linked-tag">Mars</a> for a couple years, gather data and harvest samples to be collected and returned to Earth on a future mission.</li> \n <li>The point is to determine whether there was life on <a href="https://www.theguardian.com/science/mars" data-component="auto-linked-tag">Mars</a> and subsidiary questions.</li> \n <li>The team at Nasa is very happy and excited, “on cloud nine” in a “weird, dreamlike state”... with lots of work ahead.</li> \n</ul>',
			},
		],
	};

	return (
		<Wrapper>
			<PinnedPost
				adTargeting={{
					customParams: { sens: 'f', urlkw: [] },
					adUnit: '',
				}}
				format={{
					theme: ArticlePillar.News,
					design: ArticleDesign.LiveBlog,
					display: ArticleDisplay.Standard,
				}}
				pinnedPost={block}
				pageId=""
				webTitle=""
				ajaxUrl=""
			/>
		</Wrapper>
	);
};
Expandable.story = { name: 'with expandable button' };
