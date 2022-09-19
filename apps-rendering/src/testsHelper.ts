import type { ArticleFormat } from '@guardian/libs';
import { ArticleDesign, ArticleDisplay, ArticlePillar } from '@guardian/libs';
import type { BodyElement } from 'bodyElement';
import { flattenTextElement } from 'bodyElement';
import { JSDOM } from 'jsdom';
import { compose } from 'lib';
import type { ReactNode } from 'react';
import { renderAll, renderAllWithoutStyles, renderEditionsAll } from 'renderer';

const mockFormat: ArticleFormat = {
	theme: ArticlePillar.News,
	design: ArticleDesign.Standard,
	display: ArticleDisplay.Standard,
};

const generateParas = (paras: number): BodyElement[] => {
	const frag = JSDOM.fragment(Array(paras).fill('<p>foo</p>').join(''));
	return flattenTextElement(frag);
};

const textElements = (nodes: string[]): BodyElement[] => {
	const frag = JSDOM.fragment(nodes.join(''));
	return flattenTextElement(frag);
};

const renderElement = (element: BodyElement): ReactNode[] =>
	renderAll(mockFormat, [element]);

const renderElements = (elements: BodyElement[]): ReactNode[] =>
	renderAll(mockFormat, elements);

const renderWithoutStyles = (elements: BodyElement[]): ReactNode[] =>
	renderAllWithoutStyles(mockFormat, elements);

const renderEditions = (element: BodyElement): ReactNode[] =>
	renderEditionsAll(mockFormat, [element]);

const renderParagraphs = compose(renderElements, generateParas);

const renderTextElement = compose(renderElements, textElements);

export {
	mockFormat,
	generateParas,
	textElements,
	renderElement,
	renderElements,
	renderWithoutStyles,
	renderEditions,
	renderParagraphs,
	renderTextElement,
};
