import { css } from '@emotion/react';
import { space, textSans } from '@guardian/source-foundations';
import { Button, SvgCross } from '@guardian/source-react-components';
import type { Palette } from '../../types/palette';
import { decidePalette } from '../lib/decidePalette';

interface LabelProps {
	value: string;
	count?: number;
}

interface ButtonProps {
	value: string;
	type?: TopicType;
	count?: number;
	format: ArticleFormat;
	isActive: boolean;
	onClick: (...args: unknown[]) => void;
}

const buttonStyles = (palette: Palette) => css`
	${textSans.small()};
	height: 24px;
	min-height: 24px;
	padding: 2px 12px 4px;
	font-weight: 700;
	border: 1px solid ${palette.border.filterButton};
	color: ${palette.text.filterButton};
	background-color: ${palette.background.filterButton};

	&:hover {
		color: ${palette.text.filterButtonHover};
		background-color: ${palette.background.filterButtonHover};
		border: 1px solid ${palette.background.filterButtonHover};
	}

	svg {
		height: 16px;
		width: 16px;
		margin-top: 2px;
		margin-left: -8px;
	}

	/* This hides the Source spacedFocusHalo so we only see the DCR halo.
	*  Without the !important we see both styles simultaneously.
	*/
	&:focus {
		/* stylelint-disable-next-line declaration-no-important */
		outline: none !important;
	}
`;

const activeStyles = (palette: Palette) => css`
	color: ${palette.text.filterButtonActive};
	background-color: ${palette.background.filterButtonActive};
	border: 1px solid ${palette.background.filterButtonActive};
`;

const countStyles = css`
	font-weight: 400;
	padding-left: ${space[1]}px;
`;

const valueStyles = css`
	overflow: hidden;
	white-space: nowrap;
	text-overflow: ellipsis;
	max-width: 150px;
`;

const Label = ({ value, count }: LabelProps) => (
	<>
		<span css={valueStyles}>{value}</span>{' '}
		{!!count && <span css={countStyles}>({count})</span>}
	</>
);

/**
 * # Filter Button
 *
 * A child of `TopicFilterBank`
 *
 * ## Why does this need to be an Island?
 *
 * ⚠️ It does not need to be! ⚠️
 *
 * (It is embedded within `TopicFilterBank`)
 *
 * ---
 *
 * [`FilterButton` on Chromatic](https://www.chromatic.com/component?appId=63e251470cfbe61776b0ef19&csfId=components-filterbutton)
 */
export const FilterButton = ({
	type,
	value,
	count,
	isActive,
	format,
	onClick,
}: ButtonProps) => {
	const palette = decidePalette(format);

	const dataLinkName = type ? `${type}:${value}` : value;

	return isActive ? (
		<Button
			cssOverrides={[buttonStyles(palette), activeStyles(palette)]}
			onClick={onClick}
			icon={<SvgCross />}
			iconSide="right"
			aria-label={`Deactivate ${value} filter`}
			data-link-name={`${dataLinkName} | filter off`}
		>
			<Label value={value} count={count} />
		</Button>
	) : (
		<Button
			cssOverrides={buttonStyles(palette)}
			onClick={onClick}
			aria-label={`Activate ${value} filter`}
			data-link-name={`${dataLinkName} | filter on`}
		>
			<Label value={value} count={count} />
		</Button>
	);
};
