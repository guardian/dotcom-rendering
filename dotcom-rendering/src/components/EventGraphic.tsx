import { from, space } from '@guardian/source/foundations';
import { Graphic } from './DecideContainer';
import { Island } from './Island';
import { ElectionTracker } from './ElectionTracker.island';

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
						<ElectionTracker
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
