import { css } from '@emotion/react';
import { isString, isUndefined, log } from '@guardian/libs';
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

/** Pick any numeric value or range, followed by its unit */
const RECIPE_ELEMENTS =
	/\b(?<value>(?:\d+|\d+-\d+|¼|½|\d+\/\d+))(?:(?<separator> ?)(?<unit>[a-z]+?\b)|(?=<))/i;

/** These values should not update based on servings  */
const constants = [
	's',
	'second',
	'seconds',
	'min',
	'minute',
	'minutes',
	'hr',
	'hour',
	'hours',
	'C',
	'c',
	'cm',
	'mm',
] as const;
const isConstant = (time?: string): time is typeof constants[number] =>
	isString(time) &&
	//@ts-expect-error -- custom type guard
	constants.includes(time);

const fractions = new Map([
	['½', 0.5],
	['¼', 0.25],
]);

const serves = isServer
	? 1
	: parseFloat(
			document.querySelector<HTMLElement>('gu-recipe[serves]')?.dataset
				.value ?? '1',
	  );

const transform = ({
	value,
	separator,
	unit,
}: {
	value: number[];
	separator: string;
	unit: string;
}) => {
	const [from, to] = value;
	if (!from) return `Invalid value`;
	if (to) {
		return `${from}-${to}${separator}${unit}`;
	}

	if (isUnit(unit)) {
		const round = Math.round(from / 5) * 5;
		return `${round}${separator}${unit}`;
	}

	const round = from > 1 ? Math.round(from) : Math.round(from * 100) / 100;
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

		const root = document.querySelector(
			'gu-island[name=RecipeMultiplier]',
		)?.nextSibling;

		if (root instanceof HTMLElement) {
			const walker = document.createTreeWalker(
				root,
				NodeFilter.SHOW_TEXT,
				null,
			);

			let node: Node | null;

			while ((node = walker.nextNode())) {
				if (!(node instanceof Text)) continue;

				const match =
					node.nodeValue?.match(RECIPE_ELEMENTS) ?? undefined;

				if (!match) continue;

				const { index, groups } = match;
				const length = match[0].length;

				switch (index) {
					case undefined:
					case -1: {
						// Do nothing
						break;
					}
					case 0: {
						// Tom explained to me truthiness of 0 in JS. Ta.
						if (length) node.splitText(length);
						const recipeElement =
							document.createElement('gu-recipe');
						recipeElement.textContent = node.textContent;

						if (isConstant(groups?.unit)) continue;

						Object.entries(groups ?? {})
							.map(([key, value]) => {
								const [numerator, denominator] = value
									.split('/')
									.map(parseFloat);
								if (
									key === 'value' &&
									value.includes('/') &&
									numerator &&
									denominator
								) {
									return [
										key,
										(numerator / denominator).toString(),
									] as const;
								}
								return [
									key,
									fractions.get(value)?.toString() ?? value,
								] as const;
							})
							.forEach(([key, value]) => {
								recipeElement.setAttribute(
									`data-${key}`,
									value,
								);
							});

						node.parentNode?.insertBefore(recipeElement, node);

						node.textContent = null;
						break;
					}
					default: {
						node.splitText(index);
						break;
					}
				}

				log('design', index, length, node.textContent);
			}
		}
	}, []);

	useEffect(() => {
		const element =
			document.querySelector<HTMLElement>('gu-recipe[serves]');
		if (element) element.innerText = servings.toString();
		setMultiplier(servings / serves);
	}, [servings]);

	useEffect(() => {
		document
			.querySelectorAll<HTMLElement>('gu-recipe')
			.forEach((element) => {
				const { value, separator, unit } = element.dataset;

				if (isUndefined(value) || isUndefined(separator)) return;

				if (isUndefined(unit)) return;

				element.innerText = transform({
					value: value
						.split('-')
						.map(parseFloat)
						.map((v) => v * multiplier),
					separator,
					unit,
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
