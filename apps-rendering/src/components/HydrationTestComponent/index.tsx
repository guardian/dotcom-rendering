import { css } from '@emotion/react';
import { InlineSuccess } from '@guardian/source-react-components';
import { FC, useState } from 'react';

type Props = {
	text: string;
};

const hydrationTestComponentClassName = 'js-test-component-container';

const HydrationTestComponent: FC<Props> = ({ text }) => {
	return (
		<div className={hydrationTestComponentClassName} prop-text={text}>
			<HydrationTestComponentInner text="into standard" />
		</div>
	);
};

const HydrationTestComponentInner: FC<Props> = ({ text }) => {
	const [clickCount, setClickCount] = useState(0);

	return (
		<div
			css={css`
				border: 3px dotted darkblue;
				padding: 10px;
			`}
		>
			<p>HYDRATION TEST: {clickCount} clicks</p>
			<InlineSuccess>The Component was rendererd</InlineSuccess>
			<span>{text}</span>
			<button
				onClick={() => {
					setClickCount(clickCount + 1);
				}}
			>
				increment
			</button>
			{clickCount > 0 && (
				<InlineSuccess>
					You clicked the button at least once
				</InlineSuccess>
			)}
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
