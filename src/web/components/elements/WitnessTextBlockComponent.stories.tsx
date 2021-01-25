import React from 'react';
import { css } from 'emotion';

import { Pillar } from '@guardian/types';

import { WitnessTextBlockComponent } from './WitnessTextBlockComponent';

export default {
	component: WitnessTextBlockComponent,
	title: 'Components/WitnessTextBlockComponent',
};

export const WitnessTextBlockComponentDefault = () => (
	<div
		className={css`
			margin: 15px;
			width: 620px;
		`}
	>
		<WitnessTextBlockComponent
			title="Back in the 1970&#39;s"
			description='You could dial first and then push in ur 2p. I never had any change and needed a lift. My parents knew the routine, I&#39;d dial and you could get a second or two to shout down the line "Pick me up" Ah how I miss the days of a simple life where no one knew where I was and I could get away with anything as long as I was in the door by 10pm! '
			authorName="Louise Griffiths"
			dateCreated="2016-01-29T22:19:51Z"
			pillar={Pillar.Sport}
		/>
	</div>
);
