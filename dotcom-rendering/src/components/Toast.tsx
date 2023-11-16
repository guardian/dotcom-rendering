import { css } from '@emotion/react';
import { space } from '@guardian/source-foundations';
import { Hide } from '@guardian/source-react-components';
import { EditorialButton } from '@guardian/source-react-components-development-kitchen';

type Props = {
	count: number;
	onClick: () => void;
	format: ArticleFormat;
};

/** This icon will be added to Source at a subsequent time */
const SvgReload = ({ size }: { size: 12 | 16 | 18 | 24 | 26 | 28 | 30 }) => {
	const tight = size <= 24;
	const padding = tight ? 0 : (size - 24) / 2;
	return (
		<svg
			viewBox={
				tight ? '0 0 24 24' : `-${padding} -${padding} ${size} ${size}`
			}
			width={size}
			height={size}
		>
			<path d="M11.588 1a10.928 10.928 0 0 0-9.046 4.786l.126.676.877.527.676-.176C5.85 4.508 8.506 2.98 11.588 2.98c4.936 0 8.995 4.059 8.995 9.045 0 4.961-4.059 8.995-8.995 8.995-2.832 0-5.262-1.252-6.94-3.257l3.632-.601v-1.253H1.866l-.476.476V23h1.227l.627-3.784C5.248 21.546 8.205 23 11.588 23c6.089 0 11.025-4.911 11.025-10.975A11.01 11.01 0 0 0 11.588 1Z" />
		</svg>
	);
};

/**
 * A button to scroll to the top when new content exists.
 *
 * This element is rendered using a Portal into the `toast-root` div. This
 * root div has position: sticky
 */
export const Toast = ({ count, onClick, format }: Props) => {
	return (
		<div
			css={css`
				position: absolute;
				top: ${space[2]}px;
			`}
			data-testid="toast"
		>
			<Hide above="phablet">
				<EditorialButton
					size="xsmall" // <-- Mobile version is xsmall
					onClick={onClick}
					format={format}
					icon={<SvgReload size={30} />}
				>{`${count} new update${
					count === 1 ? '' : 's'
				}`}</EditorialButton>
			</Hide>
			<Hide below="phablet">
				<EditorialButton
					size="small" // <-- Desktop version is small
					onClick={onClick}
					format={format}
					icon={<SvgReload size={30} />}
				>{`${count} new update${
					count === 1 ? '' : 's'
				}`}</EditorialButton>
			</Hide>
		</div>
	);
};
