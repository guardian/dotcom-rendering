import { BodyElement } from 'bodyElement';
import { ElementKind } from 'bodyElementKind';
import { indexOptional } from 'lib';
import { Optional } from 'optional';

type Fields = {
	id: string;
	doc: Node;
};

type Outline = Array<
	Fields & {
		subheadings: Array<Fields>;
	}
>;

const fromBodyElements = (elements: BodyElement[]): Outline =>
	elements.reduce((outline: Outline, element: BodyElement): Outline => {
		switch (element.kind) {
			case ElementKind.HeadingTwo:
				return element.id
					.map((id) => [
						...outline,
						{
							id,
							doc: element.doc,
							subheadings: [],
						},
					])
					.withDefault(outline);
			case ElementKind.HeadingThree:
				const currentH2 = indexOptional(outline.length - 1)(outline);
				return Optional.map2(currentH2, element.id, (h2, id) => [
					...outline.slice(0, outline.length - 1),
					{
						...h2,
						subheadings: [
							...h2.subheadings,
							{
								id,
								doc: element.doc,
							},
						],
					},
				]).withDefault(outline);
			default:
				return outline;
		}
	}, []);

export type { Outline };
export { fromBodyElements };
