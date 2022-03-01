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

export const MinimumHeight = () => {
	const block: Block = {
		...baseBlock,
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
MinimumHeight.story = { name: 'with minimum height' };
