import {
	makeRenderInnerComponentFunction,
	Hydrateable,
} from 'client/hydratables';
import { FC } from 'react';
import {
	NewsletterSignup as HydrateableNewsletterSignupInner,
	Props,
} from './inner';

const containerClassName = 'js-hydrateableNewsletterSignup-component-container';

const HydrateableNewsletterSignup: FC<Props> = (props) => {
	return (
		<div className={containerClassName} data-props={JSON.stringify(props)}>
			<HydrateableNewsletterSignupInner {...props} />
		</div>
	);
};

const newsletterSignHydrateable: Hydrateable = {
	containerClassName,
	renderInnerComponent: makeRenderInnerComponentFunction(
		HydrateableNewsletterSignupInner,
	),
	needsInlineStyles: true,
};

// ----- Exports ----- //

export default HydrateableNewsletterSignup;
export { newsletterSignHydrateable };
