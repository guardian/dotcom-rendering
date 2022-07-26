import { css } from '@emotion/react';
import { iconSize, visuallyHidden } from '@guardian/source-foundations';
import type { IconSize } from '@guardian/source-react-components';

// This component is adapted from a one being release on a new version of source:
// https://github.com/guardian/source/pull/1485
// It should be deleted and replace with the import from @guardian/source-react-components
// when this project is updated to use @guardian/eslint-plugin-source-react-components 6.0.0

interface Props {
	size?: IconSize;
	isAnnouncedByScreenReader?: boolean;
}

const Svg = ({ size }: { size?: IconSize }) => (
	<svg
		width={size ? iconSize[size] : undefined}
		height={undefined}
		viewBox="-3 -3 30 30"
		xmlns="http://www.w3.org/2000/svg"
		focusable={false}
		aria-hidden={true}
	>
		<path
			fillRule="evenodd"
			clipRule="evenodd"
			d="M18.364 2H5.636v5.68H3.43L2 9.29l9.048 7.504h1.904L22 9.289 20.571 7.68h-2.207V2Zm-1.819 5.68v-.946h-9.09v.946h9.09Zm0-3.787h-9.09v.947h9.09v-.947ZM2 20.58v-8.994l9.048 6.627h1.904L22 11.586v8.994L20.571 22H3.43L2 20.58ZM7.455 9.574h9.09v.947h-9.09v-.947Z"
		></path>
	</svg>
);

export const SvgNewsletter = ({
	size,
	isAnnouncedByScreenReader = false,
}: Props) => (
	<>
		<Svg size={size} />
		{isAnnouncedByScreenReader && (
			<span
				css={css`
					${visuallyHidden}
				`}
			>
				undefined
			</span>
		)}
	</>
);
