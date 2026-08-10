import { space } from '@guardian/source/foundations';
import { palette } from '../../palette';
import { ProgressNumber } from './ProgressNumber';
import { StackedProgress } from './StackedProgress';
import { Versus } from './Versus';

type Props = {
	/**
	 * The total number of seats up for election, excluding holdovers.
	 */
	total: number;
	democrats: {
		/**
		 * The number of races called for the Democrats so far.
		 */
		value: number;
		/**
		 * The net change in seats for the Democrats so far.
		 */
		change: number;
		/**
		 * The number of seats held by the Democrats that are not up for
		 * election this time.
		 */
		holdovers: number;
	};
	republicans: {
		/**
		 * The number of races called for the Republicans so far.
		 */
		value: number;
		/**
		 * The net change in seats for the Republicans so far.
		 */
		change: number;
		/**
		 * The number of seats held by the Republicans that are not up for
		 * election this time.
		 */
		holdovers: number;
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
				name: 'Democrats*',
				abbreviation: 'Democrats*',
				value: props.democrats.value + props.democrats.holdovers,
				change: props.democrats.change,
				image: undefined,
				colour: palette('--us-elections-democrats'),
			}}
			right={{
				name: 'Republicans',
				abbreviation: 'Republicans',
				value: props.republicans.value + props.republicans.holdovers,
				change: props.republicans.change,
				image: undefined,
				colour: palette('--us-elections-republicans'),
			}}
			colour="none"
			faded={false}
			banner={undefined}
		/>
		<StackedProgress
			total={props.total}
			label="50"
			calculateWinner={false}
			excludedCopy="No election"
			sections={[
				{
					name: 'Democrats',
					colour: palette('--us-elections-democrats-alt'),
					value: props.democrats.holdovers,
					align: 'left',
					exclude: true,
				},
				{
					name: 'Democrats',
					colour: palette('--us-elections-democrats'),
					value: props.democrats.value,
					align: 'left',
					exclude: false,
				},
				{
					name: 'Republicans',
					colour: palette('--us-elections-republicans-alt'),
					value: props.republicans.holdovers,
					align: 'right',
					exclude: true,
				},
				{
					name: 'Republicans',
					colour: palette('--us-elections-republicans'),
					value: props.republicans.value,
					align: 'right',
					exclude: false,
				},
			]}
			css={{
				paddingTop: space[2],
			}}
		/>
		<ProgressNumber
			progress={props.democrats.value + props.republicans.value}
			total={props.total}
			copy="races called"
			additionalCopy="*includes independents"
		/>
	</>
);
