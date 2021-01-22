import React from 'react';
import { css } from 'emotion';

import { Pillar } from '@guardian/types';

import { WitnessVideoBlockComponent } from './WitnessVideoBlockComponent';

export default {
	component: WitnessVideoBlockComponent,
	title: 'Components/WitnessVideoBlockComponent',
};

const witnessTypeData: WitnessTypeDataVideo = {
	authorGuardianProfileUrl:
		'https://profile.theguardian.com/user/id/15282285',
	_type: 'model.dotcomrendering.pageElements.WitnessTypeDataVideo',
	description:
		'Tell me if you&#39;ve heard this one before: A Dwarf, a thief, a fighter and a priest walk into a dungeon ... Warhammer Quest is the quintessential &#39;Old School&#39; dungeon-crawler.',
	authorUsername: 'Gregg Lewis-Qualls',
	originalUrl:
		'https://witness.theguardian.com/assignment/55db3248e4b0959e5f8de003/1683313',
	source: 'Guardian Witness',
	youtubeHtml: '',
	type: 'video',
	title: 'Warhammer Quest Timelapse',
	url:
		'https://witness.theguardian.com/assignment/55db3248e4b0959e5f8de003/1683313',
	dateCreated: '2015-08-27T13:32:32Z',
	apiUrl: 'https://n0ticeapis.com/2/report/1683313',
	youtubeDescription:
		"Tell me if you've heard this one before: A Dwarf, a thief, a fighter and a priest walk into a dungeon ... Warhammer Quest is the quintessential 'Old School' dungeon-crawler. By Gregg Lewis-Qualls Board games! Are you a recent convert, or have you been playing them for many a moon?",
	authorName: 'Gregg Lewis-Qualls',
	youtubeUrl: 'http://www.youtube.com/watch?v=XRq83txBgxw',
	width: 440,
	youtubeSource: 'YouTube',
	youtubeAuthorName: 'guardianwitness',
	witnessEmbedType: 'video',
	html: '',
	authorWitnessProfileUrl:
		'https://witness.theguardian.com/user/Gregg Lewis-Qualls',
	height: 330,
	youtubeTitle: 'Warhammer Quest Timelapse',
};

export const WitnessVideoBlockComponentDefault = () => (
	<div
		className={css`
			margin: 15px;
			width: 620px;
		`}
	>
		<WitnessVideoBlockComponent
			title={witnessTypeData.title}
			description={witnessTypeData.description}
			authorName={witnessTypeData.authorName}
			width={witnessTypeData.width}
			height={witnessTypeData.height}
			youtubeUrl={witnessTypeData.youtubeUrl}
			dateCreated={witnessTypeData.dateCreated}
			pillar={Pillar.Sport}
		/>
	</div>
);
