import { FC } from 'react';
import { HydrationTestComponentInner, Props } from './inner';


const hydrationTestComponentClassName = 'js-test-component-container';

const HydrationTestComponent: FC<Props> = ({ text }) => {
	return (
		<div className={hydrationTestComponentClassName} prop-text={text}>
			<HydrationTestComponentInner text={text} />
		</div>
	);
};


const getPropsForHydrationTestComponent: { (container: Element): Props } = (
	container,
) => {
	const props = {
		text: container.getAttribute('prop-text') || '',
	};
	return props;
};


// ----- Exports ----- //

export default HydrationTestComponent
export {
	hydrationTestComponentClassName,
	HydrationTestComponentInner,
	getPropsForHydrationTestComponent,
};
