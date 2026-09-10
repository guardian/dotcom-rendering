import { log } from '@guardian/libs';
import useSWR from 'swr';
import { safeParse, summarize } from 'valibot';
import { fromValibot } from '../../lib/result';
import { ChangeBars } from './ChangeBars';
import {
	type ElectionComponent,
	ElectionComponents,
} from './electionComponent';
import { OnwardLink } from './OnwardLink';
import { ProgressNumber } from './ProgressNumber';
import { Refresh } from './Refresh';
import { SideBySide } from './SideBySide';
import { StackedProgress } from './StackedProgress';
import { useCountdown } from './useCountdown';
import { ValuesWithChange } from './ValuesWithChange';
import { Versus } from './Versus';

type Props = {
	/**
	 * The URL from which to retrieve the election data via
	 * {@linkcode Props.getElectionData|getElectionData}.
	 */
	electionDataUrl: URL;
	/**
	 * A potentially side-effectful function used to retrieve election data from
	 * the given URL. The result is a JS object of unknown shape.
	 */
	getElectionData: (url: string) => Promise<unknown>;
	/**
	 * The initial election data, available on the server before client-side
	 * polling begins.
	 */
	initialData: ElectionComponent[];
	/**
	 * How often to update the data, in seconds.
	 */
	refreshInterval: number;
};

export const ElectionTracker = (props: Props) => {
	const [remaining, reset] = useCountdown(props.refreshInterval);
	const { data, error } = useSWR<ElectionComponent[], Error>(
		props.electionDataUrl.toString(),
		fetcher(props.getElectionData),
		{
			errorRetryCount: 1,
			refreshInterval: props.refreshInterval * 1_000,
			fallbackData: props.initialData,
			onSuccess: reset,
		},
	);

	const components =
		error !== undefined || data === undefined ? props.initialData : data;

	return (
		<>
			<Refresh remaining={remaining} />
			<Components components={components} />
		</>
	);
};

const fetcher = (getElectionData: Props['getElectionData']) => (url: string) =>
	getElectionData(url)
		.then(parseElectionData)
		.then((result) => {
			if (!result.ok) {
				log('dotcom', result.error);
				throw new Error(summarize(result.error));
			} else {
				return result.value;
			}
		})
		.catch(() => {
			log('dotcom', 'Failed to fetch election data json');
			throw new Error();
		});

const parseElectionData = (data: unknown) =>
	fromValibot(safeParse(ElectionComponents, data)).map(
		(value) => value.components,
	);

const Components = ({ components }: { components: ElectionComponent[] }) => (
	<>
		{components.map((component) => (
			<Component key={component.kind} component={component} />
		))}
	</>
);

const Component = ({ component }: { component: ElectionComponent }) => {
	switch (component.kind) {
		case 'sideBySide':
			return (
				<SideBySide
					from="tablet"
					left={{
						heading: component.left.heading,
						children: (
							<Components components={component.left.children} />
						),
					}}
					right={{
						heading: component.right.heading,
						children: (
							<Components components={component.right.children} />
						),
					}}
				/>
			);
		case 'changeBars':
			return <ChangeBars changes={component.props.changes} />;
		case 'onwardLink':
			return (
				<OnwardLink
					link={component.props.link}
					text={component.props.text}
				/>
			);
		case 'progressNumber':
			return (
				<ProgressNumber
					copy={component.props.copy}
					additionalCopy={component.props.additionalCopy}
					progress={component.props.progress}
					total={component.props.total}
				/>
			);
		case 'stackedProgress':
			return (
				<StackedProgress
					calculateWinner={component.props.calculateWinner}
					excludedCopy={component.props.excludedCopy}
					label={component.props.label}
					total={component.props.total}
					sections={component.props.sections}
				/>
			);
		case 'valuesWithChange':
			return (
				<ValuesWithChange
					changeDescription={component.props.changeDescription}
					valueDescription={component.props.valueDescription}
					values={component.props.values}
				/>
			);
		case 'versus':
			return (
				<Versus
					banner={component.props.banner}
					colour={component.props.colour}
					faded={component.props.faded}
					left={component.props.left}
					right={component.props.right}
				/>
			);
	}
};
