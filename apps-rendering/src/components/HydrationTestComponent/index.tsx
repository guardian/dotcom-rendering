import { createElement, FC } from 'react';
import { HydrationTestComponentInner, Props } from './inner';

const hydrationTestComponentClassName = 'js-test-component-container';

const HydrationTestComponent: FC<Props> = (props) => {
	return (
		<div
			className={hydrationTestComponentClassName}
			data-props={JSON.stringify(props)}
		>
			<HydrationTestComponentInner {...props} />
		</div>
	);
};

const getPropsFromContainer: { (container: Element): Props } = (container) => {
	const props = JSON.parse(
		container.getAttribute('data-props') || '',
	) as Props;

	return props;
};

const renderHydratedTestComponentInner = (container: Element) => {
	return createElement(
		HydrationTestComponentInner,
		getPropsFromContainer(container),
	);
};

// ----- Exports ----- //

export default HydrationTestComponent;
export { hydrationTestComponentClassName, renderHydratedTestComponentInner };
