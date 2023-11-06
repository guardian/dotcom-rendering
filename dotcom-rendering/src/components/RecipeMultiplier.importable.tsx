import { css } from '@emotion/react';
import { isString, isUndefined, log } from '@guardian/libs';
import { palette, space, textSans } from '@guardian/source-foundations';
import { Button, SvgMinus, SvgPlus } from '@guardian/source-react-components';
import type { ChangeEventHandler } from 'react';
import { useEffect, useState } from 'react';

const colours = `
gu-recipe {
	color: ${palette.lifestyle[100]};
	background-color: ${palette.lifestyle[800]};
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
	color: ${palette.lifestyle[100]};
	background-color: ${palette.lifestyle[800]};
	padding: ${space[2]}px;
`;

const min = 0.5;
const max = 24;

const units = ['g', 'l'] as const;
const isUnit = (unit: string): unit is (typeof units)[number] =>
	//@ts-expect-error -- custom type guard
	units.includes(unit);

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
const isConstant = (time?: string): time is (typeof constants)[number] =>
	isString(time) &&
	//@ts-expect-error -- custom type guard
	constants.includes(time);

const fractions = new Map([
	['½', 0.5],
	['⅓', 0.3333],
	['⅔', 0.6667],
	['¼', 0.25],
	['¾', 0.75],
	['⅕', 0.2],
	['⅖', 0.4],
	['⅗', 0.6],
	['⅘', 0.8],
	['⅙', 0.1667],
	['⅚', 0.8333],
	['⅐', 0.1429],
	['⅛', 0.125],
	['⅜', 0.375],
	['⅝', 0.625],
	['⅞', 0.875],
	['⅑', 0.1111],
	['⅒', 0.1],
]);

/** Pick any numeric value or range, followed by its unit */
const RECIPE_ELEMENTS = new RegExp(
	[
		// Start after a word is broken, or Makes / Serves
		`(?:${['', 'Serves ', 'Makes '].join('|')})`,
		// `value` capturing group
		`(?<value>${[
			'\\d+',
			'\\d+-\\d+',
			'\\d+/\\d+',
			...fractions.keys(),
		].join('|')})`,
		// `separator` capturing group
		'(?:(?<separator> ?)',
		// `unit` capturing group
		'(?<unit>[a-z]+?\\b)|(?=<))',
	].join(''),
	'i',
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
	if (from === undefined) return `Invalid value`;
	if (to !== undefined) {
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
	const [servesElement, setServesElement] = useState<HTMLElement>();
	const [serves, setServes] = useState<number>(1);
	const [servings, setServings] = useState<number>(serves);
	const [multiplier, setMultiplier] = useState(1);

	useEffect(() => {
		if (!servesElement) return;

		const rawServes = parseFloat(servesElement.dataset.value ?? '1');

		if (Number.isNaN(rawServes)) return;

		setServes(rawServes);
		setServings(rawServes);
	}, [servesElement]);

	useEffect(() => {
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
					node.nodeValue.match(RECIPE_ELEMENTS) ?? undefined;

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

						setServesElement(recipeElement);

						if (isConstant(groups?.unit)) continue;

						const attributes = Object.entries(groups ?? {}).map(
							([key, value]) => {
								const [numerator, denominator] = value
									.split('/')
									.map(parseFloat);
								if (
									key === 'value' &&
									value.includes('/') &&
									numerator !== undefined &&
									denominator !== undefined
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
							},
						);

						for (const [key, value] of attributes) {
							recipeElement.setAttribute(`data-${key}`, value);
						}

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
		if (servesElement) servesElement.innerText = servings.toString();
		setMultiplier(servings / serves);
	}, [servesElement, serves, servings]);

	useEffect(() => {
		for (const element of document.querySelectorAll<HTMLElement>(
			'gu-recipe',
		)) {
			const { value, separator, unit } = element.dataset;

			if (isUndefined(value) || isUndefined(separator)) continue;

			if (isUndefined(unit)) continue;

			element.innerText = transform({
				value: value
					.split('-')
					.map(parseFloat)
					.map((v) => v * multiplier),
				separator,
				unit,
			});
		}
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
						background-color: ${palette.lifestyle[300]};
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
						background-color: ${palette.lifestyle[300]};
					`}
					onClick={() => setServings(servings + 1)}
				>
					add 1 serving
				</Button>
			</li>
			<li
				css={{
					gridColumn: '1 / -1',
					accentColor: palette.lifestyle[300],
				}}
			>
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
