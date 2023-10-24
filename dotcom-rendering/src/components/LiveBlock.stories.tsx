import { css } from '@emotion/react';
import { ArticleDesign, ArticleDisplay, Pillar } from '@guardian/libs';
import { breakpoints, from } from '@guardian/source-foundations';
import { lightDecorator } from '../../.storybook/decorators/themeDecorator';
import { images } from '../../fixtures/generated/images';
import { liveBlock } from '../../fixtures/manual/liveBlock';
import { LiveBlock } from './LiveBlock';

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
	component: LiveBlock,
	title: 'Components/LiveBlock',
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

export const VideoAsSecond = () => {
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

	return (
		<Wrapper>
			<LiveBlock
				format={{
					theme: Pillar.News,
					design: ArticleDesign.LiveBlog,
					display: ArticleDisplay.Standard,
				}}
				block={block}
				pageId=""
				webTitle=""
				ajaxUrl=""
				isAdFreeUser={false}
				isSensitive={false}
				switches={{}}
				isPinnedPost={false}
			/>
		</Wrapper>
	);
};
VideoAsSecond.storyName = 'with recap';

export const Title = () => {
	const block: Block = {
		...liveBlock,
		title: 'Afternoon summary',
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

	return (
		<Wrapper>
			<LiveBlock
				format={{
					theme: Pillar.News,
					design: ArticleDesign.LiveBlog,
					display: ArticleDisplay.Standard,
				}}
				block={block}
				pageId=""
				webTitle=""
				ajaxUrl=""
				isAdFreeUser={false}
				isSensitive={false}
				switches={{}}
				isPinnedPost={false}
			/>
		</Wrapper>
	);
};
Title.storyName = 'with a title';

export const Video = () => {
	const block: Block = {
		...liveBlock,
		elements: [
			{
				elementId: '09ed82c7-d0d8-445e-81b6-d8a39a547e3c',
				_type: 'model.dotcomrendering.pageElements.TextBlockElement',
				html: '<p>Have you typed “<a href="https://www.google.com/search?q=perseverance&amp;oq=pers&amp;aqs=chrome.0.69i59j69i57j0l3j46j69i60j69i61.1091j0j7&amp;sourceid=chrome&amp;ie=UTF-8">perseverance</a>” into Google today? </p>',
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
						url: 'https://media.guim.co.uk/c981848745e482e03e23b2ec9402e1f5c5bee6a6/102_73_3282_1848/2000.jpg',
						width: 2000,
					},
					{
						url: 'https://media.guim.co.uk/c981848745e482e03e23b2ec9402e1f5c5bee6a6/102_73_3282_1848/1000.jpg',
						width: 1000,
					},
					{
						url: 'https://media.guim.co.uk/c981848745e482e03e23b2ec9402e1f5c5bee6a6/102_73_3282_1848/500.jpg',
						width: 500,
					},
					{
						url: 'https://media.guim.co.uk/c981848745e482e03e23b2ec9402e1f5c5bee6a6/102_73_3282_1848/140.jpg',
						width: 140,
					},
					{
						url: 'https://media.guim.co.uk/c981848745e482e03e23b2ec9402e1f5c5bee6a6/102_73_3282_1848/3282.jpg',
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
				format={{
					theme: Pillar.News,
					design: ArticleDesign.LiveBlog,
					display: ArticleDisplay.Standard,
				}}
				block={block}
				pageId=""
				webTitle=""
				ajaxUrl=""
				isAdFreeUser={false}
				isSensitive={false}
				switches={{}}
				isPinnedPost={false}
			/>
		</Wrapper>
	);
};
Video.storyName = 'with a video as the second element';

export const RichLink = () => {
	const block: Block = {
		...liveBlock,
		elements: [
			{
				elementId: 'ae950f92-bc9b-4725-bac2-94fce86d8191',
				_type: 'model.dotcomrendering.pageElements.TextBlockElement',
				html: '<p>Now that Perseverance persevered through the “seven minutes of terror” – a new era of space exploration has officially begun. </p>',
			},
			{
				elementId: 'b49c134e-54d6-4445-a3fe-bb52a1370375',
				role: 'thumbnail',
				prefix: 'Related: ',
				_type: 'model.dotcomrendering.pageElements.RichLinkBlockElement',
				text: 'Ireland election: latest results',
				url: 'https://www.theguardian.com/world/2020/feb/10/ireland-election-latest-results-live-sinn-fein-fine-gael-fianna-fail',
			},
		],
	};
	return (
		<Wrapper>
			<LiveBlock
				format={{
					theme: Pillar.News,
					design: ArticleDesign.LiveBlog,
					display: ArticleDisplay.Standard,
				}}
				block={block}
				pageId=""
				webTitle=""
				ajaxUrl=""
				isAdFreeUser={false}
				isSensitive={false}
				switches={{}}
				isPinnedPost={false}
			/>
		</Wrapper>
	);
};
RichLink.storyName = 'with a rich link being forced inline';

export const FirstImage = () => {
	const block: Block = {
		...liveBlock,
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
				format={{
					theme: Pillar.News,
					design: ArticleDesign.LiveBlog,
					display: ArticleDisplay.Standard,
				}}
				block={block}
				pageId=""
				webTitle=""
				ajaxUrl=""
				isAdFreeUser={false}
				isSensitive={false}
				switches={{}}
				isPinnedPost={false}
			/>
		</Wrapper>
	);
};
FirstImage.storyName = 'with an image as the first element';

export const ImageRoles = () => {
	const block: Block = {
		...liveBlock,
		elements: [
			{
				...images[0],
				role: 'inline',
				title: 'Inline',
			},
			{
				...images[0],
				role: 'thumbnail',
				title: 'Thumbnail',
			},
			{
				...images[0],
				role: 'immersive',
				title: 'Immersive',
			},
			{
				...images[0],
				role: 'supporting',
				title: 'Supporting',
			},
			{
				...images[0],
				role: 'showcase',
				title: 'Showcase',
			},
			{
				...images[0],
				role: 'halfWidth',
				title: 'Half width',
			},
		],
	};
	return (
		<Wrapper>
			<LiveBlock
				format={{
					theme: Pillar.News,
					design: ArticleDesign.LiveBlog,
					display: ArticleDisplay.Standard,
				}}
				block={block}
				pageId=""
				webTitle=""
				ajaxUrl=""
				switches={{}}
				isPinnedPost={false}
				isAdFreeUser={false}
				isSensitive={false}
			/>
		</Wrapper>
	);
};
ImageRoles.storyName = 'with images at different roles';

export const Thumbnail = () => {
	const block: Block = {
		...liveBlock,
		elements: [
			{
				elementId: '1',
				_type: 'model.dotcomrendering.pageElements.TextBlockElement',
				html: '<p>eos his vis cetero dicta usu eu duo officiis ei eleifend sed repudiandae consequat vitae splendide pretium est partiendo semper ne uonsetetur ipsum aliquam per leo odio inimicus eam his tincidunt et ne semper amet et voluptua mauris qui eum nec inimicus sed aenean eu mea odio vitae at.</p>',
			},
			{
				...images[0],
				role: 'thumbnail',
			},
			{
				elementId: '1',
				_type: 'model.dotcomrendering.pageElements.TextBlockElement',
				html: '<p>eos his vis cetero dicta usu eu duo officiis ei eleifend sed repudiandae consequat vitae splendide pretium est partiendo semper ne uonsetetur ipsum aliquam per leo odio inimicus eam his tincidunt et ne semper amet et voluptua mauris qui eum nec inimicus sed aenean eu mea odio vitae at.</p>',
			},
			{
				elementId: '1',
				_type: 'model.dotcomrendering.pageElements.TextBlockElement',
				html: '<p>eos his vis cetero dicta usu eu duo officiis ei eleifend sed repudiandae consequat vitae splendide pretium est partiendo semper ne uonsetetur ipsum aliquam per leo odio inimicus eam his tincidunt et ne semper amet et voluptua mauris qui eum nec inimicus sed aenean eu mea odio vitae at.</p>',
			},
		],
	};
	return (
		<Wrapper>
			<LiveBlock
				format={{
					theme: Pillar.News,
					design: ArticleDesign.LiveBlog,
					display: ArticleDisplay.Standard,
				}}
				block={block}
				pageId=""
				webTitle=""
				ajaxUrl=""
				switches={{}}
				isPinnedPost={false}
				isAdFreeUser={false}
				isSensitive={false}
			/>
		</Wrapper>
	);
};
Thumbnail.storyName = 'with a thumbnail image surrounded by text';

export const ImageAndTitle = () => {
	const block: Block = {
		...liveBlock,
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
				format={{
					theme: Pillar.News,
					design: ArticleDesign.LiveBlog,
					display: ArticleDisplay.Standard,
				}}
				block={block}
				pageId=""
				webTitle=""
				ajaxUrl=""
				isAdFreeUser={false}
				isSensitive={false}
				switches={{}}
				isPinnedPost={false}
			/>
		</Wrapper>
	);
};
ImageAndTitle.storyName = 'with only a title and an image';

export const Updated = () => {
	const publishedDate: number = liveBlock.blockFirstPublished ?? 999999;
	const block: Block = {
		...liveBlock,
		blockFirstPublished: publishedDate,
		blockLastUpdated: publishedDate + 1000,
	};
	return (
		<Wrapper>
			<LiveBlock
				format={{
					theme: Pillar.News,
					design: ArticleDesign.LiveBlog,
					display: ArticleDisplay.Standard,
				}}
				block={block}
				pageId=""
				webTitle=""
				ajaxUrl=""
				isAdFreeUser={false}
				isSensitive={false}
				switches={{}}
				isPinnedPost={false}
			/>
		</Wrapper>
	);
};
Updated.storyName = 'with updated time showing';

export const Contributor = () => {
	const block: Block = {
		...liveBlock,
		contributors: [
			{
				name: 'Andrew Roth',
				imageUrl:
					'https://i.guim.co.uk/img/uploads/2019/06/07/Andrew_Roth,_L.png?width=300&quality=85&auto=format&fit=max&s=b43b83c4998787fd8c68631b800cb8f7',
			},
		],
	};
	return (
		<Wrapper>
			<LiveBlock
				format={{
					theme: Pillar.News,
					design: ArticleDesign.LiveBlog,
					display: ArticleDisplay.Standard,
				}}
				block={block}
				pageId=""
				webTitle=""
				ajaxUrl=""
				switches={{}}
				isPinnedPost={false}
				isAdFreeUser={false}
				isSensitive={false}
			/>
		</Wrapper>
	);
};
Contributor.storyName = 'with a contributor';

export const NoAvatar = () => {
	const block: Block = {
		...liveBlock,
		contributors: [
			{
				name: 'Andrew Roth',
			},
		],
	};
	return (
		<Wrapper>
			<LiveBlock
				format={{
					theme: Pillar.Opinion,
					design: ArticleDesign.LiveBlog,
					display: ArticleDisplay.Standard,
				}}
				block={block}
				pageId=""
				webTitle=""
				ajaxUrl=""
				switches={{}}
				isPinnedPost={false}
				isAdFreeUser={false}
				isSensitive={false}
			/>
		</Wrapper>
	);
};
NoAvatar.storyName = 'with a contributor but no avatar';

export const TitleAndContributor = () => {
	const block: Block = {
		...liveBlock,
		title: 'Afternoon summary',
		contributors: [
			{
				name: 'Andrew Roth',
				imageUrl:
					'https://i.guim.co.uk/img/uploads/2019/06/07/Andrew_Roth,_L.png?width=300&quality=85&auto=format&fit=max&s=b43b83c4998787fd8c68631b800cb8f7',
			},
		],
	};
	return (
		<Wrapper>
			<LiveBlock
				format={{
					theme: Pillar.Sport,
					design: ArticleDesign.LiveBlog,
					display: ArticleDisplay.Standard,
				}}
				block={block}
				pageId=""
				webTitle=""
				ajaxUrl=""
				switches={{}}
				isPinnedPost={false}
				isAdFreeUser={false}
				isSensitive={false}
			/>
		</Wrapper>
	);
};
TitleAndContributor.storyName = 'with a contributor and a title';
TitleAndContributor.decorators = [
	lightDecorator({
		theme: Pillar.Sport,
		design: ArticleDesign.LiveBlog,
		display: ArticleDisplay.Standard,
	}),
];
