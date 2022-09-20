import { createElement, FC, Fragment, VFC } from 'react';
import NewsletterSignupInner, { Props } from './inner';

const newsletterSignupContainerClassName = 'js-hydrateableNewsletterSignup-component-container';

const NewsletterSignup: FC<Props> = (props) => {
	return (
		<div className={newsletterSignupContainerClassName} data-props={JSON.stringify(props)}>
			<NewsletterSignupInner {...props} />
		</div>
	);
};

const makeRenderInnerComponentFunction = (
	innerComponent: VFC<any>,
): { (container: Element): React.ReactElement } => {
	return (container: Element) => {
		try {
			const props = JSON.parse(
				container.getAttribute('data-props') || '{}',
			) as any;
			return createElement(innerComponent, props);
		} catch (error) {
			return createElement(Fragment);
		}
	};
};


const renderNewsletterSignupInner = makeRenderInnerComponentFunction(
	NewsletterSignupInner,
)


// ----- Exports ----- //

export default NewsletterSignup;
export { newsletterSignupContainerClassName, renderNewsletterSignupInner };
