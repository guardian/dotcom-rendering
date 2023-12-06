import type { Contact } from '@guardian/apps-rendering-api-models/contact';
import type { FormField } from '@guardian/apps-rendering-api-models/formField';
import type { FormOption } from '@guardian/apps-rendering-api-models/formOption';
import { ArticlePillar, ArticleSpecial } from '@guardian/libs';
import type { ArticleFormat, ArticleTheme } from '@guardian/libs';
import { withDefault } from '../../vendor/@guardian/types/index';
import { ElementKind } from 'bodyElementKind';
import { pipe, resultFromNullable } from 'lib';
import {
	andThen,
	arrayParser,
	booleanParser,
	documentFragmentParser,
	fieldParser,
	map,
	map2,
	map4,
	map8,
	map9,
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
import type { Callout } from '../bodyElement';
import CalloutComponent from '../components/Callout';

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
	hidden: boolean,
	description?: string,
): FormField => ({
	id,
	label,
	name,
	type,
	mandatory,
	options,
	description,
	hidden,
});

const makeContacts = (
	name: string,
	value: string,
	urlPrefix: string,
	guidance?: string,
): Contact => ({
	name,
	value,
	urlPrefix,
	guidance,
});

const makeCalloutProps = (
	callout: Callout,
	format: ArticleFormatProps,
): CalloutProps => ({
	callout,
	format,
});

const makeCallout = (
	formId: number,
	formFields: FormField[],
	isNonCollapsible: boolean,
	name: string,
	prompt: string,
	heading: string,
	description?: DocumentFragment,
	activeUntil?: number,
	contacts?: Contact[],
): Callout => ({
	kind: ElementKind.Callout,
	prompt,
	heading,
	formId,
	formFields,
	isNonCollapsible,
	name,
	description,
	activeUntil,
	contacts,
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
			case ArticleSpecial.SpecialReportAlt:
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

const formFieldsParser: Parser<FormField> = map8(makeFormFields)(
	fieldParser('id', stringParser),
	fieldParser('label', stringParser),
	fieldParser('name', stringParser),
	fieldParser('type', stringParser),
	fieldParser('mandatory', booleanParser),
	fieldParser('options', arrayParser(optionParser)),
	fieldParser('hidden', booleanParser),
	aOrUndefinedParser(fieldParser('description', stringParser)),
);

const contactsParser: Parser<Contact> = map4(makeContacts)(
	fieldParser('name', stringParser),
	fieldParser('value', stringParser),
	fieldParser('urlPrefix', stringParser),
	aOrUndefinedParser(fieldParser('guidance', stringParser)),
);

const calloutParser: Parser<Callout> = map9(makeCallout)(
	fieldParser('formId', numberParser),
	fieldParser('formFields', arrayParser(formFieldsParser)),
	fieldParser('isNonCollapsible', booleanParser),
	fieldParser('name', stringParser),
	fieldParser('prompt', stringParser),
	fieldParser('heading', stringParser),
	fieldParser('description', documentFragmentParser),
	aOrUndefinedParser(fieldParser('activeUntil', numberParser)),
	aOrUndefinedParser(fieldParser('contacts', arrayParser(contactsParser))),
);

const calloutPropsParser: Parser<CalloutProps> = map2(makeCalloutProps)(
	fieldParser('callout', calloutParser),
	fieldParser('format', formatParser),
);

const parseCalloutProps = (
	rawProps: string | undefined | null,
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
	const rawProps = document
		.querySelector('.js-callout-props')
		?.getAttribute('data-hydrationprops');
	const parsedProps = parseCalloutProps(rawProps);

	if (parsedProps.isOk()) {
		const calloutProps = parsedProps.value;

		ReactDOM.render(
			h(CalloutComponent, {
				...calloutProps.callout,
				format: calloutProps.format as ArticleFormat,
			}),
			callout,
		);
	}

	if (parsedProps.isErr()) {
		console.error(parsedProps.error);
	}
}

function callouts(): void {
	const calloutForms = Array.from(document.querySelectorAll('.js-callout'));
	if (!calloutForms.length) {
		return;
	}
	calloutForms.forEach(hydrateCallout);
}

export { callouts };
