import { from, space } from '@guardian/source/foundations';
import type { Graphic } from './DecideContainer';
import { ElectionTrackerWrapper } from './ElectionTrackerWrapper.island';
import { Island } from './Island';

export type EventGraphicProps = {
	graphic: Graphic | undefined;
};

export const EventGraphic = (props: EventGraphicProps) => {
	if (props.graphic === undefined) {
		return null;
	}

	switch (props.graphic.kind) {
		case 'electionTracker':
			return (
				<article
					css={{
						paddingBottom: space[4],
						[from.tablet]: {
							paddingLeft: 10,
							paddingRight: 10,
						},
					}}
				>
					<Island priority="feature" defer={{ until: 'visible' }}>
						<ElectionTrackerWrapper
							electionDataUrl={props.graphic.electionDataUrl.href}
							electionComponents={
								props.graphic.electionComponents
							}
							liveEffects={props.graphic.liveEffects}
						/>
					</Island>
				</article>
			);
	}
};
