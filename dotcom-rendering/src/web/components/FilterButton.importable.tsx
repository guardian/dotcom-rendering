import { css } from '@emotion/react';
import { space, textSans } from '@guardian/source-foundations';
import { Button, SvgCross } from '@guardian/source-react-components';
import { decidePalette } from '../lib/decidePalette';

interface LabelProps {
	value: string;
	count: number;
}

interface ButtonProps {
	topicType: TopicType;
	activeTopic: string;
	value: string;
	count: number;
	format: ArticleFormat;
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

const Label = ({ value, count }: LabelProps) => (
	<>
		<span css={valueStyles}>{value}</span>{' '}
		<span css={countStyles}>({count})</span>
	</>
);

export const FilterButton = ({
	value,
	count,
	topicType,
	activeTopic,
	format,
}: ButtonProps) => {
	const buttonTopic = `${topicType}:${value}`;
	const palette = decidePalette(format);

	const handleClick = () => {
		const urlParams = new URLSearchParams(window.location.search);
		urlParams.delete('page'); // direct to the first page
		urlParams.set('topics', buttonTopic);

		window.location.search = urlParams.toString();
	};

	return activeTopic === buttonTopic ? (
		<Button
			cssOverrides={[buttonStyles(palette), activeStyles(palette)]}
			onClick={handleClick}
			icon={<SvgCross />}
			iconSide="right"
		>
			<Label value={value} count={count} />
		</Button>
	) : (
		<Button cssOverrides={buttonStyles(palette)} onClick={handleClick}>
			<Label value={value} count={count} />
		</Button>
	);
};
