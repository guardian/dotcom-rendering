import type { FormField } from '@guardian/apps-rendering-api-models/formField';
import type { FormOption } from '@guardian/apps-rendering-api-models/formOption';
import {
	ArticleDesign,
	ArticleDisplay,
	ArticlePillar,
	ArticleSpecial,
} from '@guardian/libs';
import type { ArticleFormat, ArticleTheme } from '@guardian/libs';
import { withDefault } from '@guardian/types';
import type { Callout } from 'bodyElement';
import { ElementKind } from 'bodyElementKind';
import { parse as clientParse } from 'client/parser';
import { pipe, resultFromNullable } from 'lib';
import {
	andThen,
	arrayParser,
	booleanParser,
	documentFragmentParser,
	fieldParser,
	map,
	map2,
	map7,
	maybe,
	numberParser,
	parse,
	stringParser,
	succeed,
} from 'parser';
import type { Parser } from 'parser';
import { createElement as h } from 'react';
import ReactDOM from 'react-dom';
import { Result } from 'result';
import CalloutComponent from '../components/Callout';

type FormData = Record<string, string | string[]>;

type FormElementType =
	| HTMLInputElement
	| HTMLTextAreaElement
	| HTMLSelectElement;

function readFile(file: Blob): Promise<string> {
	return new Promise((resolve, reject) => {
		const reader = new FileReader();
		setTimeout(reject, 30000);

		reader.addEventListener('load', () => {
			if (reader.result) {
				const fileAsBase64 = reader.result
					.toString()
					.split(';base64,')[1];
				resolve(fileAsBase64);
			}
		});

		reader.addEventListener('error', () => {
			reject();
		});

		reader.readAsDataURL(file);
	});
}
function submitCallout(body: FormData, form: Element): void {
	fetch(
		'https://callouts.code.dev-guardianapis.com/formstack-campaign/submit',
		{
			method: 'POST',
			body: JSON.stringify(body),
		},
	)
		.then((res) => {
			if (res.ok) {
				form.classList.add('js-callout--success');
			} else {
				form.classList.add('js-callout--failure');
			}
		})
		.catch(() => {
			form.classList.add('js-callout--failure');
		});
}

const getValueFromElement = async (
	element: FormElementType,
	acc: FormData,
): Promise<FormData> => {
	const { type, name, value } = element;
	if (type === 'radio') {
		const radioElement = element as HTMLInputElement;
		if (radioElement.checked) {
			acc[name] = value;
		}
	} else if (type === 'checkbox') {
		const checkboxElement = element as HTMLInputElement;
		if (checkboxElement.checked) {
			acc[name]
				? (acc[name] = [...acc[name], value])
				: (acc[name] = [value]);
		}
	} else if (type === 'file') {
		const fileElement = element as HTMLInputElement;
		if (fileElement.files?.length) {
			acc[name] = await readFile(fileElement.files[0]);
		}
	} else if (value) {
		acc[name] = value;
	}
	return Promise.resolve(acc);
};

const validate = (elements: FormElementType[]): boolean => {
	let hasError = false;
	elements.forEach((element) => {
		if (element.type === 'checkbox') {
			// this shouldn't be on document??? Should be on the form
			const mandatoryCheckboxGroup = document.getElementById(
				`checkbox-group-${element.name}--mandatory`,
			);
			const checkedCheckboxes =
				mandatoryCheckboxGroup?.querySelectorAll(':checked');
			if (mandatoryCheckboxGroup && !checkedCheckboxes?.length) {
				document
					.getElementById(element.name)
					?.classList.add('callout-field--failure');
				hasError = true;
			} else {
				document
					.getElementById(element.name)
					?.classList.remove('callout-field--failure');
			}
		} else if (element.required && !element.value) {
			document
				.getElementById(element.name)
				?.classList.add('callout-field--failure');
			hasError = true;
		} else {
			document
				.getElementById(element.name)
				?.classList.remove('callout-field--failure');
		}
	});
	return hasError;
};

export async function handleSubmission(): Promise<void> {
	const form = document.querySelector('form');
	if (!form) return;
	try {
		const elements = [
			...form.getElementsByTagName('input'),
			...form.getElementsByTagName('textarea'),
			...form.getElementsByTagName('select'),
		];

		// Validate the form
		const hasError = validate(elements);
		if (hasError) return;

		// Get Values
		const data = Array.from(elements).reduce(
			async (o: Promise<FormData>, elem) => {
				const acc = await o;
				await getValueFromElement(elem, acc);
				return Promise.resolve(acc);
			},
			Promise.resolve({}),
		);

		submitCallout(await data, form);
	} catch (e) {
		form.classList.add('js-callout--failure');
	}
}

// **** Hydration **** \\

interface ArticleFormatProps {
	theme: ArticleTheme;
}
interface CalloutProps {
	callout: Callout;
	format: ArticleFormatProps;
}

const makeFormOption = (label: string, value: string): FormOption => ({
	label,
	value,
});

