import { FC, createElement } from 'react';
import {
	NewsletterSignup as HydrateableNewsletterSignupInner,
	Props,
} from './inner';

const hydrateableNewsletterSignupClassName =
	'js-hydrateableNewsletterSignup-component-container';

const HydrateableNewsletterSignup: FC<Props> = (props) => {
	return (
		<div
			className={hydrateableNewsletterSignupClassName}
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

const renderHydratedNewsletterInner = (container: Element) => {
	return createElement(
		HydrateableNewsletterSignupInner,
		getPropsFromContainer(container),
	);
};

// ----- Exports ----- //

export default HydrateableNewsletterSignup;
export { hydrateableNewsletterSignupClassName, renderHydratedNewsletterInner };
