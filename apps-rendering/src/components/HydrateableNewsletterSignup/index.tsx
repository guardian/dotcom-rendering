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

const getPropsFromContainer: {
	(container: Element): Props;
} = (container) => {
	const props = JSON.parse(
		container.getAttribute('data-props') || '',
	) as Props;

	return props;
};

const renderInnerComponent = (container: Element) => {
	return createElement(
		HydrateableNewsletterSignupInner,
		getPropsFromContainer(container),
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
