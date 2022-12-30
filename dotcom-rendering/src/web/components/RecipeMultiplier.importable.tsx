import { css } from '@emotion/react';
import { isUndefined, log } from '@guardian/libs';
import { lifestyle, space, textSans } from '@guardian/source-foundations';
import { Button, SvgMinus, SvgPlus } from '@guardian/source-react-components';
import type { ChangeEventHandler } from 'react';
import { useEffect, useState } from 'react';
import { useOnce } from '../lib/useOnce';

const colours = `
gu-recipe {
	color: ${lifestyle[100]};
	background-color: ${lifestyle[800]};
	font-weight: bold;
}
`;

const styles = css`
	${textSans.small()}
	position: sticky;
	z-index: 1;
	display: grid;
	grid-template-columns: 6fr repeat(3, 1fr);
	top: 0;
	color: ${lifestyle[100]};
	background-color: ${lifestyle[800]};
	padding: ${space[2]}px;
`;

const min = 0.5;
const max = 24;

const units = ['g', 'l'] as const;
const isUnit = (unit: string): unit is typeof units[number] =>
	//@ts-expect-error -- custom type guard
	units.includes(unit);

const isServer = typeof document === 'undefined';

const serves = isServer
	? 1
	: parseFloat(
			document.querySelector<HTMLElement>('gu-recipe[serves]')?.dataset.value ??
				'1',
	  );

const transform = ({
	value,
	separator,
	unit,
	multiplier,
}: {
	value: string;
	separator: string;
	unit: string;
	multiplier: number;
}) => {
	const [from, to] = value.split('-').map(parseFloat);

	if (from && to) {
		const range = `${Math.round(from * multiplier)}-${Math.round(
			to * multiplier,
		)}`;

		return [range, separator, unit].join('');
	}

	const base = parseFloat(value);
	if (isUnit(unit)) {
		const round = Math.round((base * multiplier) / 5) * 5;
		return `${round}${separator}${unit}`;
	}

	const round =
		base > 1
			? Math.round(base * multiplier)
			: Math.round(base * multiplier * 100) / 100;
	return `${round}${separator}${unit}`;
};

export const RecipeMultiplier = () => {
	const [servings, setServings] = useState<number>(serves);
	const [multiplier, setMultiplier] = useState(1);

	useOnce(() => {
		log('dotcom', 'Injecting multiplier');
		const style = document.createElement('style');
		style.innerHTML = colours;
		document.body.appendChild(style);
	}, []);

	useEffect(() => {
		const element = document.querySelector<HTMLElement>('gu-recipe[serves]');
		if (element) element.innerText = servings.toString();
		setMultiplier(servings / serves);
	}, [servings]);

	useEffect(() => {
		document.querySelectorAll<HTMLElement>('gu-recipe').forEach((element) => {
			const { value, separator, unit } = element.dataset;

			if (isUndefined(value) || isUndefined(separator)) return;

			if (isUndefined(unit)) return;

			element.innerText = transform({
				value,
				separator,
				unit,
				multiplier,
			});
		});
	}, [multiplier]);

	const handleChange: ChangeEventHandler<HTMLInputElement> = ({
		target: { value },
	}) => {
		const float = Number.parseFloat(value);

		if (!Number.isNaN(float)) setServings(float);
	};

	return (
		<ul css={styles}>
			<li>Serves {servings}</li>
			<li css={{ textAlign: 'center' }}>
				<Button
					icon={<SvgMinus />}
					hideLabel={true}
					size="xsmall"
					disabled={servings - 1 < min}
					cssOverrides={css`
						background-color: ${lifestyle[300]};
					`}
					onClick={() => setServings(servings - 1)}
				>
					subtract 1 serving
				</Button>
			</li>
			<li
				css={{
					fontWeight: 'bold',
					textAlign: 'center',
				}}
			>
				{servings}
			</li>
			<li css={{ textAlign: 'center' }}>
				<Button
					icon={<SvgPlus />}
					hideLabel={true}
					size="xsmall"
					disabled={servings + 1 > max}
					cssOverrides={css`
						background-color: ${lifestyle[300]};
					`}
					onClick={() => setServings(servings + 1)}
				>
					add 1 serving
				</Button>
			</li>
			<li css={{ gridColumn: '1 / -1', accentColor: lifestyle[300] }}>
				<input
					css={{ width: '100%', margin: 0 }}
					type="range"
					name=""
					min={min}
					max={max}
					step={0.5}
					value={servings}
					onChange={handleChange}
				/>
			</li>
		</ul>
	);
};
