import preview from '../../../.storybook/preview';
import { palette } from '../../palette';
import { UKLocal as ChangeBarsUKLocal } from './ChangeBars.stories';
import { ElectionTracker } from './ElectionTracker';
import {
	UKGeneral as StackedProgressUKGeneral,
	USPresidential as StackedProgressUSPresidential,
} from './StackedProgress.stories';
import { EUParliament as StackedProgressEUParliament } from './StackedProgress.stories';
import { EUParliament as ValuesWithChangeEUParliament } from './ValuesWithChange.stories';
import {
	UKExitPoll as VersusUKExitPoll,
	UKGeneral as VersusUKGeneral,
	USPresidential as VersusUSPresidential,
} from './Versus.stories';

const meta = preview.meta({
	title: 'Components/Election Trackers/Election Tracker',
	component: ElectionTracker,
});

export const USCongressEmpty = meta.story({
	args: {
		components: [
			{
				kind: 'sideBySide',
				from: 'tablet',
				left: {
					heading: 'Senate',
					children: [
						{
							kind: 'versus',
							props: {
								left: {
									name: 'Democrats',
									abbreviation: 'Democrats',
									value: 28,
									change: 0,
									colour: palette('--us-elections-democrats'),
									image: undefined,
								},
								right: {
									name: 'Republicans',
									abbreviation: 'Republicans',
									value: 38,
									change: 0,
									colour: palette(
										'--us-elections-republicans',
									),
									image: undefined,
								},
								colour: 'none',
								faded: false,
								banner: undefined,
							},
						},
						{
							kind: 'stackedProgress',
							props: {
								total: 34,
								label: '50',
								calculateWinner: false,
								excludedCopy: 'No election',
								sections: [
									{
										name: 'Democrats',
										colour: palette(
											'--us-elections-democrats-alt',
										),
										value: 28,
										align: 'left',
										exclude: true,
									},
									{
										name: 'Democrats',
										colour: palette(
											'--us-elections-democrats',
										),
										value: 0,
										align: 'left',
										exclude: false,
									},
									{
										name: 'Others',
										colour: palette(
											'--us-elections-others',
										),
										value: 0,
										align: 'left',
										exclude: true,
									},
									{
										name: 'Others',
										colour: palette(
											'--us-elections-others',
										),
										value: 0,
										align: 'left',
										exclude: false,
									},
									{
										name: 'Republicans',
										colour: palette(
											'--us-elections-republicans-alt',
										),
										value: 38,
										align: 'right',
										exclude: true,
									},
									{
										name: 'Republicans',
										colour: palette(
											'--us-elections-republicans',
										),
										value: 0,
										align: 'right',
										exclude: false,
									},
								],
							},
						},
						{
							kind: 'progressNumber',
							props: {
								additionalCopy: undefined,
								copy: 'races called',
								progress: 0,
								total: 34,
							},
						},
					],
				},
				right: {
					heading: 'House',
					children: [
						{
							kind: 'versus',
							props: {
								left: {
									name: 'Democrats',
									abbreviation: 'Democrats',
									value: 0,
									change: 0,
									colour: palette('--us-elections-democrats'),
									image: undefined,
								},
								right: {
									name: 'Republicans',
									abbreviation: 'Republicans',
									value: 0,
									change: 0,
									colour: palette(
										'--us-elections-republicans',
									),
									image: undefined,
								},
								colour: 'none',
								faded: false,
								banner: undefined,
							},
						},
						{
							kind: 'stackedProgress',
							props: {
								total: 435,
								label: 'to win',
								calculateWinner: true,
								excludedCopy: undefined,
								sections: [
									{
										name: 'Democrats',
										colour: palette(
											'--us-elections-democrats',
										),
										value: 0,
										align: 'left',
										exclude: false,
									},
									{
										name: 'Others',
										colour: palette(
											'--us-elections-others',
										),
										value: 0,
										align: 'left',
										exclude: false,
									},
									{
										name: 'Republicans',
										colour: palette(
											'--us-elections-republicans',
										),
										value: 0,
										align: 'right',
										exclude: false,
									},
								],
							},
						},
						{
							kind: 'progressNumber',
							props: {
								additionalCopy: undefined,
								copy: 'races called',
								progress: 0,
								total: 435,
							},
						},
					],
				},
			},
			{
				kind: 'onwardLink',
				props: {
					text: 'Full results',
					link: new URL('https://www.theguardian.com'),
				},
			},
		],
	},
});

export const UKGeneralFinal = meta.story({
	args: {
		components: [
			{
				kind: 'versus',
				props: VersusUKGeneral.composed.args,
			},
			{
				kind: 'stackedProgress',
				props: StackedProgressUKGeneral.composed.args,
			},
			{
				kind: 'progressNumber',
				props: {
					progress: 650,
					total: 650,
					copy: 'seats declared',
					additionalCopy: undefined,
				},
			},
			{
				kind: 'onwardLink',
				props: {
					text: 'See full results',
					link: new URL('https://www.theguardian.com'),
				},
			},
		],
	},
});

export const UKGeneralExitPoll = meta.story({
	args: {
		components: [
			{
				kind: 'versus',
				props: VersusUKExitPoll.composed.args,
			},
			{
				kind: 'onwardLink',
				props: {
					text: 'View results page',
					link: new URL('https://www.theguardian.com'),
				},
			},
		],
	},
});

export const UKLocal = meta.story({
	args: {
		components: [
			{
				kind: 'changeBars',
				props: ChangeBarsUKLocal.args,
			},
			{
				kind: 'progressNumber',
				props: {
					progress: 200,
					total: 200,
					copy: 'councils declared',
					additionalCopy: undefined,
				},
			},
			{
				kind: 'onwardLink',
				props: {
					text: 'See full results',
					link: new URL('https://www.theguardian.com'),
				},
			},
		],
	},
});

export const USPresidential = meta.story({
	args: {
		components: [
			{
				kind: 'progressNumber',
				props: {
					progress: 51,
					total: 51,
					copy: 'states called (includes DC)',
					additionalCopy: 'Latest results',
				},
			},
			{
				kind: 'versus',
				props: VersusUSPresidential.composed.args,
			},
			{
				kind: 'stackedProgress',
				props: StackedProgressUSPresidential.composed.args,
			},
			{
				kind: 'onwardLink',
				props: {
					text: 'Full US election results',
					link: new URL('https://www.theguardian.com'),
				},
			},
		],
	},
});

export const EUParliament = meta.story({
	args: {
		components: [
			{
				kind: 'stackedProgress',
				props: StackedProgressEUParliament.composed.args,
			},
			{
				kind: 'valuesWithChange',
				props: ValuesWithChangeEUParliament.args,
			},
			{
				kind: 'onwardLink',
				props: {
					text: 'See full results',
					link: new URL('https://www.theguardian.com'),
				},
			},
		],
	},
});
