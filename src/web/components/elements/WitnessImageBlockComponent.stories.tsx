import React from 'react';
import { css } from 'emotion';

import { Pillar } from '@guardian/types';

import { WitnessImageBlockComponent } from './WitnessImageBlockComponent';

export default {
	component: WitnessImageBlockComponent,
	title: 'Components/WitnessImageBlockComponent',
};

const witnessTypeData: WitnessTypeDataImage = {
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
	html: '',
	photographer: 'Nick Ellis',
	authorWitnessProfileUrl: 'https://witness.theguardian.com/user/Nick Ellis',
};

export const WitnessImageBlockComponentDefault = () => (
	<div
		className={css`
			margin: 15px;
			width: 620px;
		`}
	>
		<WitnessImageBlockComponent
			caption={witnessTypeData.caption}
			title={witnessTypeData.title}
			authorName={witnessTypeData.authorName}
			dateCreated={witnessTypeData.dateCreated}
			alt={witnessTypeData.alt}
			pillar={Pillar.Sport}
		/>
	</div>
);
