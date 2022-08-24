import { css } from '@emotion/react';
import type { SerializedStyles } from '@emotion/react';
import { ArticleSpecial } from '@guardian/libs';
import type { ArticleFormat } from '@guardian/libs';
import { headline, remSpace, textSans } from '@guardian/source-foundations';
import { withDefault } from '@guardian/types';
import type { HeadingTwo as HeadingTwoType } from 'bodyElement';
import Anchor from 'components/Anchor';
import HorizontalRule from 'components/HorizontalRule';
import { identity } from 'lib';
import { getHref } from 'renderer';

interface HeadingTwoProps {
	format: ArticleFormat;
	isEditions: boolean;
	heading: HeadingTwoType;
}

interface HeadingTextElementProps {
	format: ArticleFormat;
	isEditions: boolean;
	node: Node;
	key: number;
}

const styles = (format: ArticleFormat): SerializedStyles => {
	const font =
		format.theme === ArticleSpecial.Labs
			? textSans.large({ fontWeight: 'bold' })
			: headline.xxsmall({ fontWeight: 'bold' });

	return css`
		${font}
		margin: ${remSpace[4]} 0 4px 0;

		& + p {
			margin-top: 0;
		}
	`;
};

const HeadingTextElement: React.FC<HeadingTextElementProps> = ({
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
		default:
			return null;
	}
};

const HeadingTwo: React.FC<HeadingTwoProps> = ({
	format,
	isEditions,
	heading,
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
			css={styles(format)}
		>
			{children}
		</h2>
	);
};

export default HeadingTwo;
