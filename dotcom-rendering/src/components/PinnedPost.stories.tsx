import { css } from '@emotion/react';
import {
	ArticleDesign,
	ArticleDisplay,
	ArticleSpecial,
	Pillar,
} from '@guardian/libs';
import { breakpoints, from } from '@guardian/source-foundations';
import { liveBlock } from '../../fixtures/manual/liveBlock';
import { LiveBlock } from './LiveBlock';
import { PinnedPost } from './PinnedPost';

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

export const Sport = () => {
	const block: Block = {
		...liveBlock,
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
				html: '<ul> \n <li>The rover is “healthy” and undergoing systems testing.</li> \n <li>It already has beamed back stunning photos from the surface of <a href="https://www.theguardian.com/science/mars" data-component="auto-linked-tag">Mars</a> promising significant scientific discoveries ahead.</li> \n <li>The images include the first color images beamed directly from <a href="https://www.theguardian.com/science/mars" data-component="auto-linked-tag">Mars</a> as opposed to images touched up later.</li> \n <li>The rover documented its own touchdown via an ingenious system of booster rockets and a “space crane”.</li> \n <li>It landed in a “pool-table flat” crater in a prime location for searching for traces of ancient life.</li> \n <li>The wheeled rover could begin to move around its new home as early as late February.</li> \n <li>The rover’s mini helicopter could launch as early as April.</li> \n <li>Its broad mission is to stay on <a href="https://www.theguardian.com/science/mars" data-component="auto-linked-tag">Mars</a> for a couple years, gather data and harvest samples to be collected and returned to Earth on a future mission.</li> \n <li>The point is to determine whether there was life on <a href="https://www.theguardian.com/science/mars" data-component="auto-linked-tag">Mars</a> and subsidiary questions.</li> \n <li>The team at Nasa is very happy and excited, “on cloud nine” in a “weird, dreamlike state”... with lots of work ahead.</li> \n</ul>',
			},
		],
	};
	const format = {
		theme: Pillar.Sport,
		design: ArticleDesign.LiveBlog,
		display: ArticleDisplay.Standard,
	};
	return (
		<Wrapper>
			<PinnedPost pinnedPost={block} format={format}>
				<LiveBlock
					format={format}
					block={block}
					pageId=""
					webTitle=""
					ajaxUrl=""
					isAdFreeUser={false}
					isSensitive={false}
					abTests={{}}
					switches={{}}
					isPinnedPost={true}
				/>
			</PinnedPost>
		</Wrapper>
	);
};

export const News = () => {
	const block: Block = {
		...liveBlock,
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
				html: '<ul> \n <li>The rover is “healthy” and undergoing systems testing.</li> \n <li>It already has beamed back stunning photos from the surface of <a href="https://www.theguardian.com/science/mars" data-component="auto-linked-tag">Mars</a> promising significant scientific discoveries ahead.</li> \n <li>The images include the first color images beamed directly from <a href="https://www.theguardian.com/science/mars" data-component="auto-linked-tag">Mars</a> as opposed to images touched up later.</li> \n <li>The rover documented its own touchdown via an ingenious system of booster rockets and a “space crane”.</li> \n <li>It landed in a “pool-table flat” crater in a prime location for searching for traces of ancient life.</li> \n <li>The wheeled rover could begin to move around its new home as early as late February.</li> \n <li>The rover’s mini helicopter could launch as early as April.</li> \n <li>Its broad mission is to stay on <a href="https://www.theguardian.com/science/mars" data-component="auto-linked-tag">Mars</a> for a couple years, gather data and harvest samples to be collected and returned to Earth on a future mission.</li> \n <li>The point is to determine whether there was life on <a href="https://www.theguardian.com/science/mars" data-component="auto-linked-tag">Mars</a> and subsidiary questions.</li> \n <li>The team at Nasa is very happy and excited, “on cloud nine” in a “weird, dreamlike state”... with lots of work ahead.</li> \n</ul>',
			},
		],
	};
	const format = {
		theme: Pillar.News,
		design: ArticleDesign.LiveBlog,
		display: ArticleDisplay.Standard,
	};
	return (
		<Wrapper>
			<PinnedPost pinnedPost={block} format={format}>
				<LiveBlock
					format={format}
					block={block}
					pageId=""
					webTitle=""
					ajaxUrl=""
					isAdFreeUser={false}
					isSensitive={false}
					abTests={{}}
					switches={{}}
					isPinnedPost={true}
				/>
			</PinnedPost>
		</Wrapper>
	);
};

