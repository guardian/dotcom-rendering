import { Hydrateable } from 'client/hydratables';
import { FC, createElement } from 'react';
import {
	NewsletterSignup as HydrateableNewsletterSignupInner,
	Props,
} from './inner';

const containerClassName =
	'js-hydrateableNewsletterSignup-component-container';

const HydrateableNewsletterSignup: FC<Props> = (props) => {
	return (
		<div
			className={containerClassName}
			data-props={JSON.stringify(props)}
		>
			<HydrateableNewsletterSignupInner {...props} />
		</div>
	);
};

const renderInnerComponent = (container: Element) => {
	const props = JSON.parse(
		container.getAttribute('data-props') || '{}',
	) as Props;

	return createElement(
		HydrateableNewsletterSignupInner,
		props,
	);
};

const newsletterSignHydrateable: Hydrateable = {
	containerClassName,
	renderInnerComponent,
	needsInlineStyles: true,
};

// ----- Exports ----- //

export default HydrateableNewsletterSignup;
export { newsletterSignHydrateable };
