import { FC } from 'react';
import { HydrateableNewsletterSignupInner, Props } from './inner';

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

const getPropsForHydrateableNewsletterSignup: {
	(container: Element): Props;
} = (container) => {
	const props = JSON.parse(
		container.getAttribute('data-props') || '',
	) as Props;

	return props;
};

// ----- Exports ----- //

export default HydrateableNewsletterSignup;
export {
	hydrateableNewsletterSignupClassName,
	HydrateableNewsletterSignupInner,
	getPropsForHydrateableNewsletterSignup,
};