export const Culture = () => {
	const block: Block = {
		...liveBlock,
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
				html: '<ul> \n <li>The rover is “healthy” and undergoing systems testing.</li> \n <li>It already has beamed back stunning photos from the surface of <a href="https://www.theguardian.com/science/mars" data-component="auto-linked-tag">Mars</a> promising significant scientific discoveries ahead.</li> \n <li>The images include the first color images beamed directly from <a href="https://www.theguardian.com/science/mars" data-component="auto-linked-tag">Mars</a> as opposed to images touched up later.</li> \n <li>The rover documented its own touchdown via an ingenious system of booster rockets and a “space crane”.</li> \n <li>It landed in a “pool-table flat” crater in a prime location for searching for traces of ancient life.</li> \n <li>The wheeled rover could begin to move around its new home as early as late February.</li> \n <li>The rover’s mini helicopter could launch as early as April.</li> \n <li>Its broad mission is to stay on <a href="https://www.theguardian.com/science/mars" data-component="auto-linked-tag">Mars</a> for a couple years, gather data and harvest samples to be collected and returned to Earth on a future mission.</li> \n <li>The point is to determine whether there was life on <a href="https://www.theguardian.com/science/mars" data-component="auto-linked-tag">Mars</a> and subsidiary questions.</li> \n <li>The team at Nasa is very happy and excited, “on cloud nine” in a “weird, dreamlike state”... with lots of work ahead.</li> \n</ul>',
			},
		],
	};
	const format = {
		theme: Pillar.Culture,
		design: ArticleDesign.LiveBlog,
		display: ArticleDisplay.Standard,
	};
	return (
		<Wrapper>
			<PinnedPost pinnedPost={block} format={format}>
				<LiveBlock
					format={format}
					block={block}
					pageId=""
					webTitle=""
					ajaxUrl=""
					isAdFreeUser={false}
					isSensitive={false}
					abTests={{}}
					switches={{}}
					isPinnedPost={true}
				/>
			</PinnedPost>
		</Wrapper>
	);
};

export const Lifestyle = () => {
	const block: Block = {
		...liveBlock,
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
				html: '<ul> \n <li>The rover is “healthy” and undergoing systems testing.</li> \n <li>It already has beamed back stunning photos from the surface of <a href="https://www.theguardian.com/science/mars" data-component="auto-linked-tag">Mars</a> promising significant scientific discoveries ahead.</li> \n <li>The images include the first color images beamed directly from <a href="https://www.theguardian.com/science/mars" data-component="auto-linked-tag">Mars</a> as opposed to images touched up later.</li> \n <li>The rover documented its own touchdown via an ingenious system of booster rockets and a “space crane”.</li> \n <li>It landed in a “pool-table flat” crater in a prime location for searching for traces of ancient life.</li> \n <li>The wheeled rover could begin to move around its new home as early as late February.</li> \n <li>The rover’s mini helicopter could launch as early as April.</li> \n <li>Its broad mission is to stay on <a href="https://www.theguardian.com/science/mars" data-component="auto-linked-tag">Mars</a> for a couple years, gather data and harvest samples to be collected and returned to Earth on a future mission.</li> \n <li>The point is to determine whether there was life on <a href="https://www.theguardian.com/science/mars" data-component="auto-linked-tag">Mars</a> and subsidiary questions.</li> \n <li>The team at Nasa is very happy and excited, “on cloud nine” in a “weird, dreamlike state”... with lots of work ahead.</li> \n</ul>',
			},
		],
	};
	const format = {
		theme: Pillar.Lifestyle,
		design: ArticleDesign.LiveBlog,
		display: ArticleDisplay.Standard,
	};
	return (
		<Wrapper>
			<PinnedPost pinnedPost={block} format={format}>
				<LiveBlock
					format={format}
					block={block}
					pageId=""
					webTitle=""
					ajaxUrl=""
					isAdFreeUser={false}
					isSensitive={false}
					abTests={{}}
					switches={{}}
					isPinnedPost={true}
				/>
			</PinnedPost>
		</Wrapper>
	);
};

export const Opinion = () => {
	const block: Block = {
		...liveBlock,
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
				html: '<ul> \n <li>The rover is “healthy” and undergoing systems testing.</li> \n <li>It already has beamed back stunning photos from the surface of <a href="https://www.theguardian.com/science/mars" data-component="auto-linked-tag">Mars</a> promising significant scientific discoveries ahead.</li> \n <li>The images include the first color images beamed directly from <a href="https://www.theguardian.com/science/mars" data-component="auto-linked-tag">Mars</a> as opposed to images touched up later.</li> \n <li>The rover documented its own touchdown via an ingenious system of booster rockets and a “space crane”.</li> \n <li>It landed in a “pool-table flat” crater in a prime location for searching for traces of ancient life.</li> \n <li>The wheeled rover could begin to move around its new home as early as late February.</li> \n <li>The rover’s mini helicopter could launch as early as April.</li> \n <li>Its broad mission is to stay on <a href="https://www.theguardian.com/science/mars" data-component="auto-linked-tag">Mars</a> for a couple years, gather data and harvest samples to be collected and returned to Earth on a future mission.</li> \n <li>The point is to determine whether there was life on <a href="https://www.theguardian.com/science/mars" data-component="auto-linked-tag">Mars</a> and subsidiary questions.</li> \n <li>The team at Nasa is very happy and excited, “on cloud nine” in a “weird, dreamlike state”... with lots of work ahead.</li> \n</ul>',
			},
		],
	};
	const format = {
		theme: Pillar.Opinion,
		design: ArticleDesign.LiveBlog,
		display: ArticleDisplay.Standard,
	};
	return (
		<Wrapper>
			<PinnedPost pinnedPost={block} format={format}>
				<LiveBlock
					format={format}
					block={block}
					pageId=""
					webTitle=""
					ajaxUrl=""
					isAdFreeUser={false}
					isSensitive={false}
					abTests={{}}
					switches={{}}
					isPinnedPost={true}
				/>
			</PinnedPost>
		</Wrapper>
	);
};

