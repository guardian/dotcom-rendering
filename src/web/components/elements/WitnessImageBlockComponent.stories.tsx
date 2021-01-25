import React from 'react';
import { css } from 'emotion';

import { Pillar } from '@guardian/types';

import { WitnessImageBlockComponent } from './WitnessImageBlockComponent';

export default {
	component: WitnessImageBlockComponent,
	title: 'Components/WitnessImageBlockComponent',
};

const assets: WitnessAssetType[] = [
	{
		type: 'Image',
		mimeType: 'image/jpeg',
		file:
			'https://gu-witness.s3.amazonaws.com/image/1440505256168e17c87ce879c40d3f575b6625340fb7c-mediumlandscapecropdouble.jpg',
		typeData: {
			name: 'mediumlandscapecropdouble',
		},
	},
	{
		type: 'Image',
		mimeType: 'image/jpeg',
		file:
			'https://gu-witness.s3.amazonaws.com/image/1440505256168e17c87ce879c40d3f575b6625340fb7c-mediumlandscapecrop.jpg',
		typeData: {
			name: 'mediumlandscapecrop',
		},
	},
	{
		type: 'Image',
		mimeType: 'image/jpeg',
		file:
			'https://gu-witness.s3.amazonaws.com/image/1440505256168e17c87ce879c40d3f575b6625340fb7c-mediumoriginalaspectdouble.jpg',
		typeData: {
			name: 'mediumoriginalaspectdouble',
		},
	},
	{
		type: 'Image',
		mimeType: 'image/jpeg',
		file:
			'https://gu-witness.s3.amazonaws.com/image/1440505256168e17c87ce879c40d3f575b6625340fb7c-small.jpg',
		typeData: {
			name: 'small',
		},
	},
	{
		type: 'Image',
		mimeType: 'image/jpeg',
		file:
			'https://gu-witness.s3.amazonaws.com/image/1440505256168e17c87ce879c40d3f575b6625340fb7c-medium.jpg',
		typeData: {
			name: 'medium',
		},
	},
	{
		type: 'Image',
		mimeType: 'image/jpeg',
		file:
			'https://gu-witness.s3.amazonaws.com/image/1440505256168e17c87ce879c40d3f575b6625340fb7c-large.jpg',
		typeData: {
			name: 'large',
		},
	},
	{
		type: 'Image',
		mimeType: 'image/jpeg',
		file:
			'https://gu-witness.s3.amazonaws.com/image/1440505256168e17c87ce879c40d3f575b6625340fb7c-extralarge.jpg',
		typeData: {
			name: 'extralarge',
		},
	},
	{
		type: 'Image',
		mimeType: 'image/jpeg',
		file:
			'https://gu-witness.s3.amazonaws.com/image/1440505256168e17c87ce879c40d3f575b6625340fb7c-mediumdouble.jpg',
		typeData: {
			name: 'mediumdouble',
		},
	},
];

export const WitnessImageBlockComponentDefault = () => (
	<div
		className={css`
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
			pillar={Pillar.Sport}
		/>
	</div>
);
