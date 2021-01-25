import React from 'react';
import { css } from 'emotion';

import { Pillar } from '@guardian/types';

import { WitnessVideoBlockComponent } from './WitnessVideoBlockComponent';

export default {
	component: WitnessVideoBlockComponent,
	title: 'Components/WitnessVideoBlockComponent',
};

export const WitnessVideoBlockComponentDefault = () => (
	<div
		className={css`
			margin: 15px;
			width: 620px;
		`}
	>
		<WitnessVideoBlockComponent
			title="Warhammer Quest Timelapse"
			description="Tell me if you&#39;ve heard this one before: A Dwarf, a thief, a fighter and a priest walk into a dungeon ... Warhammer Quest is the quintessential &#39;Old School&#39; dungeon-crawler."
			authorName="Gregg Lewis-Qualls"
			youtubeHtml='<iframe width="440" height="330" src="https://www.youtube.com/embed/XRq83txBgxw?wmode=opaque&feature=oembed" frameborder="0" allowfullscreen></iframe>'
			dateCreated="2015-08-27T13:32:32Z"
			pillar={Pillar.Sport}
		/>
	</div>
);
