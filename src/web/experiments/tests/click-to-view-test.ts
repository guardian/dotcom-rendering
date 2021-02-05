import { ABTest } from '@guardian/ab-core';

export const clickToViewTest: ABTest = {
	id: 'ClickToViewTest',
	start: '2021-02-02',
	expiry: '2020-03-02',
	author: 'Francis Rhys-Jones',
	description:
		'This test is to allow the journalists to see the impact of the roll out of the ClickToView component on the content they are publishing prior to going live.',
	audience: 0,
	audienceOffset: 0,
	successMeasure: 'The use of embedded content will go down.',
	audienceCriteria: 'Everyone',
	idealOutcome:
		'Journalists will adapt their use of embedded content to avoid using providers that track our users through their embeds.',
	showForSensitive: true,
	canRun: () => true,
	variants: [
		{
			id: 'control',
			test: (): void => {},
			impression: (impression) => {
				impression();
			},
			success: (success) => {
				success();
			},
		},
		{
			id: 'manual',
			test: (): void => {},
			impression: (impression) => {
				impression();
			},
			success: (success) => {
				success();
			},
		},
	],
};
