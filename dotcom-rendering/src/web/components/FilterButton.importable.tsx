import { css } from '@emotion/react';
import { space, textSans } from '@guardian/source-foundations';
import { Button, SvgCross } from '@guardian/source-react-components';
import { decidePalette } from '../lib/decidePalette';

interface LabelProps {
	text: string;
	count?: number;
}

interface ButtonProps {
	text: string;
	count?: number;
	format: ArticleFormat;
	isActive: boolean;
	onClick: () => void;
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

const Label = ({ text, count }: LabelProps) => (
	<>
		<span css={valueStyles}>{text}</span>{' '}
		{count && <span css={countStyles}>({count})</span>}
	</>
);

export const FilterButton = ({
	text,
	count,
	isActive,
	format,
	onClick,
}: ButtonProps) => {
	const palette = decidePalette(format);

	return isActive ? (
		<Button
			cssOverrides={[buttonStyles(palette), activeStyles(palette)]}
			onClick={onClick}
			icon={<SvgCross />}
			iconSide="right"
		>
			<Label text={text} count={count} />
		</Button>
	) : (
		<Button cssOverrides={buttonStyles(palette)} onClick={onClick}>
			<Label text={text} count={count} />
		</Button>
	);
};
