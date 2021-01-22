import React from 'react';
import { css } from 'emotion';

import { Pillar } from '@guardian/types';

import { WitnessTextBlockComponent } from './WitnessTextBlockComponent';

export default {
	component: WitnessTextBlockComponent,
	title: 'Components/WitnessTextBlockComponent',
};

const witnessTypeData: WitnessTypeDataText = {
	authorGuardianProfileUrl:
		'https://profile.theguardian.com/user/id/12260883',
	_type: 'model.dotcomrendering.pageElements.WitnessTypeDataText',
	description:
		'You could dial first and then push in ur 2p. I never had any change and needed a lift. My parents knew the routine, I&#39;d dial and you could get a second or two to shout down the line &quot;Pick me up&quot; Ah how I miss the days of a simple life where no one knew where I was and I could get away with anything as long as I was in the door by 10pm! ',
	authorUsername: 'guardianUser12260883',
	originalUrl:
		'https://witness.theguardian.com/assignment/56a8ad12e4b0b3d3432b53c4/1903093',
	source: 'Guardian Witness',
	type: 'text',
	title: 'Back in the 1970&#39;s',
	url:
		'https://witness.theguardian.com/assignment/56a8ad12e4b0b3d3432b53c4/1903093',
	dateCreated: '2016-01-29T22:19:51Z',
	apiUrl: 'https://n0ticeapis.com/2/report/1903093',
	authorName: 'Louise Griffiths',
	witnessEmbedType: 'text',
	authorWitnessProfileUrl:
		'https://witness.theguardian.com/user/guardianUser12260883',
};

export const WitnessTextBlockComponentDefault = () => (
	<div
		className={css`
			margin: 15px;
			width: 620px;
		`}
	>
		<WitnessTextBlockComponent
			title={witnessTypeData.title}
			description={witnessTypeData.description}
			authorName={witnessTypeData.authorName}
			dateCreated={witnessTypeData.dateCreated}
			pillar={Pillar.Sport}
		/>
	</div>
);
