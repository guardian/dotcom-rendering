import { from, space } from '@guardian/source/foundations';
import * as v from 'valibot';
import { ElectionComponents } from './ElectionTrackers/electionComponent';
import { ElectionTrackerWrapper } from './ElectionTrackerWrapper.island';
import { Island } from './Island';

export const ElectionComponentsJsonSchema = v.custom<
	v.InferInput<typeof ElectionComponents>
>((input) => v.is(ElectionComponents, input));

export const GraphicSchema = v.object({
	kind: v.literal('electionTracker'),
	electionDataUrl: v.pipe(
		v.string(),
		v.url(),
		v.transform((url) => new URL(url)),
	),
	electionComponents: ElectionComponentsJsonSchema,
	liveEffects: v.boolean(),
});

export type Graphic = v.InferOutput<typeof GraphicSchema>;

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
