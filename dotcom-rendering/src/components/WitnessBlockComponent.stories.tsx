import { css } from '@emotion/react';
import { ArticleDesign, ArticleDisplay, Pillar } from '@guardian/libs';
import { lightDecorator } from '../../.storybook/decorators/themeDecorator';
import type { WitnessAssetType } from '../types/content';
import {
	WitnessImageBlockComponent,
	WitnessTextBlockComponent,
	WitnessVideoBlockComponent,
} from './WitnessBlockComponent';

export default {
	title: 'Components/WitnessBlockComponent',
	parameters: {
		chromatic: {
			disable: true,
		},
	},
};

const sportFormat = {
	display: ArticleDisplay.Standard,
	design: ArticleDesign.Standard,
	theme: Pillar.Sport,
};

export const WitnessTextBlockComponentDefault = () => (
	<div
		css={css`
			margin: 15px;
			width: 620px;
		`}
	>
		<WitnessTextBlockComponent
			title="Back in the 1970&#39;s"
			description='You could dial first and then push in ur 2p. I never had any change and needed a lift. My parents knew the routine, I&#39;d dial and you could get a second or two to shout down the line "Pick me up" Ah how I miss the days of a simple life where no one knew where I was and I could get away with anything as long as I was in the door by 10pm! '
			authorName="Louise Griffiths"
			dateCreated="2016-01-29T22:19:51Z"
			editionId="UK"
		/>
	</div>
);
WitnessTextBlockComponentDefault.decorators = [lightDecorator([sportFormat])];

const assets: WitnessAssetType[] = [
	{
		type: 'Image',
		mimeType: 'image/jpeg',
		file: 'https://gu-witness.s3.amazonaws.com/image/1440505256168e17c87ce879c40d3f575b6625340fb7c-mediumlandscapecropdouble.jpg',
		typeData: {
			name: 'mediumlandscapecropdouble',
		},
	},
	{
		type: 'Image',
		mimeType: 'image/jpeg',
		file: 'https://gu-witness.s3.amazonaws.com/image/1440505256168e17c87ce879c40d3f575b6625340fb7c-mediumlandscapecrop.jpg',
		typeData: {
			name: 'mediumlandscapecrop',
		},
	},
	{
		type: 'Image',
		mimeType: 'image/jpeg',
		file: 'https://gu-witness.s3.amazonaws.com/image/1440505256168e17c87ce879c40d3f575b6625340fb7c-mediumoriginalaspectdouble.jpg',
		typeData: {
			name: 'mediumoriginalaspectdouble',
		},
	},
	{
		type: 'Image',
		mimeType: 'image/jpeg',
		file: 'https://gu-witness.s3.amazonaws.com/image/1440505256168e17c87ce879c40d3f575b6625340fb7c-small.jpg',
		typeData: {
			name: 'small',
		},
	},
	{
		type: 'Image',
		mimeType: 'image/jpeg',
		file: 'https://gu-witness.s3.amazonaws.com/image/1440505256168e17c87ce879c40d3f575b6625340fb7c-medium.jpg',
		typeData: {
			name: 'medium',
		},
	},
	{
		type: 'Image',
		mimeType: 'image/jpeg',
		file: 'https://gu-witness.s3.amazonaws.com/image/1440505256168e17c87ce879c40d3f575b6625340fb7c-large.jpg',
		typeData: {
			name: 'large',
		},
	},
	{
		type: 'Image',
		mimeType: 'image/jpeg',
		file: 'https://gu-witness.s3.amazonaws.com/image/1440505256168e17c87ce879c40d3f575b6625340fb7c-extralarge.jpg',
		typeData: {
			name: 'extralarge',
		},
	},
	{
		type: 'Image',
		mimeType: 'image/jpeg',
		file: 'https://gu-witness.s3.amazonaws.com/image/1440505256168e17c87ce879c40d3f575b6625340fb7c-mediumdouble.jpg',
		typeData: {
			name: 'mediumdouble',
		},
	},
];

export const WitnessImageBlockComponentDefault = () => (
	<div
		css={css`
			margin: 15px;
			width: 620px;
		`}
	>
		<WitnessImageBlockComponent
			assets={assets}
			caption="Risk was always my favourite board game. I decided to send it into orbit with a home-made space expansion. "
			title="Risk - Home Made Space expansion"
			authorName="Nick Ellis"
			dateCreated="2015-08-25T12:20:58Z"
			alt="Risk - Home Made Space expansion"
			editionId="UK"
		/>
	</div>
);
WitnessImageBlockComponentDefault.decorators = [lightDecorator([sportFormat])];

export const WitnessVideoBlockComponentDefault = () => (
	<div
		css={css`
			margin: 15px;
			width: 620px;
		`}
	>
		<WitnessVideoBlockComponent
			title="Warhammer Quest Timelapse"
			description="Tell me if you&#39;ve heard this one before: A Dwarf, a thief, a fighter and a priest walk into a dungeon ... Warhammer Quest is the quintessential &#39;Old School&#39; dungeon-crawler."
			authorName="Gregg Lewis-Qualls"
			youtubeHtml='<iframe width="440" height="330" src="https://www.youtube.com/embed/N9Cgy-ke5-s?origin=https://www.theguardian.com&widgetid=1&modestbranding=1" frameborder="0" allowfullscreen></iframe>'
			dateCreated="2015-08-27T13:32:32Z"
			editionId="UK"
		/>
	</div>
);
WitnessVideoBlockComponentDefault.decorators = [lightDecorator([sportFormat])];