const makeFormFields = (
	id: string,
	label: string,
	name: string,
	type: string,
	mandatory: boolean,
	options: FormOption[],
	description?: string,
): FormField => ({
	id,
	label,
	name,
	type,
	mandatory,
	options,
	description,
});

const makeCalloutProps = (
	callout: Callout,
	format: ArticleFormatProps,
): CalloutProps => ({
	callout,
	format,
});

const makeCallout = (
	heading: string,
	formId: number,
	formFields: FormField[],
	isNonCollapsible: boolean,
	name: string,
	description?: DocumentFragment,
	activeUntil?: number,
): Callout => ({
	kind: ElementKind.Callout,
	heading,
	formId,
	formFields,
	isNonCollapsible,
	name,
	description,
	activeUntil,
});

const makeArticleFormat = (theme: ArticleTheme): ArticleFormatProps => ({
	theme,
});

const themeParser: Parser<ArticleTheme> = pipe(
	numberParser,
	andThen((num) => {
		switch (num) {
			case ArticlePillar.News:
			case ArticlePillar.Opinion:
			case ArticlePillar.Sport:
			case ArticlePillar.Culture:
			case ArticlePillar.Lifestyle:
			case ArticleSpecial.SpecialReport:
			case ArticleSpecial.Labs:
				return succeed(num);
			default:
				return fail(
					`I was not able to parse '${num}' as a valid theme`,
				);
		}
	}),
);

const formatParser: Parser<ArticleFormatProps> = map(makeArticleFormat)(
	fieldParser('theme', themeParser),
);

const aOrUndefinedParser = <A>(aParser: Parser<A>): Parser<A | undefined> =>
	pipe(maybe(aParser), map(withDefault<A | undefined>(undefined)));

const optionParser: Parser<FormOption> = map2(makeFormOption)(
	fieldParser('label', stringParser),
	fieldParser('value', stringParser),
);

const formFieldsParser: Parser<FormField> = map7(makeFormFields)(
	fieldParser('id', stringParser),
	fieldParser('label', stringParser),
	fieldParser('name', stringParser),
	fieldParser('type', stringParser),
	fieldParser('mandatory', booleanParser),
	fieldParser('options', arrayParser(optionParser)),
	aOrUndefinedParser(fieldParser('description', stringParser)),
);

const calloutParser: Parser<Callout> = map7(makeCallout)(
	fieldParser('heading', stringParser),
	fieldParser('formId', numberParser),
	fieldParser('formFields', arrayParser(formFieldsParser)),
	fieldParser('isNonCollapsible', booleanParser),
	fieldParser('name', stringParser),
	fieldParser('description', documentFragmentParser),
	aOrUndefinedParser(fieldParser('activeUntil', numberParser)),
);

const calloutPropsParser: Parser<CalloutProps> = map2(makeCalloutProps)(
	fieldParser('callout', calloutParser),
	fieldParser('format', formatParser),
);

const parseCalloutProps = (
	rawProps: string | undefined,
): Result<string, CalloutProps> =>
	pipe(
		rawProps,
		resultFromNullable(
			'The callout did not have an accompanying element containing props',
		),
	)
		.flatMap((p) =>
			Result.fromUnsafe(
				(): unknown => JSON.parse(p.replace(/&quot;/g, '"')),
				'The props for the callout are not valid JSON',
			),
		)
		.flatMap(parse(calloutPropsParser));

function hydrateCallout(callout: Element): void {
	const rawProps = callout.querySelector('.js-callout-params')?.innerHTML;
	const parsedProps = parseCalloutProps(rawProps);

	const parser = new DOMParser();
	const parseHtml = (html: string): DocumentFragment | undefined =>
		clientParse(parser)(html).either<DocumentFragment | undefined>(
			(_err) => undefined,
			(doc) => doc,
		);

	// Hack because I can't get the parser to work for the description fragment
	const descriptionFrag: DocumentFragment | undefined = rawProps
		? parseHtml(JSON.parse(rawProps).callout.description)
		: undefined;

	if (parsedProps.isOk()) {
		const calloutProps = parsedProps.value;

		const mockFormat: ArticleFormat = {
			theme: ArticlePillar.News,
			design: ArticleDesign.Standard,
			display: ArticleDisplay.Standard,
		};

		ReactDOM.hydrate(
			h(CalloutComponent, {
				...calloutProps.callout,
				description: descriptionFrag,
				format: mockFormat,
			}),
			callout,
		);
	}

	if (parsedProps.isErr()) {
		console.error(parsedProps.error);
	}
}

function setup(callout: Element): void {
	hydrateCallout(callout);

	const forms = Array.from(callout.getElementsByTagName('form'));
	forms.forEach((form) => {
		form.addEventListener('submit', (event) => {
			event.preventDefault();
			handleSubmission().catch((err: unknown) => {
				console.error(err);
			});
		});
	});
}

function callouts(): void {
	const calloutForms = Array.from(document.querySelectorAll('.js-callout'));
	if (!calloutForms.length) {
		return;
	}
	calloutForms.forEach(setup);
}

export { callouts };
