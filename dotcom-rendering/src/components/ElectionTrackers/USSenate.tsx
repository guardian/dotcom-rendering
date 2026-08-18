import { space } from '@guardian/source/foundations';
import { palette } from '../../palette';
import { ProgressNumber } from './ProgressNumber';
import { StackedProgress } from './StackedProgress';
import { Versus } from './Versus';

type Props = {
	versus: {
		democrats: {
			includesIndependents: boolean;
			value: number;
			change: number;
		};
		republicans: {
			includesIndependents: boolean;
			value: number;
			change: number;
		};
	};
	stackedProgress: {
		total: number;
		democratHoldovers: number;
		democratValue: number;
		othersHoldovers: number;
		othersValue: number;
		republicanHoldovers: number;
		republicanValue: number;
	};
	progressNumber: {
		progress: number;
		total: number;
		includesIndependents: boolean;
	};
};

/**
 * Represents results from elections to the US Senate. It can be used on its
 * own, or as part of the `USCongress` component, which also includes the House.
 */
export const USSenate = (props: Props) => (
	<>
		<Versus
			left={{
				name: `Democrats${props.versus.democrats.includesIndependents ? '*' : ''}`,
				abbreviation: `Democrats${props.versus.democrats.includesIndependents ? '*' : ''}`,
				value: props.versus.democrats.value,
				change: props.versus.democrats.change,
				image: undefined,
				colour: palette('--us-elections-democrats'),
			}}
			right={{
				name: `Republicans${props.versus.republicans.includesIndependents ? '*' : ''}`,
				abbreviation: `Republicans${props.versus.republicans.includesIndependents ? '*' : ''}`,
				value: props.versus.republicans.value,
				change: props.versus.republicans.change,
				image: undefined,
				colour: palette('--us-elections-republicans'),
			}}
			colour="none"
			faded={false}
			banner={undefined}
		/>
		<StackedProgress
			total={props.stackedProgress.total}
			label="50"
			calculateWinner={false}
			excludedCopy="No election"
			sections={[
				{
					name: 'Democrats',
					colour: palette('--us-elections-democrats-alt'),
					value: props.stackedProgress.democratHoldovers,
					align: 'left',
					exclude: true,
				},
				{
					name: 'Democrats',
					colour: palette('--us-elections-democrats'),
					value: props.stackedProgress.democratValue,
					align: 'left',
					exclude: false,
				},
				{
					name: 'Others',
					colour: palette('--us-elections-others'),
					value: props.stackedProgress.othersHoldovers,
					align: 'left',
					exclude: true,
				},
				{
					name: 'Others',
					colour: palette('--us-elections-others'),
					value: props.stackedProgress.othersValue,
					align: 'left',
					exclude: false,
				},
				{
					name: 'Republicans',
					colour: palette('--us-elections-republicans-alt'),
					value: props.stackedProgress.republicanHoldovers,
					align: 'right',
					exclude: true,
				},
				{
					name: 'Republicans',
					colour: palette('--us-elections-republicans'),
					value: props.stackedProgress.republicanValue,
					align: 'right',
					exclude: false,
				},
			]}
			css={{
				paddingTop: space[2],
			}}
		/>
		<ProgressNumber
			progress={props.progressNumber.progress}
			total={props.progressNumber.total}
			copy="races called"
			additionalCopy={
				props.progressNumber.includesIndependents
					? '*includes independents'
					: undefined
			}
		/>
	</>
);
