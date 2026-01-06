import { isUndefined } from '@guardian/libs';
import type { ReporterCalloutBlockElement } from '../types/content';
import { Body } from './ExpandableAtom/Body';
import { Container } from './ExpandableAtom/Container';

/**
 * A callout to readers to share tips with reporters
 *
 * ## TODO: check if this needs to be an island - possibly not as there's no user interaction beyond expanding the box
 *
 */

export const ReporterCalloutBlockComponent = ({
	callout,
}: {
	callout: ReporterCalloutBlockElement;
}) => {
	const {
		id,
		title,
		description,
		activeUntil,
		// contacts, TODO: Render contacts
	} = callout;
	const isExpired = isUndefined(activeUntil)
		? false
		: Math.floor(new Date().getTime() / 1000) > activeUntil;

	return isExpired ? (
		<></>
	) : (
		<div data-gu-name="callout">
			<Container
				id={id}
				title={title}
				atomType="guide"
				atomTypeTitle="Get in touch"
				expandCallback={() => {
					// do nothing - I don't think we want to track interactions with this component in ophan
				}}
			>
				<Body
					html={description}
					image={
						'https://i.guim.co.uk/img/media/ae475ccca7c94a4565f6b500a485479f08098383/788_0_4000_4000/4000.jpg?width=620&quality=85&auto=format&fit=max&s=45fd162100b331bf1618e364c5c69452'
					}
					credit={'Illustration: Guardian Design / Rich Cousins'}
				/>
			</Container>
		</div>
	);
};
