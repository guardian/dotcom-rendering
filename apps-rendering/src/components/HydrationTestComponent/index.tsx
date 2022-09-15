import { Hydrateable } from 'client/hydratables';
import { createElement, FC } from 'react';
import { HydrationTestComponentInner, Props } from './inner';

const containerClassName = 'js-test-component-container';

const HydrationTestComponent: FC<Props> = (props) => {
	return (
		<div
			className={containerClassName}
			data-props={JSON.stringify(props)}
		>
			<HydrationTestComponentInner {...props} />
		</div>
	);
};

const renderInnerComponent = (container: Element) => {
	const props = JSON.parse(
		container.getAttribute('data-props') || '{}',
	) as Props;

	return createElement(
		HydrationTestComponentInner,
		props,
	);
};

const testComponentnHydrateable: Hydrateable = {
	containerClassName,
	renderInnerComponent,
	needsInlineStyles: true,
}

// ----- Exports ----- //

export default HydrationTestComponent;
export { testComponentnHydrateable };
