import type { ArticleFormat } from '@guardian/libs';
import { ArticleDesign, ArticleDisplay, ArticlePillar } from '@guardian/libs';
import type { BodyElement } from 'bodyElement';
import { flattenTextElement } from 'bodyElement';
import { JSDOM } from 'jsdom';
import { compose } from 'lib';
import type { ReactNode } from 'react';
import { renderEditionsElements, renderElements, renderWithoutStyles } from 'renderer';

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

const mockRenderElement = (element: BodyElement): ReactNode[] =>
	renderElements(mockFormat, [element]);

const mockRenderElements = (elements: BodyElement[]): ReactNode[] =>
	renderElements(mockFormat, elements);

const mockRenderWithoutStyles = (elements: BodyElement[]): ReactNode[] =>
	renderWithoutStyles(mockFormat, elements);

const mockRenderEditions = (element: BodyElement): ReactNode[] =>
	renderEditionsElements(mockFormat, [element]);

const renderParagraphs = compose(mockRenderElements, generateParas);

const renderTextElement = compose(mockRenderElements, textElements);

export {
	mockFormat,
	generateParas,
	textElements,
	mockRenderElement,
	mockRenderElements,
	mockRenderWithoutStyles,
	mockRenderEditions,
	renderParagraphs,
	renderTextElement,
};
