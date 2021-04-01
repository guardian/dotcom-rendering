import { Design, Display, Pillar, Special } from '@guardian/types';
import React from 'react';
import { decidePalette } from '../lib/decidePalette';

import { GuardianLines } from './GuardianLines';

export default {
	component: GuardianLines,
	title: 'Components/GuardianLines',
};

export const Defaults = () => {
	return (
		<GuardianLines
			palette={decidePalette({
				display: Display.Standard,
				design: Design.Article,
				theme: Pillar.News,
			})}
		/>
	);
};
Defaults.story = { name: 'Defaults' };

export const Squiggly = () => {
	return (
		<GuardianLines
			palette={decidePalette({
				display: Display.Standard,
				design: Design.Feature,
				theme: Pillar.Culture,
			})}
			effect="squiggly"
		/>
	);
};
Squiggly.story = { name: 'Squiggly' };

export const Dotted = () => {
	return (
		<GuardianLines
			palette={decidePalette({
				display: Display.Standard,
				design: Design.Article,
				theme: Pillar.Sport,
			})}
			effect="dotted"
		/>
	);
};
Dotted.story = { name: 'Dotted' };

export const Labs = () => {
	return (
		<GuardianLines
			palette={decidePalette({
				display: Display.Standard,
				design: Design.Article,
				theme: Special.Labs,
			})}
		/>
	);
};
Labs.story = { name: 'Labs' };

export const SpecialReport = () => {
	return (
		<GuardianLines
			palette={decidePalette({
				display: Display.Standard,
				design: Design.Article,
				theme: Special.SpecialReport,
			})}
		/>
	);
};
SpecialReport.story = { name: 'SpecialReport' };

export const Eight = () => {
	return (
		<GuardianLines
			palette={decidePalette({
				display: Display.Standard,
				design: Design.Comment,
				theme: Pillar.Opinion,
			})}
			count={8}
		/>
	);
};
Eight.story = { name: 'Eight' };
