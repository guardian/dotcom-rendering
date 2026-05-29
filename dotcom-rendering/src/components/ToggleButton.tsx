import { space, textSans15Object } from '@guardian/source/foundations';
import type { ButtonHTMLAttributes, ReactNode } from 'react';
import { palette } from '../palette';
import type { ColourName } from '../paletteDeclarations';

type Props = {
	onClick: () => void;
	children: ReactNode;
	colour: ColourName;
	icon: ReactNode;
	iconFill: ColourName;
	iconBackground: ColourName | undefined;
	iconBorder: ColourName;
	className?: string;
};

export const ToggleButton = (props: Props) => (
	<Button
		onClick={props.onClick}
		colour={props.colour}
		className={props.className}
	>
		<Icon
			background={props.iconBackground}
			border={props.iconBorder}
			fill={props.iconFill}
		>
			{props.icon}
		</Icon>
		{props.children}
	</Button>
);

const Button = (props: {
	onClick: ButtonHTMLAttributes<HTMLButtonElement>['onClick'];
	children: ReactNode;
	colour: ColourName;
	className: string | undefined;
}) => (
	<button
		type="button"
		onClick={props.onClick}
		css={{
			...textSans15Object,
			background: 'none',
			border: 'none',
			marginLeft: 0,
			minHeight: space[6],
			padding: 0,
			textAlign: 'left',
			display: 'flex',
			alignItems: 'center',
			columnGap: '0.2em',
		}}
		style={{
			color: palette(props.colour),
		}}
		className={props.className}
	>
		{props.children}
	</button>
);

const Icon = (props: {
	fill: ColourName;
	background: ColourName | undefined;
	border: ColourName;
	children: ReactNode;
}) => (
	<div
		css={{
			display: 'flex',
			margin: 0,
			marginRight: space[1],
			borderRadius: '100%',
			borderWidth: 1,
			borderStyle: 'solid',
			svg: {
				margin: 1,
			},
		}}
		style={{
			fill: palette(props.fill),
			backgroundColor:
				props.background !== undefined
					? palette(props.background)
					: undefined,
			borderColor: palette(props.border),
		}}
	>
		{props.children}
	</div>
);
