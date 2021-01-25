import React from 'react';
import { css } from 'emotion';

import { Pillar } from '@guardian/types';

import { WitnessImageBlockComponent } from './WitnessImageBlockComponent';

export default {
	component: WitnessImageBlockComponent,
	title: 'Components/WitnessImageBlockComponent',
};

const witnessBlockElement: WitnessTypeBlockElement = {
	assets: [
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
	],
	isThirdPartyTracking: false,
	_type: 'model.dotcomrendering.pageElements.WitnessBlockElement',
	witnessTypeData: {
		authorGuardianProfileUrl:
			'https://profile.theguardian.com/user/id/14989770',
		alt: 'Risk - Home Made Space expansion',
		_type: 'model.dotcomrendering.pageElements.WitnessTypeDataImage',
		authorUsername: 'Nick Ellis',
		caption:
			'Risk was always my favourite board game. I decided to send it into orbit with a home-made space expansion. ',
		originalUrl:
			'https://witness.theguardian.com/assignment/55db3248e4b0959e5f8de003/1679969',
		source: 'Guardian Witness',
		type: 'image',
		mediaId:
			'https://witness.theguardian.com/assignment/55db3248e4b0959e5f8de003/1679969',
		title: 'Risk - Home Made Space expansion',
		url:
			'https://witness.theguardian.com/assignment/55db3248e4b0959e5f8de003/1679969',
		dateCreated: '2015-08-25T12:20:58Z',
		apiUrl: 'https://n0ticeapis.com/2/report/1679969',
		authorName: 'Nick Ellis',
		witnessEmbedType: 'image',
		// html: "<div class="element-witness--main"> <a href="https://witness.theguardian.com/assignment/55db3248e4b0959e5f8de003/1679969" itemprop="url"><img src="https://gu-witness.s3.amazonaws.com/image/1440505256168e17c87ce879c40d3f575b6625340fb7c-mediumoriginalaspectdouble.jpg" alt="Risk - Home Made Space expansion" itemprop="contentURL"/></a> <figcaption> <h3 class="element-witness--title" itemprop="name"><a href="https://witness.theguardian.com/assignment/55db3248e4b0959e5f8de003/1679969" itemprop="url">Risk - Home Made Space expansion</a></h3> <div itemprop="description"> <p>Risk was always my favourite board game. I decided to send it into orbit with a home-made space expansion.</p> </div> </figcaption> </div> <footer class="element-witness--footer"> <p class="element-witness--source">Sent via <a href="https://witness.theguardian.com/" class="element-witness--brand" itemprop="provider">GuardianWitness</a></p> <div class="element-witness--metadata"> <p class="element-witness--author" itemprop="author" itemscope itemtype="http://schema.org/Person"> By <a href="https://witness.theguardian.com/user/Nick Ellis" class="element-witness--author-name" itemprop="name">Nick Ellis</a> </p> <p class="element-witness--date"> <time itemprop="dateCreated" datetime="2015-08-25T12:20:58Z">25 August 2015, 13:20</time> </p> </div> </footer> ",
		photographer: 'Nick Ellis',
		authorWitnessProfileUrl:
			'https://witness.theguardian.com/user/Nick Ellis',
	},
};

export const WitnessImageBlockComponentDefault = () => {
	const witnessTypeData = witnessBlockElement.witnessTypeData as WitnessTypeDataImage;
	return (
		<div
			className={css`
				margin: 15px;
				width: 620px;
			`}
		>
			<WitnessImageBlockComponent
				assets={witnessBlockElement.assets}
				caption={witnessTypeData.caption}
				title={witnessTypeData.title}
				authorName={witnessTypeData.authorName}
				dateCreated={witnessTypeData.dateCreated}
				alt={witnessTypeData.alt}
				pillar={Pillar.Sport}
			/>
		</div>
	);
};
