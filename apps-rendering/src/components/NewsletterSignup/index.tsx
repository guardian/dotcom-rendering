import {
	makeRenderInnerComponentFunction,
	Hydrateable,
} from 'client/hydratables';
import { FC } from 'react';
import NewsletterSignupInner, { Props } from './inner';

const containerClassName = 'js-hydrateableNewsletterSignup-component-container';

const NewsletterSignup: FC<Props> = (props) => {
	return (
		<div className={containerClassName} data-props={JSON.stringify(props)}>
			<NewsletterSignupInner {...props} />
		</div>
	);
};

const newsletterSignHydrateable: Hydrateable = {
	containerClassName,
	renderInnerComponent: makeRenderInnerComponentFunction(
		NewsletterSignupInner,
	),
	needsInlineStyles: true,
};

// ----- Exports ----- //

export default NewsletterSignup;
export { newsletterSignHydrateable };
