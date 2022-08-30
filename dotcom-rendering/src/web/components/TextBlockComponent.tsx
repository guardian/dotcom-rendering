import { ClassNames } from '@emotion/react';
import type { ArticleFormat } from '@guardian/libs';
import { ArticleDesign, ArticleDisplay, ArticleSpecial } from '@guardian/libs';
import {
	body,
	from,
	neutral,
	textSans,
	until,
} from '@guardian/source-foundations';
import type { IOptions } from 'sanitize-html';
import sanitise from 'sanitize-html';
import { unwrapHtml } from '../../model/unwrapHtml';
import { decidePalette } from '../lib/decidePalette';
import { DropCap } from './DropCap';
import { RewrappedComponent } from './RewrappedComponent';

type Props = {
	html: string;
	format: ArticleFormat;
	isFirstParagraph: boolean;
	forceDropCap?: boolean;
};

const isLetter = (letter: string) => {
	return letter.toLowerCase() !== letter.toUpperCase();
};

const isOpenQuote = (t: string): boolean => {
	return [
		"'" /* apostrophe  */,
		'"' /* quotation mark */,
		'\u2018' /* open single quote */,
		'\u201c' /* open double quote */,
	].includes(t);
};

const isLongEnough = (html: string): boolean => {
	// Only show a dropcap if the block of text is 200 characters or
	// longer. But we first need to strip any markup from our html string so
	// that we accurately measure the length that the reader will see. Eg. remove
	// link tag html.
	// https://stackoverflow.com/questions/822452/strip-html-from-text-javascript is
	// a good discussion on how this can be done. Of the two approaches, regex and
	// DOM, both have unikely failure scenarios but the impact for failure with DOM
	// manipulation carries a potential security risk so we're using a regex.
	return html.replace(/(<([^>]+)>)/gi, '').length >= 199;
};

const decideDropCapLetter = (html: string): string => {
	const first = html.substr(0, 1);
	if (isOpenQuote(first)) {
		const second = html.substr(1, 1);

		if (!isLetter(second)) {
			return '';
		}
		return `${first}${second}`;
	}

	return isLetter(first) ? first : '';
};

const allowsDropCaps = (format: ArticleFormat) => {
	if (format.theme === ArticleSpecial.Labs) return false;
	if (format.display === ArticleDisplay.Immersive) return true;
	switch (format.design) {
		case ArticleDesign.Feature:
		case ArticleDesign.Comment:
		case ArticleDesign.Review:
		case ArticleDesign.Interview:
		case ArticleDesign.PhotoEssay:
		case ArticleDesign.Recipe:
			return true;
		default:
			return false;
	}
};

const shouldShowDropCap = ({
	format,
	isFirstParagraph,
	forceDropCap,
}: {
	format: ArticleFormat;
	isFirstParagraph: boolean;
	forceDropCap?: boolean;
}): boolean => {
	if (allowsDropCaps(format)) {
		// When dropcaps are allowed, we always mark the first paragraph as a drop cap
		if (isFirstParagraph) return true;
		// For subsequent blocks of text, we only add a dropcap if a dinkus was inserted
		// prior to it in the article body (Eg: * * *), causing the forceDropCap flag to
		// be set
		if (forceDropCap) return true;
	}
	return false;
};

/**
 * https://www.npmjs.com/package/sanitize-html#default-options
 */
const sanitiserOptions: IOptions = {
	allowedTags: false, // Leave tags from CAPI alone
	allowedAttributes: false, // Leave attributes from CAPI alone
	transformTags: {
		a: (tagName, attribs) => {
			const mailto = attribs.href.startsWith('mailto:')
				? ` | ${attribs.href}`
				: '';

			return {
				tagName, // Just return anchors as is
				attribs: {
					...attribs, // Merge into the existing attributes
					...{
						'data-link-name': `in body link${mailto}`, // Add the data-link-name for Ophan to anchors
					},
				},
			};
		},
	},
};

export const TextBlockComponent = ({
	html,
	format,
	forceDropCap,
	isFirstParagraph,
}: Props) => (
	<ClassNames>
		{({ css }) => {
			const paraStyles = css`
				margin-bottom: 16px;
				word-break: break-word;
				${format.theme === ArticleSpecial.Labs
					? textSans.medium()
					: body.medium()};

				ul {
					margin-bottom: 12px;
				}

				${from.tablet} {
					ul {
						margin-bottom: 16px;
					}
				}

				li {
					margin-bottom: 6px;
					padding-left: 20px;

					p {
						display: inline;
					}
				}

				li:before {
					display: inline-block;
					content: '';
					border-radius: 50%;
					height: 13px;
					width: 13px;
					background-color: ${neutral[86]};
					margin-left: -20px;
					margin-right: 7px;
				}

				/* Subscript and Superscript styles */
				sub {
					bottom: -0.25em;
				}

				sup {
					top: -0.5em;
				}

				sub,
				sup {
					font-size: 75%;
					line-height: 0;
					position: relative;
					vertical-align: baseline;
				}

				[data-dcr-style='bullet'] {
					display: inline-block;
					content: '';
					border-radius: 50%;
					height: 13px;
					width: 13px;
					margin-right: 0.2px;
					background-color: ${decidePalette(format).background
						.bullet};
				}

				${until.tablet} {
					/* 	To stop long words going outside of the view port.
					For compatibility */
					overflow-wrap: anywhere;
					word-wrap: break-word;
				}
			`;

			const {
				willUnwrap: isUnwrapped,
				unwrappedHtml,
				unwrappedElement,
			} = unwrapHtml({
				fixes: [
					{
						unwrappedElement: 'p',
						prefix: '<p>',
						suffix: '</p>',
					},
					{
						unwrappedElement: 'ul',
						prefix: '<ul>',
						suffix: '</ul>',
					},
					{
						unwrappedElement: 'h3',
						prefix: '<h3>',
						suffix: '</h3>',
					},
				],
				html,
			});

			const firstLetter = decideDropCapLetter(unwrappedHtml);
			const remainingLetters = firstLetter
				? unwrappedHtml.substr(firstLetter.length)
				: unwrappedHtml;

			if (
				shouldShowDropCap({
					format,
					isFirstParagraph,
					forceDropCap,
				}) &&
				firstLetter &&
				isLongEnough(remainingLetters)
			) {
				return (
					<p css={paraStyles}>
						<DropCap letter={firstLetter} format={format} />
						<RewrappedComponent
							isUnwrapped={isUnwrapped}
							html={sanitise(remainingLetters, sanitiserOptions)}
							elCss={paraStyles}
							tagName="span"
						/>
					</p>
				);
			}

			return (
				<RewrappedComponent
					isUnwrapped={isUnwrapped}
					html={sanitise(unwrappedHtml, sanitiserOptions)}
					elCss={paraStyles}
					tagName={unwrappedElement || 'p'}
				/>
			);
		}}
	</ClassNames>
);
