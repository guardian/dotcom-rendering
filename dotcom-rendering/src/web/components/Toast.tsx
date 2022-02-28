import { css } from '@emotion/react';
import { EditorialButton } from '@guardian/source-react-components-development-kitchen';
import { Hide, SvgArrowUpStraight } from '@guardian/source-react-components';
import { between, space } from '@guardian/source-foundations';
import { getZIndex } from '../lib/getZIndex';

type Props = {
	count: number;
	onClick: () => void;
	format: ArticleFormat;
	stuck: boolean;
};

/**
 * A button to scroll to the top when new content exists.
 */
export const Toast = ({ count, onClick, format, stuck }: Props) => {
	return (
		<div
			css={css`
				position: ${stuck ? 'fixed' : 'absolute'};
				top: ${space[2]}px;
				max-width: 700px;
				${between.phablet.and.desktop} {
					top: 2px;
					max-width: 738px;
				}
				width: 100%;
				text-align: center;
				${getZIndex('toast')};
			`}
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
