import { css } from '@emotion/react';
import { EditorialButton } from '@guardian/source-react-components-development-kitchen';
import { Hide, SvgArrowUpStraight } from '@guardian/source-react-components';
import { getZIndex } from '../lib/getZIndex';

type Props = {
	count: number;
	onClick: () => void;
	format: ArticleFormat;
};

/**
 * A button to scroll to the top when new content exists.
 */
export const Toast = ({ count, onClick, format }: Props) => {
	return (
		<div
			css={css`
				position: fixed;
				top: 20px;
				display: flex;
				${getZIndex('toast')};
				width: 100%;
				justify-content: center;
			`}
			data-cy="toast"
		>
			<Hide above="phablet">
				<EditorialButton
					size="xsmall" // <-- Mobile version is xsmall
					onClick={onClick}
					format={format}
					icon={<SvgArrowUpStraight />}
				>{`${count} new update${
					count === 1 ? '' : 's'
				}`}</EditorialButton>
			</Hide>
			<Hide below="phablet">
				<EditorialButton
					size="small" // <-- Desktop version is small
					onClick={onClick}
					format={format}
					icon={<SvgArrowUpStraight />}
				>{`${count} new update${
					count === 1 ? '' : 's'
				}`}</EditorialButton>
			</Hide>
		</div>
	);
};
