import { useEffect, useRef, useState } from 'react';
import { safeParse } from 'valibot';
import { submitComponentEvent } from '../client/ophan/ophan';
import { safeParseURL } from '../lib/parse';
import { fromValibot } from '../lib/result';
import { useIsInView } from '../lib/useIsInView';
import { useConfig } from './ConfigContext';
import {
	ElectionComponents,
	type ElectionComponentsJson,
} from './ElectionTrackers/electionComponent';
import { ElectionTracker } from './ElectionTrackers/ElectionTracker';

type Props = {
	electionDataUrl: string;
	electionComponents: ElectionComponentsJson;
	/**
	 * Whether to use live side-effects, in this case the Fetch API, to retrieve
	 * new data, or just keep reusing the initial data. The latter can be used
	 * in tests and storybook.
	 */
	liveEffects: boolean;
};

/**
 * Wires up side-effects for the {@linkcode ElectionTrackerComponent}. In this
 * case, the Fetch API.
 */
export const ElectionTrackerWrapper = (props: Props) => {
	const [eventGraphic, setEventGraphic] = useState<HTMLElement | null>(null);
	const hasTrackedView = useRef(false);
	const [isInView] = useIsInView({
		threshold: 0.1,
		repeat: true,
		node: eventGraphic ?? undefined,
	});
	const { renderingTarget } = useConfig();

	const url = safeParseURL(props.electionDataUrl);

	useEffect(() => {
		setEventGraphic(
			document.querySelector<HTMLElement>(
				'[data-gu-marker=election-tracker]',
			),
		);
	}, []);

	useEffect(() => {
		if (!eventGraphic || isInView !== true || hasTrackedView.current) {
			return;
		}

		hasTrackedView.current = true;
		void submitComponentEvent(
			{
				component: {
					componentType: 'EVENT_GRAPHIC',
					id: eventGraphic.id,
					labels: ['liveblog'],
				},
				action: 'VIEW',
			},
			renderingTarget,
		);
	}, [eventGraphic, isInView, renderingTarget]);

	useEffect(() => {
		if (!eventGraphic) {
			return;
		}

		const handleClick = (event: MouseEvent) => {
			if (
				!(event.target instanceof Element) ||
				!event.target.closest('[election-tracker-link]')
			) {
				return;
			}

			void submitComponentEvent(
				{
					component: {
						componentType: 'EVENT_GRAPHIC',
						id: eventGraphic.id,
						labels: ['liveblog'],
					},
					action: 'CLICK',
				},
				renderingTarget,
			);
		};

		eventGraphic.addEventListener('click', handleClick);

		return () => eventGraphic.removeEventListener('click', handleClick);
	}, [eventGraphic, renderingTarget]);

	if (!url.ok) {
		return null;
	}

	const parsedData = fromValibot(
		safeParse(ElectionComponents, props.electionComponents),
	);

	return (
		<ElectionTracker
			electionDataUrl={url.value}
			initialData={parsedData.ok ? parsedData.value.components : []}
			refreshInterval={60}
			getElectionData={
				props.liveEffects
					? getElectionData
					: () => Promise.resolve(props.electionComponents)
			}
		/>
	);
};

const getElectionData = (url: string): Promise<unknown> =>
	fetch(url).then((res) => res.json());
