// ----- Imports ----- //

import { css } from '@emotion/react';
import type { ArticleFormat } from '@guardian/libs';
import { headline, remSpace } from '@guardian/source-foundations';
import { withDefault } from '../../../vendor/@guardian/types/index';
import type { HeadingTwo as HeadingTwoType } from 'bodyElement';
import Anchor from 'components/Anchor';
import HorizontalRule from 'components/HorizontalRule';
import type { Styleable } from 'lib';
import { identity } from 'lib';
import type { FC } from 'react';
import { getHref } from 'renderer';

// ----- Components ----- //

interface DefaultProps {
	format: ArticleFormat;
	isEditions: boolean;
	heading: HeadingTwoType;
}

type Props = Styleable<DefaultProps>;

interface HeadingTextElementProps {
	format: ArticleFormat;
	isEditions: boolean;
	node: Node;
	key: number;
}

const defaultStyles = css`
	${headline.xxsmall({ fontWeight: 'bold' })}
	margin: ${remSpace[4]} 0 ${remSpace[1]} 0;

	& + p {
		margin-top: 0;
	}
`;

const HeadingTextElement: FC<HeadingTextElementProps> = ({
	format,
	isEditions,
	node,
	key,
}) => {
	const text = node.textContent ?? '';
	const children = Array.from(node.childNodes).map((item, i) => (
		<HeadingTextElement
			format={format}
			isEditions={isEditions}
			node={item}
			key={i}
		/>
	));

	switch (node.nodeName) {
		case '#text':
			return <>{text}</>;
		case 'A':
			return (
				<Anchor
					href={withDefault('')(getHref(node))}
					format={format}
					isEditions={isEditions}
					key={key}
				>
					{children}
				</Anchor>
			);
		case 'EM':
			return <em key={key}>{children}</em>;
		case 'SUB': {
			return (
				<sub
					css={css`
						font-size: smaller;
						vertical-align: sub;
					`}
					key={key}
				>
					{children}
				</sub>
			);
		}
		case 'SUP': {
			return (
				<sup
					css={css`
						font-size: smaller;
						vertical-align: super;
					`}
					key={key}
				>
					{children}
				</sup>
			);
		}
		case 'STRONG':
			return (
				<strong
					css={css`
						font-weight: bold;
					`}
					key={key}
				>
					{children}
				</strong>
			);
		default:
			return null;
	}
};

const DefaultHeadingTwo: FC<Props> = ({
	format,
	isEditions,
	heading,
	className,
}) => {
	const text = heading.doc.textContent ?? '';
	const children = Array.from(heading.doc.childNodes).map((item, i) => (
		<HeadingTextElement
			format={format}
			isEditions={isEditions}
			node={item}
			key={i}
		/>
	));

	return text.includes('* * *') ? (
		<HorizontalRule />
	) : (
		<h2
			id={heading.id
				.map<string | undefined>(identity)
				.withDefault(undefined)}
			css={className}
		>
			{children}
		</h2>
	);
};

// ----- Exports ----- //

export type { DefaultProps };

export { defaultStyles };

export default DefaultHeadingTwo;
