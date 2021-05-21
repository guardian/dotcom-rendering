import { ClassNames } from '@emotion/react';

import { neutral } from '@guardian/src-foundations/palette';
import { body, textSans } from '@guardian/src-foundations/typography';
import { from, until } from '@guardian/src-foundations/mq';
import { sanitise } from '@frontend/lib/sanitise-html';

import { unwrapHtml } from '@root/src/model/unwrapHtml';
import { RewrappedComponent } from '@root/src/web/components/elements/RewrappedComponent';

import { DropCap } from '@frontend/web/components/DropCap';
import { Display, Design, Format, Special } from '@guardian/types';
import { decidePalette } from '@root/src/web/lib/decidePalette';

type Props = {
	html: string;
	format: Format;
	isFirstParagraph: boolean;
	forceDropCap?: boolean;
};

const isLetter = (letter: string) => {
	return letter.toLowerCase() !== letter.toUpperCase();
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
	if (first === '“') {
		const second = html.substr(1, 1);

		if (!isLetter(second)) {
			return '';
		}
		return `${first}${second}`;
	}

	return isLetter(first) ? first : '';
};

const allowsDropCaps = (format: Format) => {
	if (format.theme === Special.Labs) return false;
	if (format.display === Display.Immersive) return true;
	switch (format.design) {
		case Design.Feature:
		case Design.Comment:
		case Design.Review:
		case Design.Interview:
		case Design.PhotoEssay:
		case Design.Recipe:
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
	format: Format;
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

const sanitiserOptions = {
	// Defaults: https://www.npmjs.com/package/sanitize-html#what-are-the-default-options
	allowedTags: false, // Leave tags from CAPI alone
	allowedAttributes: false, // Leave attributes from CAPI alone
	transformTags: {
		a: (tagName: string, attribs: { [key: string]: any }) => ({
			tagName, // Just return anchors as is
			attribs: {
				...attribs, // Merge into the existing attributes
				...{
					'data-link-name': 'in body link', // Add the data-link-name for Ophan to anchors
				},
			},
		}),
	},
};

export const TextBlockComponent = ({
	html,
	format,
	forceDropCap,
	isFirstParagraph,
}: Props): JSX.Element | null => (
	<ClassNames>
		{({ css }) => {
			const paraStyles = css`
				margin-bottom: 16px;
				${format.theme === Special.Labs
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
					border-radius: 6px;
					height: 12px;
					width: 12px;
					margin-right: 8px;
					background-color: ${neutral[86]};
					margin-left: -20px;
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
					border-radius: 100%;
					height: 15.2px;
					width: 15.2px;
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
