import {
	makeRenderInnerComponentFunction,
	Hydrateable,
} from 'client/hydratables';
import { FC } from 'react';
import { NewsletterSignup, Props } from './inner';

const containerClassName = 'js-hydrateableNewsletterSignup-component-container';

const HydrateableNewsletterSignup: FC<Props> = (props) => {
	return (
		<div className={containerClassName} data-props={JSON.stringify(props)}>
			<NewsletterSignup {...props} />
		</div>
	);
};

const newsletterSignHydrateable: Hydrateable = {
	containerClassName,
	renderInnerComponent: makeRenderInnerComponentFunction(NewsletterSignup),
	needsInlineStyles: true,
};

// ----- Exports ----- //

export default HydrateableNewsletterSignup;
export { newsletterSignHydrateable };
