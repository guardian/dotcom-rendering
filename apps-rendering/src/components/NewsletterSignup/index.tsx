import {
	makeRenderInnerComponentFunction,
	Hydrateable,
} from 'client/hydratables';
import { FC } from 'react';
import NewsletterSignupInner, { Props } from './inner';

const newsletterSignupContainerClassName = 'js-hydrateableNewsletterSignup-component-container';

const NewsletterSignup: FC<Props> = (props) => {
	return (
		<div className={newsletterSignupContainerClassName} data-props={JSON.stringify(props)}>
			<NewsletterSignupInner {...props} />
		</div>
	);
};

const renderNewsletterSignupInner = makeRenderInnerComponentFunction(
	NewsletterSignupInner,
)

const newsletterSignHydrateable: Hydrateable = {
	containerClassName: newsletterSignupContainerClassName,
	needsInlineStyles: true,
};

// ----- Exports ----- //

export default NewsletterSignup;
export { newsletterSignHydrateable, newsletterSignupContainerClassName, renderNewsletterSignupInner };