export const SpecialReport = () => {
	const block: Block = {
		...liveBlock,
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
				html: '<ul> \n <li>The rover is “healthy” and undergoing systems testing.</li> \n <li>It already has beamed back stunning photos from the surface of <a href="https://www.theguardian.com/science/mars" data-component="auto-linked-tag">Mars</a> promising significant scientific discoveries ahead.</li> \n <li>The images include the first color images beamed directly from <a href="https://www.theguardian.com/science/mars" data-component="auto-linked-tag">Mars</a> as opposed to images touched up later.</li> \n <li>The rover documented its own touchdown via an ingenious system of booster rockets and a “space crane”.</li> \n <li>It landed in a “pool-table flat” crater in a prime location for searching for traces of ancient life.</li> \n <li>The wheeled rover could begin to move around its new home as early as late February.</li> \n <li>The rover’s mini helicopter could launch as early as April.</li> \n <li>Its broad mission is to stay on <a href="https://www.theguardian.com/science/mars" data-component="auto-linked-tag">Mars</a> for a couple years, gather data and harvest samples to be collected and returned to Earth on a future mission.</li> \n <li>The point is to determine whether there was life on <a href="https://www.theguardian.com/science/mars" data-component="auto-linked-tag">Mars</a> and subsidiary questions.</li> \n <li>The team at Nasa is very happy and excited, “on cloud nine” in a “weird, dreamlike state”... with lots of work ahead.</li> \n</ul>',
			},
		],
	};
	const format = {
		theme: ArticleSpecial.SpecialReport,
		design: ArticleDesign.LiveBlog,
		display: ArticleDisplay.Standard,
	};
	return (
		<Wrapper>
			<PinnedPost pinnedPost={block} format={format}>
				<LiveBlock
					format={format}
					block={block}
					pageId=""
					webTitle=""
					ajaxUrl=""
					isAdFreeUser={false}
					isSensitive={false}
					abTests={{}}
					switches={{}}
					isPinnedPost={true}
				/>
			</PinnedPost>
		</Wrapper>
	);
};

export const Labs = () => {
	const block: Block = {
		...liveBlock,
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
				html: '<ul> \n <li>The rover is “healthy” and undergoing systems testing.</li> \n <li>It already has beamed back stunning photos from the surface of <a href="https://www.theguardian.com/science/mars" data-component="auto-linked-tag">Mars</a> promising significant scientific discoveries ahead.</li> \n <li>The images include the first color images beamed directly from <a href="https://www.theguardian.com/science/mars" data-component="auto-linked-tag">Mars</a> as opposed to images touched up later.</li> \n <li>The rover documented its own touchdown via an ingenious system of booster rockets and a “space crane”.</li> \n <li>It landed in a “pool-table flat” crater in a prime location for searching for traces of ancient life.</li> \n <li>The wheeled rover could begin to move around its new home as early as late February.</li> \n <li>The rover’s mini helicopter could launch as early as April.</li> \n <li>Its broad mission is to stay on <a href="https://www.theguardian.com/science/mars" data-component="auto-linked-tag">Mars</a> for a couple years, gather data and harvest samples to be collected and returned to Earth on a future mission.</li> \n <li>The point is to determine whether there was life on <a href="https://www.theguardian.com/science/mars" data-component="auto-linked-tag">Mars</a> and subsidiary questions.</li> \n <li>The team at Nasa is very happy and excited, “on cloud nine” in a “weird, dreamlike state”... with lots of work ahead.</li> \n</ul>',
			},
		],
	};
	const format = {
		theme: ArticleSpecial.Labs,
		design: ArticleDesign.LiveBlog,
		display: ArticleDisplay.Standard,
	};
	return (
		<Wrapper>
			<PinnedPost pinnedPost={block} format={format}>
				<LiveBlock
					format={format}
					block={block}
					pageId=""
					webTitle=""
					ajaxUrl=""
					isAdFreeUser={false}
					isSensitive={false}
					abTests={{}}
					switches={{}}
					isPinnedPost={true}
				/>
			</PinnedPost>
		</Wrapper>
	);
};
