import { space } from '@guardian/source/foundations';
import { palette } from '../../palette';
import { ProgressNumber } from './ProgressNumber';
import { StackedProgress } from './StackedProgress';
import { Versus } from './Versus';

type Props = {
	/**
	 * The total number of seats up for election.
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
	};
};

/**
 * Represents results from elections to the US House of Representatives. It can
 * be used on its own, or as part of the `USCongress` component, which also
 * includes the Senate.
 */
export const USHouse = (props: Props) => (
	<>
		<Versus
			left={{
				name: 'Democrats',
				abbreviation: 'Democrats',
				value: props.democrats.value,
				change: props.democrats.change,
				image: undefined,
				colour: palette('--us-elections-democrats'),
			}}
			right={{
				name: 'Republicans',
				abbreviation: 'Republicans',
				value: props.republicans.value,
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
			label="to win"
			calculateWinner={true}
			excludedCopy={undefined}
			sections={[
				{
					name: 'Democrats',
					colour: palette('--us-elections-democrats'),
					value: props.democrats.value,
					align: 'left',
					exclude: false,
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
			additionalCopy={undefined}
		/>
	</>
);
