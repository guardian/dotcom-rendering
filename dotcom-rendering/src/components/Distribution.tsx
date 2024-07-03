import { css } from '@emotion/react';
import { headlineBold34, text } from '@guardian/source/foundations';
import { isLight } from '../lib/isLight';

type Props = {
	left: BarType;
	right: BarType;
};

type BarType = {
	value: number;
	color: string;
};

const Row = ({ children }: { children: React.ReactNode }) => (
	<div
		css={css`
			display: flex;
			flex-direction: row;
		`}
	>
		{children}
	</div>
);

const Bar = ({
	displayText,
	background,
	position,
	width,
}: {
	displayText: string;
	background: string;
	position: 'left' | 'right';
	width: number;
}) => (
	<div
		css={css`
			${headlineBold34}
			color: ${isLight(background) ? text.ctaSecondary : text.ctaPrimary};
			background: ${background};
			flex-grow: ${width};
			line-height: 0.8;

			padding-top: 1px;
			padding-left: 6px;
			padding-right: 6px;
			padding-bottom: 9px;

			margin-right: ${position === 'left' && '1px'};
			margin-left: ${position === 'right' && '1px'};

			text-align: ${position === 'left' ? 'left' : 'right'};
		`}
	>
		{displayText}
	</div>
);

export const Distribution = ({ left, right }: Props) => {
	return (
		<Row>
			<Bar
				position="left"
				width={left.value === right.value ? 1 : left.value}
				displayText={left.value.toString()}
				background={left.color}
			/>
			<Bar
				position="right"
				width={left.value === right.value ? 1 : right.value}
				displayText={right.value.toString()}
				background={right.color}
			/>
		</Row>
	);
};
