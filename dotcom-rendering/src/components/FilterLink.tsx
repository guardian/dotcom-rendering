import { css } from '@emotion/react';
import { space, textSans15 } from '@guardian/source/foundations';
import { LinkButton, SvgCross } from '@guardian/source/react-components';
import { decidePalette } from '../lib/decidePalette';
import type { Palette } from '../types/palette';

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
	href: string;
}

const buttonStyles = (palette: Palette) => css`
	${textSans15};
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

const Label = ({ value, count = 0 }: LabelProps) => (
	<>
		<span css={valueStyles}>{value}</span>{' '}
		{count !== 0 && <span css={countStyles}>({count})</span>}
	</>
);

/**
 * # Filter Link
 *
 * A child of `TopicFilterBank`
 *
 * ---
 *
 * [`FilterButton` on Chromatic](https://www.chromatic.com/component?appId=63e251470cfbe61776b0ef19&csfId=components-filterbutton)
 */
export const FilterLink = ({
	type,
	value,
	count,
	isActive,
	format,
	href,
}: ButtonProps) => {
	const palette = decidePalette(format);

	const dataLinkName = type ? `${type}:${value}` : value;

	return isActive ? (
		<LinkButton
			cssOverrides={[buttonStyles(palette), activeStyles(palette)]}
			href={href}
			icon={<SvgCross />}
			iconSide="right"
			aria-label={`Deactivate ${value} filter`}
			data-link-name={`${dataLinkName} | filter off`}
			data-ignore="global-link-styling"
		>
			<Label value={value} count={count} />
		</LinkButton>
	) : (
		<LinkButton
			cssOverrides={buttonStyles(palette)}
			href={href}
			aria-label={`Activate ${value} filter`}
			data-link-name={`${dataLinkName} | filter on`}
			data-ignore="global-link-styling"
		>
			<Label value={value} count={count} />
		</LinkButton>
	);
};
